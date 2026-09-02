<?php
/**
 * Native cPanel PHP Backend handler for Email & WhatsApp Appointment Bookings and Inquiries
 * Dispatches email notifications to clinic administration and logs inquiries securely.
 */
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Payload size limit check (max 64KB)
$rawInput = file_get_contents('php://input');
if (strlen($rawInput) > 65536) {
    http_response_code(413);
    echo json_encode(['status' => 'error', 'message' => 'Payload too large']);
    exit;
}

$data = json_decode($rawInput, true) ?: $_POST;

// Helper to strip CR/LF and prevent header injection
function sanitize_header_value($val) {
    return preg_replace('/[\r\n\t]+/', ' ', trim((string)$val));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $isAppointment = !empty($data['preferredDate']) || !empty($data['serviceId']) || !empty($data['reference']);
    $bookingChannel = !empty($data['bookingChannel']) ? strtolower(sanitize_header_value($data['bookingChannel'])) : (!empty($data['email']) ? 'email' : 'whatsapp');
    
    $rawName = sanitize_header_value($data['fullName'] ?? $data['name'] ?? 'Website Visitor');
    $patientName = htmlspecialchars(mb_substr($rawName, 0, 150), ENT_QUOTES, 'UTF-8');
    
    $rawPhone = sanitize_header_value($data['phoneNumber'] ?? $data['phone'] ?? 'Not provided');
    $patientPhone = htmlspecialchars(mb_substr($rawPhone, 0, 50), ENT_QUOTES, 'UTF-8');
    
    $cleanEmail = sanitize_header_value($data['email'] ?? '');
    $patientEmail = filter_var($cleanEmail, FILTER_VALIDATE_EMAIL) ? $cleanEmail : '';
    
    $rawService = sanitize_header_value($data['serviceTitle'] ?? $data['serviceId'] ?? 'Physical Therapy Consultation');
    $serviceRequested = htmlspecialchars(mb_substr($rawService, 0, 150), ENT_QUOTES, 'UTF-8');
    
    $rawDate = sanitize_header_value($data['preferredDate'] ?? 'To be scheduled');
    $appointmentDate = htmlspecialchars(mb_substr($rawDate, 0, 50), ENT_QUOTES, 'UTF-8');
    
    $rawTime = sanitize_header_value($data['preferredTime'] ?? 'Standard Hours');
    $appointmentTime = htmlspecialchars(mb_substr($rawTime, 0, 50), ENT_QUOTES, 'UTF-8');
    
    $visitType = !empty($data['isHomeVisit']) ? 'Home Visit' : 'In-Clinic Consultation (Asaba)';
    
    $rawNotes = trim((string)($data['conditionDetails'] ?? $data['message'] ?? $data['notes'] ?? 'None provided'));
    $notes = htmlspecialchars(mb_substr($rawNotes, 0, 3000), ENT_QUOTES, 'UTF-8');
    
    $rawRef = sanitize_header_value($data['reference'] ?? ('FT-' . rand(100000, 999999)));
    $refCode = htmlspecialchars(mb_substr($rawRef, 0, 30), ENT_QUOTES, 'UTF-8');
    $timestamp = date('Y-m-d H:i:s');

    // Secure local logging
    $logEntry = [
        'timestamp' => $timestamp,
        'channel' => $bookingChannel,
        'type' => $isAppointment ? 'appointment' : 'inquiry',
        'reference' => $refCode,
        'patientName' => $patientName,
        'patientPhone' => $patientPhone,
        'patientEmail' => $patientEmail,
        'service' => $serviceRequested,
        'date' => $appointmentDate,
        'time' => $appointmentTime,
        'visitType' => $visitType,
        'notes' => $notes
    ];
    $logFile = __DIR__ . '/submissions.log';
    @file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND | LOCK_EX);

    // Email dispatch to clinic desk
    $to = 'info@fountaintoppt.com';
    $safeSubject = sanitize_header_value("[New " . ($bookingChannel === 'email' ? 'Email' : 'WhatsApp') . " Booking] {$refCode} - {$patientName}");
    
    $emailBody = "========================================\n";
    $emailBody .= " FOUNTAIN TOP PHYSIOTHERAPY CLINIC\n";
    $emailBody .= " NEW APPOINTMENT BOOKING REQUEST\n";
    $emailBody .= "========================================\n\n";
    $emailBody .= "Reference Number: {$refCode}\n";
    $emailBody .= "Channel: " . strtoupper($bookingChannel) . "\n";
    $emailBody .= "Patient Name: {$patientName}\n";
    $emailBody .= "Phone / WhatsApp: {$patientPhone}\n";
    $emailBody .= "Email: " . ($patientEmail ?: 'Not provided') . "\n";
    $emailBody .= "Service: {$serviceRequested}\n";
    $emailBody .= "Preferred Date: {$appointmentDate}\n";
    $emailBody .= "Preferred Time: {$appointmentTime}\n";
    $emailBody .= "Visit Type: {$visitType}\n";
    $emailBody .= "Condition / Notes: {$notes}\n";
    $emailBody .= "Submission Time: {$timestamp}\n\n";
    $emailBody .= "Clinic Location: Behind Stephen Keshi Stadium by MFM Junc., Asaba, Delta State\n";

    $headers = "From: Fountain Top Web <no-reply@fountaintoppt.com>\r\n";
    if ($patientEmail) {
        $headers .= "Reply-To: {$patientEmail}\r\n";
    }
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Attempt to send email
    @mail($to, $safeSubject, $emailBody, $headers);

    echo json_encode([
        'status' => 'success',
        'reference' => $refCode,
        'channel' => $bookingChannel,
        'message' => $bookingChannel === 'email'
            ? 'Thank you! Your appointment booking request has been sent to our clinical team.'
            : 'Thank you! Your appointment request has been logged and prepared for WhatsApp.'
    ]);
    exit;
}

echo json_encode(['status' => 'success', 'message' => 'Fountain-Top Booking API is active (Email & WhatsApp).']);
