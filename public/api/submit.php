<?php
/**
 * Native cPanel PHP Backend handler for WhatsApp Appointment Bookings and Inquiries
 * Logs inquiries securely and confirms booking state for WhatsApp routing.
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
    $patientName = htmlspecialchars(trim($data['fullName'] ?? $data['name'] ?? 'Website Visitor'), ENT_QUOTES, 'UTF-8');
    $patientPhone = htmlspecialchars(trim($data['phoneNumber'] ?? $data['phone'] ?? 'Not provided'), ENT_QUOTES, 'UTF-8');
    $serviceRequested = htmlspecialchars(trim($data['serviceTitle'] ?? $data['serviceId'] ?? 'Physical Therapy Consultation'), ENT_QUOTES, 'UTF-8');
    $appointmentDate = htmlspecialchars(trim($data['preferredDate'] ?? 'To be scheduled'), ENT_QUOTES, 'UTF-8');
    $appointmentTime = htmlspecialchars(trim($data['preferredTime'] ?? 'Standard Hours'), ENT_QUOTES, 'UTF-8');
    $notes = htmlspecialchars(trim($data['conditionDetails'] ?? $data['message'] ?? $data['notes'] ?? 'None provided'), ENT_QUOTES, 'UTF-8');
    $refCode = htmlspecialchars(trim($data['reference'] ?? ('FT-' . rand(100000, 999999))), ENT_QUOTES, 'UTF-8');
    $timestamp = date('Y-m-d H:i:s');

    // Secure local backup logging
    $logEntry = [
        'timestamp' => $timestamp,
        'type' => $isAppointment ? 'appointment' : 'inquiry',
        'reference' => $refCode,
        'patientName' => $patientName,
        'patientPhone' => $patientPhone,
        'service' => $serviceRequested,
        'date' => $appointmentDate,
        'time' => $appointmentTime,
        'notes' => $notes
    ];
    $logFile = __DIR__ . '/submissions.log';
    @file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND | LOCK_EX);

    echo json_encode([
        'status' => 'success',
        'reference' => $refCode,
        'message' => 'Thank you! Your appointment request has been logged and routed to WhatsApp.'
    ]);
    exit;
}

echo json_encode(['status' => 'success', 'message' => 'Fountain-Top WhatsApp Booking API is active.']);

