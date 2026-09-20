<?php
/**
 * Fountain-Top Physiotherapy & Fitness Clinic - Production cPanel API
 * Handles Appointment Bookings, Inquiries, Email Dispatch (SMTP & Mail),
 * Persistent Lead Archival, Leads Dashboard, and Diagnostic Self-Testing.
 *
 * Location: Behind Stephen Keshi Stadium, Asaba, Delta State, Nigeria
 * Hotlines: 07039466804 / 09016120596 &bull; info@fountaintoppt.com
 */

// Error reporting: Log internally, suppress display so JSON is never broken
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', '0');

// Header security helper
function clean_header($val) {
    return preg_replace('/[\r\n\t]+/', ' ', trim((string)$val));
}

// Detect server domain for SPF/DKIM compliant sender address
function get_sender_domain() {
    $host = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (!empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'fountaintoppt.com');
    $host = preg_replace('/:\d+$/', '', $host);
    $host = preg_replace('/^www\./i', '', $host);
    if (empty($host) || filter_var($host, FILTER_VALIDATE_IP) || $host === 'localhost') {
        return 'fountaintoppt.com';
    }
    return strtolower($host);
}

// Load optional configuration file (email_config.php) if present
function load_email_config() {
    $default = [
        'admin_email' => 'info@fountaintoppt.com',
        'backup_email' => '',
        'access_key' => 'fountain2026',
        'from_email' => 'notifications@' . get_sender_domain(),
        'from_name' => 'Fountain-Top Physiotherapy Clinic',
        'smtp_enabled' => false,
        'smtp_host' => 'mail.fountaintoppt.com',
        'smtp_port' => 465,
        'smtp_secure' => 'ssl', // 'ssl' (port 465) or 'tls' (port 587)
        'smtp_user' => 'info@fountaintoppt.com',
        'smtp_pass' => '',
    ];

    $configFile = __DIR__ . '/email_config.php';
    if (file_exists($configFile)) {
        $custom = @include $configFile;
        if (is_array($custom)) {
            $default = array_merge($default, $custom);
        }
    }
    return $default;
}

// Pure PHP Socket SMTP Client (No Composer / External dependencies required)
class SimpleSMTP {
    public static function send($host, $port, $user, $pass, $secure, $from, $to, $subject, $htmlBody, $plainBody = '', $replyTo = '', &$debugLog = '') {
        $log = [];
        $port = (int)$port;
        $secure = strtolower((string)$secure);
        $log[] = "Connecting to {$host}:{$port} (encryption: {$secure})...";

        $target = $host;
        if ($secure === 'ssl') {
            $target = 'ssl://' . $host;
        }

        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ]);

        $timeout = 15;
        $socket = @stream_socket_client($target . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
        if (!$socket) {
            $debugLog = "Connection to {$target}:{$port} failed ($errno: $errstr)";
            return false;
        }

        stream_set_timeout($socket, $timeout);

        $getResponse = function() use ($socket, &$log) {
            $response = '';
            while ($line = fgets($socket, 515)) {
                $response .= $line;
                if (isset($line[3]) && $line[3] === ' ') break;
            }
            $log[] = "S: " . trim($response);
            return $response;
        };

        $sendCommand = function($cmd, $mask = false) use ($socket, &$log) {
            $log[] = "C: " . ($mask ? '***[REDACTED]***' : $cmd);
            fputs($socket, $cmd . "\r\n");
        };

        $banner = $getResponse();
        if (substr($banner, 0, 3) !== '220') {
            $debugLog = implode("\n", $log);
            @fclose($socket);
            return false;
        }

        $clientDomain = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'fountaintoppt.com';
        $sendCommand("EHLO " . $clientDomain);
        $ehloResp = $getResponse();

        if ($secure === 'tls') {
            $sendCommand("STARTTLS");
            $tlsResp = $getResponse();
            if (substr($tlsResp, 0, 3) === '220') {
                $crypto = @stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
                if (!$crypto) {
                    $log[] = "TLS negotiation failed";
                    $debugLog = implode("\n", $log);
                    @fclose($socket);
                    return false;
                }
                $sendCommand("EHLO " . $clientDomain);
                $getResponse();
            }
        }

        if (!empty($user) && !empty($pass)) {
            $sendCommand("AUTH LOGIN");
            $authResp = $getResponse();
            if (substr($authResp, 0, 3) !== '334') {
                $debugLog = implode("\n", $log);
                @fclose($socket);
                return false;
            }

            $sendCommand(base64_encode($user));
            $userResp = $getResponse();
            if (substr($userResp, 0, 3) !== '334') {
                $debugLog = implode("\n", $log);
                @fclose($socket);
                return false;
            }

            $sendCommand(base64_encode($pass), true);
            $passResp = $getResponse();
            if (substr($passResp, 0, 3) !== '235') {
                $debugLog = implode("\n", $log);
                @fclose($socket);
                return false;
            }
        }

        $cleanFrom = clean_header($from);
        $cleanTo = clean_header($to);

        $sendCommand("MAIL FROM:<" . $cleanFrom . ">");
        $mailFromResp = $getResponse();
        if (substr($mailFromResp, 0, 3) !== '250') {
            $debugLog = implode("\n", $log);
            @fclose($socket);
            return false;
        }

        $sendCommand("RCPT TO:<" . $cleanTo . ">");
        $rcptResp = $getResponse();
        if (substr($rcptResp, 0, 3) !== '250' && substr($rcptResp, 0, 3) !== '251') {
            $debugLog = implode("\n", $log);
            @fclose($socket);
            return false;
        }

        $sendCommand("DATA");
        $dataResp = $getResponse();
        if (substr($dataResp, 0, 3) !== '354') {
            $debugLog = implode("\n", $log);
            @fclose($socket);
            return false;
        }

        $boundary = "----=_Part_" . md5(uniqid((string)time(), true));
        $headers = [];
        $headers[] = "From: Fountain-Top Clinic <" . $cleanFrom . ">";
        $headers[] = "To: <" . $cleanTo . ">";
        if (!empty($replyTo)) {
            $headers[] = "Reply-To: " . clean_header($replyTo);
        }
        $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
        $headers[] = "Date: " . date('r');
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: multipart/alternative; boundary=\"" . $boundary . "\"";
        $headers[] = "X-Mailer: FountainTop-Mailer/2.3";

        $bodyContent = implode("\r\n", $headers) . "\r\n\r\n";

        if (!empty($plainBody)) {
            $bodyContent .= "--" . $boundary . "\r\n";
            $bodyContent .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $bodyContent .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $bodyContent .= chunk_split(base64_encode($plainBody)) . "\r\n";
        }

        $bodyContent .= "--" . $boundary . "\r\n";
        $bodyContent .= "Content-Type: text/html; charset=UTF-8\r\n";
        $bodyContent .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $bodyContent .= chunk_split(base64_encode($htmlBody)) . "\r\n";
        $bodyContent .= "--" . $boundary . "--\r\n";
        $bodyContent .= "\r\n.\r\n";

        fputs($socket, $bodyContent);
        $finalResp = $getResponse();

        $sendCommand("QUIT");
        $getResponse();
        @fclose($socket);

        $debugLog = implode("\n", $log);
        return (substr($finalResp, 0, 3) === '250');
    }
}

