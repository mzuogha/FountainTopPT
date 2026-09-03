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
        $testSubject = "[Diagnostic Test] Fountain-Top Physiotherapy Notification Mailer";
        $testTime = date('D, M j, Y \a\t g:i A');
        
        $testHtml = '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Diagnostic Test</title></head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; color: #1e293b;">
<center>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <tr>
      <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); padding: 28px; text-align: left; color: #ffffff;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #ccfbf1; margin-bottom: 6px;">
          SYSTEM HEALTH & MAIL VERIFICATION
        </div>
        <h2 style="margin: 0 0 6px 0; font-size: 22px; color: #ffffff;">Fountain-Top Physiotherapy Clinic</h2>
        <p style="margin: 0; font-size: 13px; color: #99f6e4;">Mailer Subsystem Active &bull; Asaba, Delta State</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px;">
        <p style="font-size: 15px; font-weight: 700; color: #0f766e; margin-top: 0;">&#10004; Notification Subsystem Verified</p>
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          This diagnostic notification confirms that your web hosting mail transport is properly configured and successfully dispatching HTML patient notifications to clinic desks.
        </p>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin: 18px 0; padding: 14px;">
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600; width: 40%;">Sender Domain:</td>
            <td style="padding: 6px 12px; font-size: 14px; font-weight: 700; color: #0f172a;">' . htmlspecialchars($domain) . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Sender Address:</td>
            <td style="padding: 6px 12px; font-size: 14px; font-weight: 700; color: #0f172a;">' . htmlspecialchars($fromEmail) . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">PHP Engine:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">PHP ' . phpversion() . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Timestamp:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">' . htmlspecialchars($testTime) . '</td>
          </tr>
        </table>
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #166534;">
          <strong>Clinic Contacts:</strong> 1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by MFM Junction, Asaba &bull; 07039466804 / 09016120596
        </div>
      </td>
    </tr>
  </table>
