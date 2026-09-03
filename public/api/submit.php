<?php
/**
 * Fountain-Top Physiotherapy & Fitness Clinic - cPanel Production API
 * Handles Appointment Bookings, Inquiries, Dual-Dispatch Email Notifications,
 * Patient Confirmation Receipts, Secure Logging, and Diagnostic Self-Testing.
 *
 * Location: Behind Stephen Keshi Stadium, Asaba, Delta State, Nigeria
 * Contacts: info@fountaintoppt.com, 07039466804, 09016120596
 */

// Strict error reporting for debugging without breaking JSON
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', '0');

// Set JSON and CORS security headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Security helper: Strip CR/LF/tabs to prevent header injection
function clean_header($val) {
    return preg_replace('/[\r\n\t]+/', ' ', trim((string)$val));
}

// Detect server domain for SPF/DKIM compliant sender address
function get_sender_domain() {
    $host = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (!empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'fountaintoppt.com');
    // Strip port if present
    $host = preg_replace('/:\d+$/', '', $host);
    // Strip www. prefix
    $host = preg_replace('/^www\./i', '', $host);
    // Fallback if local or IP
    if (empty($host) || filter_var($host, FILTER_VALIDATE_IP) || $host === 'localhost') {
        return 'fountaintoppt.com';
    }
    return strtolower($host);
}

// --------------------------------------------------------------------------
// GET Request: Diagnostic Test / Health Check
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = clean_header($_GET['action'] ?? $_GET['test'] ?? '');

    if ($action === 'test' || $action === '1' || $action === 'test_email') {
        $mailAvailable = function_exists('mail');
        $sendmailPath = ini_get('sendmail_path');
        $domain = get_sender_domain();
        $fromEmail = 'info@' . $domain;

        $testRecipients = ['info@fountaintoppt.com', 'mzuogha@gmail.com'];
        $testSubject = "[Diagnostic Test] Fountain-Top Physiotherapy cPanel Mailer";
        $testBody = "This is an automated test from the Fountain-Top Physiotherapy API at " . date('Y-m-d H:i:s') . "\n";
        $testBody .= "Host: {$domain}\n";
        $testBody .= "Sendmail Path: {$sendmailPath}\n";
        $testBody .= "Mail Function Enabled: " . ($mailAvailable ? 'YES' : 'NO') . "\n";

        $testHeaders = "From: Fountain Top Clinic <{$fromEmail}>\r\n" .
                       "Reply-To: {$fromEmail}\r\n" .
                       "X-Mailer: PHP/" . phpversion();

        $results = [];
        foreach ($testRecipients as $rcpt) {
            $sent = false;
            if ($mailAvailable) {
                $sent = @mail($rcpt, $testSubject, $testBody, $testHeaders, "-f " . $fromEmail);
                if (!$sent) {
                    $sent = @mail($rcpt, $testSubject, $testBody, $testHeaders);
                }
            }
            $results[$rcpt] = $sent ? 'Sent successfully' : 'Failed to dispatch';
        }

        echo json_encode([
            'status' => 'diagnostic_complete',
            'mail_function_exists' => $mailAvailable,
            'sendmail_path' => $sendmailPath,
            'detected_domain' => $domain,
            'from_address' => $fromEmail,
            'dispatch_results' => $results,
            'server_time' => date('Y-m-d H:i:s T'),
            'php_version' => phpversion()
        ], JSON_PRETTY_PRINT);
        exit;
    }

    echo json_encode([
        'status' => 'online',
        'clinic' => 'Fountain-Top Physiotherapy & Fitness Clinic',
        'location' => 'Asaba, Delta State, Nigeria',
        'message' => 'Fountain-Top Booking API is active. Use POST to submit appointments or inquiries. Pass ?action=test to test cPanel email dispatch.',
        'version' => '2.1'
    ]);
    exit;
}

