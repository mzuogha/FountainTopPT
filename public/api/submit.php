<?php
/**
 * Native cPanel PHP Backend handler for Email & WhatsApp Appointment Bookings and Inquiries
 * Dispatches email notifications to clinic administration and logs inquiries securely.
 */
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $isAppointment = !empty($data['preferredDate']) || !empty($data['serviceId']) || !empty($data['reference']);
    $bookingChannel = !empty($data['bookingChannel']) ? strtolower(trim($data['bookingChannel'])) : (!empty($data['email']) ? 'email' : 'whatsapp');
    $patientName = htmlspecialchars(trim($data['fullName'] ?? $data['name'] ?? 'Website Visitor'), ENT_QUOTES, 'UTF-8');
    $patientPhone = htmlspecialchars(trim($data['phoneNumber'] ?? $data['phone'] ?? 'Not provided'), ENT_QUOTES, 'UTF-8');
    $patientEmail = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL) ? trim($data['email']) : '';
    $serviceRequested = htmlspecialchars(trim($data['serviceTitle'] ?? $data['serviceId'] ?? 'Physical Therapy Consultation'), ENT_QUOTES, 'UTF-8');
    $appointmentDate = htmlspecialchars(trim($data['preferredDate'] ?? 'To be scheduled'), ENT_QUOTES, 'UTF-8');
    $appointmentTime = htmlspecialchars(trim($data['preferredTime'] ?? 'Standard Hours'), ENT_QUOTES, 'UTF-8');
    $visitType = !empty($data['isHomeVisit']) ? 'Home Visit' : 'In-Clinic Consultation (Asaba)';
    $notes = htmlspecialchars(trim($data['conditionDetails'] ?? $data['message'] ?? $data['notes'] ?? 'None provided'), ENT_QUOTES, 'UTF-8');
    $refCode = htmlspecialchars(trim($data['reference'] ?? ('FT-' . rand(100000, 999999))), ENT_QUOTES, 'UTF-8');
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
    $subject = "[New " . ($bookingChannel === 'email' ? 'Email' : 'WhatsApp') . " Booking] {$refCode} - {$patientName}";
    
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
    @mail($to, $subject, $emailBody, $headers);

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