// Unified Mail Dispatcher (SMTP with automated PHP mail() fallback)
function dispatch_notification($config, $recipient, $subject, $htmlBody, $plainBody, $replyTo, &$methodUsed, &$errorMsg) {
    $recipient = clean_header($recipient);
    $subject = clean_header($subject);
    $methodUsed = 'none';
    $errorMsg = '';

    // 1. Try Authenticated SMTP if configured
    if (!empty($config['smtp_enabled']) && !empty($config['smtp_host'])) {
        $fromEmail = !empty($config['from_email']) ? $config['from_email'] : 'info@' . get_sender_domain();
        $smtpDebug = '';
        $smtpOk = SimpleSMTP::send(
            $config['smtp_host'],
            $config['smtp_port'] ?? 465,
            $config['smtp_user'] ?? '',
            $config['smtp_pass'] ?? '',
            $config['smtp_secure'] ?? 'ssl',
            $fromEmail,
            $recipient,
            $subject,
            $htmlBody,
            $plainBody,
            $replyTo,
            $smtpDebug
        );

        if ($smtpOk) {
            $methodUsed = 'smtp';
            return true;
        } else {
            $errorMsg = "SMTP failed: " . substr($smtpDebug, -300) . "; ";
        }
    }

    // 2. Fallback to PHP native mail()
    if (function_exists('mail')) {
        $domain = get_sender_domain();
        $fromEmail = !empty($config['from_email']) ? $config['from_email'] : 'notifications@' . $domain;
        $fromName = !empty($config['from_name']) ? $config['from_name'] : 'Fountain-Top Physiotherapy Clinic';

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/html; charset=UTF-8";
        $headers[] = "From: {$fromName} <{$fromEmail}>";
        if (!empty($replyTo)) {
            $headers[] = "Reply-To: " . clean_header($replyTo);
        } else {
            $headers[] = "Reply-To: info@{$domain}";
        }
        $headers[] = "X-Mailer: FountainTop-Mailer/2.3";

        $headersStr = implode("\r\n", $headers);

        $sent = @mail($recipient, $subject, $htmlBody, $headersStr, "-f " . $fromEmail);
        if (!$sent) {
            $sent = @mail($recipient, $subject, $htmlBody, $headersStr);
        }

        if ($sent) {
            $methodUsed = 'php_mail';
            return true;
        } else {
            $lastErr = error_get_last();
            $errorMsg .= "PHP mail() failed: " . ($lastErr['message'] ?? 'Check cPanel exim logs or sendmail path');
            return false;
        }
    }

    $errorMsg .= "PHP mail() function is disabled on this server.";
    return false;
}

