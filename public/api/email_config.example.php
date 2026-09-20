<?php
/**
 * Fountain-Top Physiotherapy & Fitness Clinic - Optional Email & SMTP Configuration
 *
 * To use custom SMTP or add backup notification recipients:
 * 1. Copy or rename this file to "email_config.php" in the same directory (api/).
 * 2. Update the values below with your credentials.
 * 3. The file is protected by .htaccess and cannot be downloaded publicly.
 */

return [
    // Primary clinical desk inbox
    'admin_email' => 'info@fountaintoppt.com',

    // Optional: Secondary backup notification email (e.g. clinic director or manager Gmail)
    // When provided, all booking alerts are dispatched to BOTH primary and backup inboxes simultaneously.
    'backup_email' => '', // e.g. 'clinicmanager@gmail.com'

    // Secret access key for viewing patient leads dashboard (?action=leads&key=YOUR_KEY)
    'access_key' => 'fountain2026',

    // Sender email used in From: header
    'from_email' => 'info@fountaintoppt.com',
    'from_name' => 'Fountain-Top Physiotherapy Clinic',

    // SMTP Configuration
    // Set to true to route emails via authenticated SMTP instead of PHP's default mail()
    'smtp_enabled' => false,

    // SMTP Server (For cPanel/Go54 webmail: typically 'mail.fountaintoppt.com' or 'smtp.oxcs.net')
    'smtp_host' => 'mail.fountaintoppt.com',

    // Port: 465 (with 'ssl') OR 587 (with 'tls')
    'smtp_port' => 465,

    // Security: 'ssl' or 'tls'
    'smtp_secure' => 'ssl',

    // SMTP Authentication Username (your full email address)
    'smtp_user' => 'info@fountaintoppt.com',

    // SMTP Authentication Password (the password for info@fountaintoppt.com)
    'smtp_pass' => '',
];