// --------------------------------------------------------------------------
// POST Request: Process Appointment Booking or Inquiry
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read raw JSON body or form post
    $rawInput = file_get_contents('php://input');
    if (strlen($rawInput) > 65536) {
        http_response_code(413);
        echo json_encode(['status' => 'error', 'message' => 'Payload too large']);
        exit;
    }

    $data = json_decode($rawInput, true);
    if (!is_array($data)) {
        $data = $_POST;
    }

    // Determine inquiry vs booking
    $isAppointment = !empty($data['preferredDate']) || !empty($data['serviceId']) || !empty($data['reference']) || !empty($data['serviceTitle']);
    $bookingChannel = !empty($data['bookingChannel']) ? strtolower(clean_header($data['bookingChannel'])) : (!empty($data['email']) ? 'email' : 'whatsapp');

    // Sanitize patient details
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

    // 1. Persistent Local Storage Backup
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

    // Append to text log
    $logFile = __DIR__ . '/submissions.log';
    @file_put_contents($logFile, json_encode($submissionRecord) . "\n", FILE_APPEND | LOCK_EX);

    // Save into JSON archive
    $jsonFile = __DIR__ . '/submissions.json';
    $existing = [];
    if (file_exists($jsonFile)) {
        $jsonContent = @file_get_contents($jsonFile);
        $existing = json_decode($jsonContent, true) ?: [];
    }
    array_unshift($existing, $submissionRecord);
    // Keep latest 500 entries
    if (count($existing) > 500) {
        $existing = array_slice($existing, 0, 500);
    }
    @file_put_contents($jsonFile, json_encode($existing, JSON_PRETTY_PRINT), LOCK_EX);

    // 2. Email Construction & Dual-Dispatch
    $domain = get_sender_domain();
    $fromEmail = 'info@' . $domain;
    $envelopeFrom = $fromEmail;

    // Dispatch to both official clinic desk and management inbox
    $adminRecipients = [
        'info@fountaintoppt.com',
        'mzuogha@gmail.com'
    ];

    $emailTypeLabel = $isAppointment ? 'APPOINTMENT BOOKING' : 'GENERAL INQUIRY';
    $emailSubject = clean_header("[{$emailTypeLabel}] Ref: {$refCode} - {$patientName} ({$serviceRequested})");

    // Clean, responsive HTML Email for Clinic Administration
    $htmlEmail = '<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>' . htmlspecialchars($emailSubject) . '</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #1e293b; }
  .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #115e59 100%); color: #ffffff; padding: 28px 24px; text-align: left; }
  .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
  .header p { margin: 0; font-size: 13px; opacity: 0.9; color: #ccfbf1; }
  .badge { display: inline-block; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-top: 10px; letter-spacing: 0.05em; }
  .content { padding: 24px; }
  .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  .info-table th, .info-table td { padding: 12px 10px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
  .info-table th { color: #64748b; font-weight: 600; width: 38%; }
  .info-table td { color: #0f172a; font-weight: 600; }
  .notes-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 16px 0; font-size: 14px; line-height: 1.6; color: #334155; }
  .actions { text-align: center; padding: 18px 0 10px 0; }
  .btn { display: inline-block; padding: 12px 22px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 4px 6px; }
  .btn-call { background: #0d9488; color: #ffffff !important; }
  .btn-wa { background: #16a34a; color: #ffffff !important; }
  .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>Fountain-Top Physiotherapy & Fitness Clinic</h1>
    <p>Asaba, Delta State &bull; Behind Stephen Keshi Stadium by MFM Junction</p>
    <div class="badge">' . htmlspecialchars($emailTypeLabel) . ' (Ref: ' . htmlspecialchars($refCode) . ')</div>
  </div>
  <div class="content">
    <table class="info-table">
      <tr><th>Patient Full Name</th><td><strong>' . htmlspecialchars($patientName) . '</strong></td></tr>
      <tr><th>Phone / WhatsApp</th><td><a href="tel:' . urlencode($patientPhone) . '" style="color:#0d9488; text-decoration:none;">' . htmlspecialchars($patientPhone) . '</a></td></tr>
      <tr><th>Email Address</th><td>' . ($patientEmail ? '<a href="mailto:' . htmlspecialchars($patientEmail) . '" style="color:#0d9488;">' . htmlspecialchars($patientEmail) . '</a>' : '<span style="color:#94a3b8;">Not provided</span>') . '</td></tr>
      <tr><th>Service Requested</th><td><span style="color:#0f766e; font-weight:700;">' . htmlspecialchars($serviceRequested) . '</span></td></tr>
      <tr><th>Preferred Date</th><td>' . htmlspecialchars($appointmentDate) . '</td></tr>
      <tr><th>Preferred Time</th><td>' . htmlspecialchars($appointmentTime) . '</td></tr>
      <tr><th>Consultation Format</th><td>' . htmlspecialchars($visitType) . '</td></tr>
      <tr><th>Preferred Channel</th><td>' . strtoupper(htmlspecialchars($bookingChannel)) . '</td></tr>
      <tr><th>Submission Time</th><td>' . htmlspecialchars($dateFormatted) . '</td></tr>
    </table>

    <div style="font-weight:700; font-size:13px; color:#475569; margin-top:16px;">Condition Symptoms / Notes:</div>
    <div class="notes-box">' . nl2br(htmlspecialchars($notes)) . '</div>

    <div class="actions">
      <a class="btn btn-call" href="tel:' . urlencode($patientPhone) . '">&#9742; Call Patient</a>
      <a class="btn btn-wa" href="https://wa.me/' . preg_replace('/[^0-9]/', '', $patientPhone) . '?text=' . urlencode("Hello {$patientName}, this is Fountain-Top Physiotherapy Clinic in Asaba regarding your appointment booking (Ref: {$refCode}).") . '" target="_blank">&#128172; Chat on WhatsApp</a>
    </div>
  </div>
  <div class="footer">
    Fountain-Top Physiotherapy Clinic &bull; 1, Nwanze Obi Odogwu Street, Behind Stadium by MFM Junction, Asaba, Delta State &bull; 07039466804 / 09016120596
  </div>
</div>
</body>
</html>';

    // Plain text alternative
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
                     "Booking Channel: " . strtoupper($bookingChannel) . "\n" .
                     "Received: {$dateFormatted}\n\n" .
                     "Patient Notes:\n{$notes}\n\n" .
                     "Clinic Address: 1, Nwanze Obi Odogwu Street Behind Stadium by Mountain of Fire Junction, Asaba\n" .
                     "Phone lines: 07039466804 / 09016120596\n";

    // Setup MIME Headers
    $adminHeaders = [];
    $adminHeaders[] = "MIME-Version: 1.0";
    $adminHeaders[] = "Content-Type: text/html; charset=UTF-8";
    $adminHeaders[] = "From: Fountain-Top Clinic <{$fromEmail}>";
    if (!empty($patientEmail)) {
        $adminHeaders[] = "Reply-To: {$patientName} <{$patientEmail}>";
    } else {
        $adminHeaders[] = "Reply-To: {$fromEmail}";
    }
    $adminHeaders[] = "X-Mailer: PHP/" . phpversion();
    $adminHeadersStr = implode("\r\n", $adminHeaders);

    // Send to each admin recipient
    $mailDispatchSuccess = false;
    $dispatchLogs = [];

    if (function_exists('mail')) {
        foreach ($adminRecipients as $recipient) {
            // Attempt with envelope sender -f first
            $sent = @mail($recipient, $emailSubject, $htmlEmail, $adminHeadersStr, "-f " . $envelopeFrom);
            if (!$sent) {
                // Fallback attempt without -f in case host forbids extra parameters
                $sent = @mail($recipient, $emailSubject, $htmlEmail, $adminHeadersStr);
            }
            if ($sent) {
                $mailDispatchSuccess = true;
                $dispatchLogs[$recipient] = 'sent';
            } else {
                $dispatchLogs[$recipient] = 'failed';
            }
        }
    }

    // 3. Optional: Send Confirmation Receipt to Patient if Email was Provided
    if (!empty($patientEmail) && function_exists('mail')) {
        $patientSubject = clean_header("Appointment Request Confirmed [Ref: {$refCode}] - Fountain-Top Physiotherapy");
        $patientHtml = '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Appointment Confirmation</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background-color:#f8fafc;padding:20px;color:#1e293b;">
  <div style="max-width:580px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <div style="background:#0d9488;color:#fff;padding:24px;text-align:center;">
      <h2 style="margin:0 0 6px 0;">Fountain-Top Physiotherapy Clinic</h2>
      <p style="margin:0;font-size:14px;color:#ccfbf1;">Thank you for scheduling with us in Asaba</p>
    </div>
    <div style="padding:24px;">
      <p>Dear <strong>' . htmlspecialchars($patientName) . '</strong>,</p>
      <p>We have successfully received your appointment request. A senior physiotherapist or patient care coordinator will contact you shortly via phone or WhatsApp to finalize your consultation timing.</p>
      <div style="background:#f1f5f9;border-radius:8px;padding:16px;margin:16px 0;font-size:14px;">
        <p style="margin:4px 0;"><strong>Reference Code:</strong> ' . htmlspecialchars($refCode) . '</p>
        <p style="margin:4px 0;"><strong>Requested Service:</strong> ' . htmlspecialchars($serviceRequested) . '</p>
        <p style="margin:4px 0;"><strong>Requested Date:</strong> ' . htmlspecialchars($appointmentDate) . ' (' . htmlspecialchars($appointmentTime) . ')</p>
        <p style="margin:4px 0;"><strong>Care Format:</strong> ' . htmlspecialchars($visitType) . '</p>
      </div>
      <p style="font-size:13px;color:#64748b;">If you require urgent assistance, please call or WhatsApp us directly at <strong>+234 703 946 6804</strong> or <strong>+234 901 612 0596</strong>.</p>
    </div>
    <div style="background:#f8fafc;padding:12px 24px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
      1, Nwanze Obi Odogwu Street Behind Stephen Keshi Stadium by MFM Junction, Asaba, Delta State.
    </div>
  </div>
</body>
</html>';

        $patHeaders = [];
        $patHeaders[] = "MIME-Version: 1.0";
        $patHeaders[] = "Content-Type: text/html; charset=UTF-8";
        $patHeaders[] = "From: Fountain-Top Clinic <{$fromEmail}>";
        $patHeaders[] = "Reply-To: {$fromEmail}";
        $patHeaders[] = "X-Mailer: PHP/" . phpversion();
        $patHeadersStr = implode("\r\n", $patHeaders);

        @mail($patientEmail, $patientSubject, $patientHtml, $patHeadersStr, "-f " . $envelopeFrom);
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

// Fallback method not allowed
http_response_code(405);
echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