$config = load_email_config();

// Handle CORS Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// --------------------------------------------------------------------------
// GET REQUESTS: Diagnostics, Self-Test, or Secure Leads Dashboard
// --------------------------------------------------------------------------
// CSV cell sanitization to prevent formula injection in spreadsheet software
function clean_csv_cell($val) {
    $str = (string)$val;
    if (preg_match('/^[\=\+\-\@\t\r]/', $str)) {
        return "'" . $str;
    }
    return $str;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = clean_header($_GET['action'] ?? $_GET['test'] ?? '');
    $providedKey = clean_header($_GET['key'] ?? '');
    $isAdmin = !empty($providedKey) && hash_equals($config['access_key'], $providedKey);

    // 1. Secure Patient Leads & Bookings Dashboard
    if ($action === 'leads' || $action === 'view_leads') {
        if (!$isAdmin) {
            http_response_code(403);
            header('Content-Type: text/html; charset=UTF-8');
            echo '<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;text-align:center;"><h2>Access Restricted</h2><p>Authentication required.</p></body></html>';
            exit;
        }

        $jsonFile = __DIR__ . '/submissions.json';
        $leads = [];
        if (file_exists($jsonFile)) {
            $leads = json_decode(@file_get_contents($jsonFile), true) ?: [];
        }

        // CSV Export format with anti-formula injection
        if (($_GET['format'] ?? '') === 'csv') {
            header('Content-Type: text/csv; charset=UTF-8');
            header('Content-Disposition: attachment; filename="fountain_top_leads_' . date('Ymd_His') . '.csv"');
            $out = fopen('php://output', 'w');
            fputcsv($out, ['Reference', 'Timestamp', 'Type', 'Channel', 'Patient Name', 'Phone Number', 'Email', 'Service Requested', 'Preferred Date', 'Preferred Time', 'Care Format', 'Notes / Symptoms']);
            foreach ($leads as $l) {
                fputcsv($out, [
                    clean_csv_cell($l['reference'] ?? ''),
                    clean_csv_cell($l['timestamp'] ?? ''),
                    clean_csv_cell($l['type'] ?? ''),
                    clean_csv_cell($l['channel'] ?? ''),
                    clean_csv_cell($l['patientName'] ?? ''),
                    clean_csv_cell($l['patientPhone'] ?? ''),
                    clean_csv_cell($l['patientEmail'] ?? ''),
                    clean_csv_cell($l['service'] ?? ''),
                    clean_csv_cell($l['date'] ?? ''),
                    clean_csv_cell($l['time'] ?? ''),
                    clean_csv_cell($l['visitType'] ?? ''),
                    clean_csv_cell($l['notes'] ?? '')
                ]);
            }
            fclose($out);
            exit;
        }

        // HTML Dashboard View
        header('Content-Type: text/html; charset=UTF-8');
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Fountain-Top Clinic | Patient Inquiries & Bookings Dashboard</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-50 text-slate-800 antialiased min-h-screen p-4 sm:p-8">
          <div class="max-w-7xl mx-auto space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">Clinical Desk Portal</span>
                <h1 class="text-2xl font-black text-slate-900 mt-1">Fountain-Top Patient Inquiries & Bookings</h1>
                <p class="text-sm text-slate-500">Asaba, Delta State &bull; Total Recorded Leads: <span class="font-bold text-teal-700"><?php echo count($leads); ?></span></p>
              </div>
              <div class="flex items-center gap-2.5 flex-wrap">
                <a href="?action=leads&key=<?php echo urlencode($providedKey); ?>&format=csv" class="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-sm font-semibold transition shadow-xs flex items-center gap-1.5">
                  &darr; Export to Excel / CSV
                </a>
                <a href="?action=leads&key=<?php echo urlencode($providedKey); ?>" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition">
                  Refresh
                </a>
              </div>
            </div>

            <?php if (empty($leads)): ?>
              <div class="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <p class="text-slate-400 font-medium">No patient submissions recorded yet in submissions.json.</p>
              </div>
            <?php else: ?>
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm">
                    <thead class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      <tr>
                        <th class="p-4">Ref Code</th>
                        <th class="p-4">Date & Time</th>
                        <th class="p-4">Patient Demographics</th>
                        <th class="p-4">Service & Care Format</th>
                        <th class="p-4">Requested Date</th>
                        <th class="p-4">Condition Notes</th>
                        <th class="p-4 text-center">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-normal">
                      <?php foreach ($leads as $row): 
                        $phone = preg_replace('/[^0-9]/', '', (string)($row['patientPhone'] ?? ''));
                        $waNum = $phone;
                        if (strpos($waNum, '0') === 0) $waNum = '234' . substr($waNum, 1);
                        elseif (strpos($waNum, '234') !== 0 && strlen($waNum) === 10) $waNum = '234' . $waNum;
                        $waLink = 'https://wa.me/' . $waNum . '?text=' . urlencode("Hello " . ($row['patientName'] ?? 'Patient') . ", this is Fountain-Top Physiotherapy Clinic in Asaba regarding your inquiry (" . ($row['reference'] ?? '') . ").");
                      ?>
                      <tr class="hover:bg-slate-50/80 transition">
                        <td class="p-4 font-mono font-bold text-teal-700 text-xs whitespace-nowrap">
                          <?php echo htmlspecialchars($row['reference'] ?? '-'); ?><br>
                          <span class="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-sans"><?php echo htmlspecialchars($row['channel'] ?? 'web'); ?></span>
                        </td>
                        <td class="p-4 text-xs text-slate-500 whitespace-nowrap">
                          <?php echo htmlspecialchars($row['timestamp'] ?? '-'); ?>
                        </td>
                        <td class="p-4">
                          <div class="font-bold text-slate-900"><?php echo htmlspecialchars($row['patientName'] ?? '-'); ?></div>
                          <div class="text-xs text-teal-700 font-medium"><?php echo htmlspecialchars($row['patientPhone'] ?? '-'); ?></div>
                          <?php if (!empty($row['patientEmail'])): ?>
                            <div class="text-[11px] text-slate-500"><?php echo htmlspecialchars($row['patientEmail']); ?></div>
                          <?php endif; ?>
                        </td>
                        <td class="p-4">
                          <div class="font-semibold text-slate-800"><?php echo htmlspecialchars($row['service'] ?? '-'); ?></div>
                          <div class="text-xs text-slate-500"><?php echo htmlspecialchars($row['visitType'] ?? '-'); ?></div>
                        </td>
                        <td class="p-4 text-xs">
                          <span class="font-medium text-slate-800"><?php echo htmlspecialchars($row['date'] ?? '-'); ?></span><br>
                          <span class="text-slate-500"><?php echo htmlspecialchars($row['time'] ?? '-'); ?></span>
                        </td>
                        <td class="p-4 text-xs text-slate-600 max-w-xs truncate" title="<?php echo htmlspecialchars($row['notes'] ?? ''); ?>">
                          <?php echo htmlspecialchars(mb_substr($row['notes'] ?? '', 0, 100)); ?><?php echo strlen($row['notes'] ?? '') > 100 ? '...' : ''; ?>
                        </td>
                        <td class="p-4 text-center whitespace-nowrap">
                          <a href="<?php echo $waLink; ?>" target="_blank" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                      <?php endforeach; ?>
                    </tbody>
                  </table>
                </div>
              </div>
            <?php endif; ?>
          </div>
        </body>
        </html>
        <?php
        exit;
    }

    // 2. Diagnostic Mailer Self-Test
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');

    if ($action === 'test' || $action === '1' || $action === 'test_email') {
        $mailAvailable = function_exists('mail');
        $sendmailPath = ini_get('sendmail_path');
        $domain = get_sender_domain();

        // Check for custom destination passed via &to=email@example.com (Requires admin key)
        $customTo = filter_var(clean_header($_GET['to'] ?? ''), FILTER_VALIDATE_EMAIL);
        if ($customTo && !$isAdmin) {
            http_response_code(403);
            echo json_encode(['status' => 'error', 'message' => 'Authentication required to test external recipient']);
            exit;
        }

        $testRecipients = ['info@fountaintoppt.com'];
        if ($customTo && !in_array($customTo, $testRecipients)) {
            $testRecipients[] = $customTo;
        }
        if (!empty($config['backup_email']) && !in_array($config['backup_email'], $testRecipients)) {
            $testRecipients[] = $config['backup_email'];
        }

        $testSubject = "[Diagnostic Test] Fountain-Top Physiotherapy Notification Mailer";
        $testTime = date('D, M j, Y \a\t g:i A');

        $testHtml = '<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f8fafc;padding:24px;">'
                  . '<div style="max-width:550px;margin:0 auto;background:#fff;padding:24px;border-radius:12px;border:1px solid #e2e8f0;">'
                  . '<h2 style="color:#0f766e;margin-top:0;">Fountain-Top Notification Test</h2>'
                  . '<p>This diagnostic verifies your clinic notification subsystem.</p>'
                  . '<p><strong>Time:</strong> ' . htmlspecialchars($testTime) . '</p>'
                  . '<p><strong>Domain:</strong> ' . htmlspecialchars($domain) . '</p>'
                  . '<p><strong>SMTP Mode:</strong> ' . ($config['smtp_enabled'] ? 'Enabled' : 'Disabled (using native mailer)') . '</p>'
                  . '<p style="color:#166534;background:#f0fdf4;padding:8px 12px;border-radius:6px;">If you received this message, mail transport to your inbox is verified!</p>'
                  . '</div></body></html>';

        $testPlain = "Fountain-Top Notification Test\nTime: {$testTime}\nDomain: {$domain}\n";

        $results = [];
        foreach ($testRecipients as $rcpt) {
            $methodUsed = '';
            $errorMsg = '';
            $ok = dispatch_notification($config, $rcpt, $testSubject, $testHtml, $testPlain, 'info@' . $domain, $methodUsed, $errorMsg);
            $results[$rcpt] = [
                'delivered' => $ok,
                'method_used' => $methodUsed,
                'details' => $ok ? 'Dispatched successfully' : $errorMsg
            ];
        }

        $diagResponse = [
            'status' => 'diagnostic_complete',
            'server_domain' => $domain,
            'mail_function_exists' => $mailAvailable,
            'smtp_configured' => !empty($config['smtp_enabled']),
            'dispatch_results' => $results,
            'cpanel_guidance' => 'If info@fountaintoppt.com is not receiving emails while external addresses do, in cPanel go to "Email Routing" and change the setting from "Local Mail Exchanger" to "Remote Mail Exchanger".',
            'server_time' => date('Y-m-d H:i:s T')
        ];
        if ($isAdmin) {
            $diagResponse['sendmail_path'] = $sendmailPath;
            $diagResponse['php_version'] = phpversion();
        }

        echo json_encode($diagResponse, JSON_PRETTY_PRINT);
        exit;
    }

    echo json_encode([
        'status' => 'online',
        'clinic' => 'Fountain-Top Physiotherapy & Fitness Clinic',
        'location' => 'Asaba, Delta State, Nigeria'
    ]);
    exit;
}