</center>
</body>
</html>';

        $testHeaders = "MIME-Version: 1.0\r\n" .
                       "Content-Type: text/html; charset=UTF-8\r\n" .
                       "From: Fountain Top Clinic <{$fromEmail}>\r\n" .
                       "Reply-To: {$fromEmail}\r\n" .
                       "X-Mailer: PHP/" . phpversion();

        $results = [];
        foreach ($testRecipients as $rcpt) {
            $sent = false;
            if ($mailAvailable) {
                $sent = @mail($rcpt, $testSubject, $testHtml, $testHeaders, "-f " . $fromEmail);
                if (!$sent) {
                    $sent = @mail($rcpt, $testSubject, $testHtml, $testHeaders);
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

    // Executive Medical-Grade HTML Email for Clinic Administration
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
  @media screen and (max-width: 600px) {
    .email-container { width: 100% !important; border-radius: 0 !important; }
    .btn-cell { display: block !important; padding: 4px 0 !important; }
  }
</style>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f1f5f9; color: #1e293b;">
<center>
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    New patient ' . htmlspecialchars($emailTypeLabel) . ': ' . htmlspecialchars($patientName) . ' (' . htmlspecialchars($serviceRequested) . ') &bull; Ref: ' . htmlspecialchars($refCode) . '
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15,23,42,0.08); border: 1px solid #e2e8f0;" class="email-container">
    
    <!-- Top Branding Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 60%, #115e59 100%); padding: 32px 28px; text-align: left; color: #ffffff;">
        <div style="display: inline-block; background-color: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #ccfbf1; margin-bottom: 8px;">
          CLINICAL DESK ALERT
        </div>
        <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.25; color: #ffffff;">
          Fountain-Top Physiotherapy Clinic
        </h1>
        <p style="margin: 0; font-size: 13px; color: #99f6e4; line-height: 1.4;">
          Behind Stephen Keshi Stadium by MFM Junction &bull; Asaba, Delta State
        </p>
      </td>
    </tr>

    <!-- Status & Reference Pill Strip -->
    <tr>
      <td style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 14px 28px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="font-size: 13px; font-weight: 700; color: #0f766e; text-transform: uppercase; letter-spacing: 0.04em;">
              &#9679; ' . htmlspecialchars($emailTypeLabel) . '
            </td>
            <td align="right" style="font-size: 13px; font-weight: 800; color: #334155; font-family: monospace;">
              REF: <span style="background-color: #0f766e; color: #ffffff; padding: 3px 8px; border-radius: 6px;">' . htmlspecialchars($refCode) . '</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 28px;">
        
        <!-- Patient Demographics -->
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
                    ($patientEmail ? '<a href="mailto:' . htmlspecialchars($patientEmail) . '" style="color: #0d9488; text-decoration: none;">' . htmlspecialchars($patientEmail) . '</a>' : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>') . 
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

        <!-- Clinical Appointment Details Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
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
                    <span style="display: inline-block; background-color: #ccfbf1; color: #0f766e; border: 1px solid #99f6e4; font-size: 13px; font-weight: 800; padding: 4px 10px; border-radius: 6px;">' . 
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

        <!-- Symptoms & Condition Notes -->
        <div style="margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #475569; margin-bottom: 8px;">
            PATIENT CLINICAL NOTES / SYMPTOMS:
          </div>
          <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; border-radius: 0 10px 10px 0; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #334155;">
            ' . ($notes ? nl2br($notes) : '<span style="color: #94a3b8; font-style: italic;">No additional notes provided.</span>') . '
          </div>
        </div>

        <!-- Clinician Quick Action Buttons -->
        <div style="text-align: center; margin: 32px 0 12px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding: 6px;" class="btn-cell">
                <a href="tel:' . urlencode($patientPhone) . '" style="display: inline-block; background-color: #0d9488; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; min-width: 140px; text-align: center;">
                  &#9742; Call Patient
                </a>
              </td>
              <td align="center" style="padding: 6px;" class="btn-cell">
                <a href="' . $waUrl . '" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; min-width: 140px; text-align: center;">
                  &#128172; Chat on WhatsApp
                </a>
              </td>
              ' . ($patientEmail ? '
              <td align="center" style="padding: 6px;" class="btn-cell">
                <a href="mailto:' . htmlspecialchars($patientEmail) . '?subject=' . urlencode("Regarding your Fountain-Top appointment request (Ref: {$refCode})") . '" style="display: inline-block; background-color: #334155; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; min-width: 130px; text-align: center;">
                  &#9993; Email Reply
                </a>
              </td>' : '') . '
            </tr>
          </table>
        </div>

        <!-- Triage Guidance -->
        <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px 16px; margin-top: 24px; font-size: 12px; color: #92400e; line-height: 1.5;">
          <strong>Clinical Triage Protocol:</strong> Please contact the patient within 2 hours of receipt to confirm appointment time, medical history readiness, and clinic directions.
        </div>

      </td>
    </tr>

    <!-- Clinic Footer -->
    <tr>
      <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 28px; text-align: center;">
        <div style="font-size: 14px; font-weight: 800; color: #0f766e; margin-bottom: 6px;">
          Fountain-Top Physiotherapy & Fitness Clinic
        </div>
        <div style="font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 12px;">
          1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by Mountain of Fire (MFM) Junction, Asaba, Delta State.<br>
          Hotlines: <a href="tel:+2347039466804" style="color: #0d9488; text-decoration: none; font-weight: 600;">07039466804</a> &bull; <a href="tel:+2349016120596" style="color: #0d9488; text-decoration: none; font-weight: 600;">09016120596</a> &bull; <a href="https://fountaintoppt.com" style="color: #0d9488; text-decoration: none; font-weight: 600;">fountaintoppt.com</a>
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Sent automatically from Fountain-Top Patient Portal &bull; Confidential Medical Record
        </div>
      </td>
    </tr>

  </table>
</center>
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
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appointment Confirmation</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
<center>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.04);">
    <tr>
      <td style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); padding: 28px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; color: #ffffff;">Fountain-Top Physiotherapy Clinic</h1>
        <p style="margin: 0; font-size: 14px; color: #ccfbf1;">Appointment Request Received &bull; Asaba, Delta State</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px;">
        <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0;">Dear ' . htmlspecialchars($patientName) . ',</p>
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          Thank you for scheduling your physiotherapy appointment with Fountain-Top Clinic. We have successfully logged your request into our clinical schedule.
        </p>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; margin: 20px 0; padding: 16px;">
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600; width: 40%;">Reference Code:</td>
            <td style="padding: 6px 12px; font-size: 14px; font-weight: 800; color: #0f766e; font-family: monospace;">' . htmlspecialchars($refCode) . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Service Requested:</td>
            <td style="padding: 6px 12px; font-size: 14px; font-weight: 700; color: #0f172a;">' . htmlspecialchars($serviceRequested) . '</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Requested Date:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">' . htmlspecialchars($appointmentDate) . ' (' . htmlspecialchars($appointmentTime) . ')</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; font-size: 13px; color: #64748b; font-weight: 600;">Care Format:</td>
            <td style="padding: 6px 12px; font-size: 14px; color: #0f172a;">' . htmlspecialchars($visitType) . '</td>
          </tr>
        </table>

        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          <strong>Next Steps:</strong> A member of our clinical team will reach out via phone or WhatsApp shortly to confirm your specific arrival time and assist with any preparation needed.
        </p>

        <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px; margin-top: 20px; font-size: 13px; color: #475569;">
          <strong>Clinic Address:</strong> 1, Nwanze Obi Odogwu Street, Behind Stephen Keshi Stadium by Mountain of Fire (MFM) Junction, Asaba, Delta State.<br>
          <strong>Questions or Directions?</strong> Call us directly at <a href="tel:+2347039466804" style="color: #0d9488; font-weight: 700; text-decoration: none;">07039466804</a> or <a href="tel:+2349016120596" style="color: #0d9488; font-weight: 700; text-decoration: none;">09016120596</a>.
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
        Fountain-Top Physiotherapy & Fitness Clinic &bull; Restore Movement. Build Strength. Live Pain-Free.
      </td>
    </tr>
  </table>
</center>
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