// --------------------------------------------------------------------------
// POST REQUEST: Process Appointment Booking or Patient Inquiry
// --------------------------------------------------------------------------
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (strlen($rawInput) > 65536) {
        http_response_code(413);
        echo json_encode(['status' => 'error', 'message' => 'Payload exceeds size limits']);
        exit;
    }

    $data = json_decode($rawInput, true);
    if (!is_array($data)) {
        $data = $_POST;
    }

    // Anti-Spam Honeypot Trap (silently acknowledge bots without processing)
    if (!empty($data['website']) || !empty($data['company_fax']) || !empty($data['_honeypot'])) {
        echo json_encode(['status' => 'success', 'reference' => 'FT-' . rand(100000, 999999), 'message' => 'Your inquiry has been received.']);
        exit;
    }

    // IP-based sliding window rate limiter (max 15 requests per 10 minutes per IP)
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $rateFile = __DIR__ . '/.rate_limit.json';
    $rateLimitWindow = 600;
    $maxRateAttempts = 15;
    $now = time();
    $ipHash = md5($ip);

    $rateData = [];
    if (file_exists($rateFile)) {
        $rateData = json_decode(@file_get_contents($rateFile), true) ?: [];
    }

    $cleanedRateData = [];
    foreach ($rateData as $k => $v) {
        if ($now - ($v['time'] ?? 0) < $rateLimitWindow) {
            $cleanedRateData[$k] = $v;
        }
    }

    if (isset($cleanedRateData[$ipHash]) && ($cleanedRateData[$ipHash]['count'] ?? 0) >= $maxRateAttempts) {
        http_response_code(429);
        echo json_encode(['status' => 'error', 'message' => 'Too many requests. Please wait a few moments or contact clinic reception on WhatsApp (+234 703 946 6804).']);
        exit;
    }

    $cleanedRateData[$ipHash] = [
        'time' => $cleanedRateData[$ipHash]['time'] ?? $now,
        'count' => ($cleanedRateData[$ipHash]['count'] ?? 0) + 1
    ];
    @file_put_contents($rateFile, json_encode($cleanedRateData), LOCK_EX);

    // Determine inquiry vs booking
    $isAppointment = !empty($data['preferredDate']) || !empty($data['serviceId']) || !empty($data['reference']) || !empty($data['serviceTitle']);
    $bookingChannel = !empty($data['bookingChannel']) ? strtolower(clean_header($data['bookingChannel'])) : (!empty($data['email']) ? 'email' : 'whatsapp');

    // Sanitize patient fields
    $rawName = clean_header($data['fullName'] ?? $data['name'] ?? 'Website Patient');
    $patientName = htmlspecialchars(mb_substr($rawName, 0, 120), ENT_QUOTES, 'UTF-8');

    $rawPhone = clean_header($data['phoneNumber'] ?? $data['phone'] ?? 'Not provided');
    $patientPhone = htmlspecialchars(mb_substr($rawPhone, 0, 40), ENT_QUOTES, 'UTF-8');

    $cleanEmail = clean_header($data['email'] ?? '');
    $patientEmail = filter_var($cleanEmail, FILTER_VALIDATE_EMAIL) ? $cleanEmail : '';

    $rawService = clean_header($data['serviceTitle'] ?? $data['serviceId'] ?? ($isAppointment ? 'General Consultation' : 'General Inquiry'));
    $serviceRequested = htmlspecialchars(mb_substr($rawService, 0, 120), ENT_QUOTES, 'UTF-8');

    $rawDate = clean_header($data['preferredDate'] ?? 'Flexible / To be confirmed');
    $appointmentDate = htmlspecialchars(mb_substr($rawDate, 0, 40), ENT_QUOTES, 'UTF-8');

    $rawTime = clean_header($data['preferredTime'] ?? 'Standard Operating Hours');
    $appointmentTime = htmlspecialchars(mb_substr($rawTime, 0, 40), ENT_QUOTES, 'UTF-8');

    $visitType = !empty($data['isHomeVisit']) ? 'Home Visit Rehabilitation' : 'In-Clinic Consultation (Asaba Facility)';

    $rawNotes = trim((string)($data['conditionDetails'] ?? $data['message'] ?? $data['notes'] ?? 'None provided'));
    $notes = htmlspecialchars(mb_substr($rawNotes, 0, 3000), ENT_QUOTES, 'UTF-8');

    $rawRef = clean_header($data['reference'] ?? ('FT-' . rand(100000, 999999)));
    $refCode = htmlspecialchars(mb_substr($rawRef, 0, 30), ENT_QUOTES, 'UTF-8');

    $timestamp = date('Y-m-d H:i:s');
    $dateFormatted = date('D, M j, Y \a\t g:i A');

    // 1. Persistent Storage Archival (Never Lose a Lead)
    $submissionRecord = [
        'reference' => $refCode,
        'timestamp' => $timestamp,
        'type' => $isAppointment ? 'appointment' : 'inquiry',
        'channel' => $bookingChannel,
        'patientName' => $patientName,
        'patientPhone' => $patientPhone,
        'patientEmail' => $patientEmail,
        'service' => $serviceRequested,
        'date' => $appointmentDate,
        'time' => $appointmentTime,
        'visitType' => $visitType,
        'notes' => $notes,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'userAgent' => clean_header($_SERVER['HTTP_USER_AGENT'] ?? '')
    ];

    $logFile = __DIR__ . '/submissions.log';
    @file_put_contents($logFile, json_encode($submissionRecord) . "\n", FILE_APPEND | LOCK_EX);

    $jsonFile = __DIR__ . '/submissions.json';
    $existing = [];
    if (file_exists($jsonFile)) {
        $jsonContent = @file_get_contents($jsonFile);
        $existing = json_decode($jsonContent, true) ?: [];
    }
    array_unshift($existing, $submissionRecord);
    if (count($existing) > 500) {
        $existing = array_slice($existing, 0, 500);
    }
    @file_put_contents($jsonFile, json_encode($existing, JSON_PRETTY_PRINT), LOCK_EX);

    // 2. Build Executive Email for Clinic Staff
    $emailTypeLabel = $isAppointment ? 'APPOINTMENT BOOKING REQUEST' : 'GENERAL PATIENT INQUIRY';
    $emailSubject = clean_header("[{$emailTypeLabel}] Ref: {$refCode} - {$patientName} ({$serviceRequested})");

    $cleanPhone = preg_replace('/[^0-9]/', '', $patientPhone);
    $waNumber = $cleanPhone;
    if (strpos($waNumber, '0') === 0) {
        $waNumber = '234' . substr($waNumber, 1);
    } elseif (strpos($waNumber, '234') !== 0 && strlen($waNumber) === 10) {
        $waNumber = '234' . $waNumber;
    }
    $waUrl = 'https://wa.me/' . $waNumber . '?text=' . urlencode("Hello {$patientName}, this is Fountain-Top Physiotherapy Clinic in Asaba regarding your booking request ({$refCode}) for {$serviceRequested}.");

    $htmlEmail = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>' . htmlspecialchars($emailSubject) . '</title>
<style>
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
</style>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; color: #1e293b;">
<center>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15,23,42,0.08); border: 1px solid #e2e8f0;">
    
    <tr>
      <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #115e59 100%); padding: 32px 28px; text-align: left; color: #ffffff;">
        <div style="display: inline-block; background-color: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #ccfbf1; margin-bottom: 8px;">
          CLINICAL DESK ALERT
        </div>
        <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">
          Fountain-Top Physiotherapy Clinic
        </h1>
        <p style="margin: 0; font-size: 13px; color: #99f6e4;">
          Behind Stephen Keshi Stadium by MFM Junction &bull; Asaba, Delta State
        </p>
      </td>
    </tr>

    <tr>
      <td style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 14px 28px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="font-size: 13px; font-weight: 700; color: #0f766e; text-transform: uppercase;">
              &#9679; ' . htmlspecialchars($emailTypeLabel) . '
            </td>
            <td align="right" style="font-size: 13px; font-weight: 800; color: #334155; font-family: monospace;">
              REF: <span style="background-color: #0f766e; color: #ffffff; padding: 3px 8px; border-radius: 6px;">' . htmlspecialchars($refCode) . '</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 28px;">
        
        <!-- Demographics -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0; background-color: #f1f5f9;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">
                PATIENT DEMOGRAPHICS & CONTACT
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 35%; font-weight: 600;">Full Name:</td>
                  <td style="padding: 6px 0; font-size: 15px; color: #0f172a; font-weight: 800;">' . htmlspecialchars($patientName) . '</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="padding: 6px 0; font-size: 15px; color: #0d9488; font-weight: 700;">
                    <a href="tel:' . urlencode($patientPhone) . '" style="color: #0d9488; text-decoration: underline;">' . htmlspecialchars($patientPhone) . '</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a;">' . 
                    ($patientEmail ? '<a href="mailto:' . htmlspecialchars($patientEmail) . '" style="color: #0d9488;">' . htmlspecialchars($patientEmail) . '</a>' : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>') . 
                  '</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Preferred Channel:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #334155; font-weight: 700; text-transform: uppercase;">' . 
                    ($bookingChannel === 'email' ? '✉️ Email Notification' : '💬 WhatsApp Direct') . 
                  '</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Received:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b;">' . htmlspecialchars($dateFormatted) . '</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Clinical Details -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
          <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0; background-color: #f1f5f9;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b;">
                CLINICAL CARE DETAILS
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #64748b; width: 35%; font-weight: 600;">Requested Service:</td>
                  <td style="padding: 8px 0;">
                    <span style="background-color: #ccfbf1; color: #0f766e; border: 1px solid #99f6e4; font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 6px;">' . 
                      htmlspecialchars($serviceRequested) . 
                    '</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Preferred Date:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">' . htmlspecialchars($appointmentDate) . '</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Preferred Time:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">' . htmlspecialchars($appointmentTime) . '</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Consultation Format:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">' . 
                    ($visitType === 'Home Visit' || strpos($visitType, 'Home') !== false ? '🏠 Home Visit Rehabilitation' : '🏥 In-Clinic Consultation (Asaba Facility)') . 
                  '</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Notes -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #475569; margin-bottom: 8px;">
            PATIENT CLINICAL NOTES / SYMPTOMS:
          </div>
          <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; border-radius: 0 10px 10px 0; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #334155; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
            ' . ($notes ? nl2br($notes) : '<span style="color: #94a3b8; font-style: italic;">No additional notes provided.</span>') . '
          </div>
        </div>

        <!-- Clinician Quick Action Buttons -->
        <div style="text-align: center; margin: 32px 0 12px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding: 6px;">
                <a href="tel:' . urlencode($patientPhone) . '" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; min-width: 130px; text-align: center;">
                  &#9742; Call Patient
                </a>
              </td>
              <td align="center" style="padding: 6px;">
                <a href="' . $waUrl . '" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; min-width: 130px; text-align: center;">
                  &#128172; WhatsApp
                </a>
              </td>
              ' . ($patientEmail ? '
              <td align="center" style="padding: 6px;">
                <a href="mailto:' . htmlspecialchars($patientEmail) . '?subject=' . urlencode("Regarding your Fountain-Top appointment (Ref: {$refCode})") . '" style="display: inline-block; background-color: #334155; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; min-width: 120px; text-align: center;">
                  &#9993; Email
                </a>
              </td>' : '') . '
            </tr>
          </table>
        </div>

      </td>
    </tr>

    <tr>
      <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 28px; text-align: center;">
        <div style="font-size: 14px; font-weight: 800; color: #0f766e; margin-bottom: 6px;">
          Fountain-Top Physiotherapy & Fitness Clinic
        </div>
        <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 12px;">
          1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by MFM Junction, Asaba, Delta State.<br>
          Hotlines: 07039466804 &bull; 09016120596 &bull; info@fountaintoppt.com
        </div>
      </td>
    </tr>

  </table>
</center>
</body>
</html>';

    $plainTextBody = "====================================================\n" .
                     " FOUNTAIN-TOP PHYSIOTHERAPY & FITNESS CLINIC\n" .
                     " NEW {$emailTypeLabel} (Ref: {$refCode})\n" .
                     "====================================================\n\n" .
                     "Patient Name: {$patientName}\n" .
                     "Phone / WhatsApp: {$patientPhone}\n" .
                     "Email: " . ($patientEmail ?: 'Not provided') . "\n" .
                     "Service: {$serviceRequested}\n" .
                     "Preferred Date: {$appointmentDate}\n" .
                     "Preferred Time: {$appointmentTime}\n" .
                     "Format: {$visitType}\n" .
                     "Received: {$dateFormatted}\n\n" .
                     "Patient Notes:\n{$notes}\n\n" .
                     "Clinic Address: 1, Nwanze Obi Odogwu Street Behind Stadium by MFM Junction, Asaba\n" .
                     "Phone lines: 07039466804 / 09016120596\n";

    // Build recipient list
    $adminRecipients = ['info@fountaintoppt.com'];
    if (!empty($config['admin_email']) && !in_array($config['admin_email'], $adminRecipients)) {
        $adminRecipients[] = $config['admin_email'];
    }
    if (!empty($config['backup_email']) && !in_array($config['backup_email'], $adminRecipients)) {
        $adminRecipients[] = $config['backup_email'];
    }

    $replyTo = !empty($patientEmail) ? "{$patientName} <{$patientEmail}>" : ('info@' . get_sender_domain());

    $mailDispatchSuccess = false;
    $dispatchLogs = [];

    foreach ($adminRecipients as $recipient) {
        $methodUsed = '';
        $errorMsg = '';
        $ok = dispatch_notification($config, $recipient, $emailSubject, $htmlEmail, $plainTextBody, $replyTo, $methodUsed, $errorMsg);
        if ($ok) {
            $mailDispatchSuccess = true;
            $dispatchLogs[$recipient] = [
                'status' => 'sent',
                'method' => $methodUsed
            ];
        } else {
            $dispatchLogs[$recipient] = [
                'status' => 'failed',
                'error' => $errorMsg
            ];
        }
    }

    // 3. Optional: Send Confirmation Receipt to Patient if Email was provided
    if (!empty($patientEmail)) {
        $patientSubject = clean_header("Appointment Request Confirmed [Ref: {$refCode}] - Fountain-Top Physiotherapy");
        $patientHtml = '<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f8fafc;font-family:sans-serif;">'
                     . '<div style="max-width:560px;margin:0 auto;background:#fff;padding:28px;border-radius:12px;border:1px solid #e2e8f0;">'
                     . '<h2 style="color:#0f766e;margin-top:0;">Fountain-Top Physiotherapy Clinic</h2>'
                     . '<p>Dear ' . htmlspecialchars($patientName) . ',</p>'
                     . '<p>Thank you for scheduling your physiotherapy appointment with Fountain-Top Clinic in Asaba. We have successfully logged your request.</p>'
                     . '<div style="background:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0;margin:20px 0;">'
                     . '<p style="margin:4px 0;"><strong>Reference:</strong> ' . htmlspecialchars($refCode) . '</p>'
                     . '<p style="margin:4px 0;"><strong>Service:</strong> ' . htmlspecialchars($serviceRequested) . '</p>'
                     . '<p style="margin:4px 0;"><strong>Date & Time:</strong> ' . htmlspecialchars($appointmentDate) . ' (' . htmlspecialchars($appointmentTime) . ')</p>'
                     . '<p style="margin:4px 0;"><strong>Care Format:</strong> ' . htmlspecialchars($visitType) . '</p>'
                     . '</div>'
                     . '<p>Our clinical staff will call or message you via WhatsApp shortly to confirm your specific arrival slot.</p>'
                     . '<p style="font-size:12px;color:#64748b;margin-top:24px;">Clinic Address: 1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by MFM Junction, Asaba &bull; 07039466804 / 09016120596</p>'
                     . '</div></body></html>';
        
        $mUsed = '';
        $eMsg = '';
        dispatch_notification($config, $patientEmail, $patientSubject, $patientHtml, $plainTextBody, 'info@' . get_sender_domain(), $mUsed, $eMsg);
    }

    echo json_encode([
        'status' => 'success',
        'reference' => $refCode,
        'channel' => $bookingChannel,
        'mail_sent' => $mailDispatchSuccess,
        'recipients' => $dispatchLogs,
        'message' => $bookingChannel === 'email'
            ? 'Thank you! Your appointment booking request has been successfully received and our clinical team has been notified.'
            : 'Thank you! Your appointment request has been logged and prepared for WhatsApp.'
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
