export const MYSQL_SCHEMA_SQL = `-- ==============================================================
-- Home Service Management System - Database Schema (MySQL)
-- Academic Project Database: home_service_db
-- Tables: users, services, bookings, administrators, inquiries
-- ==============================================================

CREATE DATABASE IF NOT EXISTS home_service_db
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE home_service_db;

-- --------------------------------------------------------------
-- 1. Administrators Table
-- Stores credentials and privileges for administrative personnel
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS administrators (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'SuperAdmin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------------
-- 2. Users (Customers) Table
-- Stores registered customer accounts, addresses, and contacts
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    street_address TEXT NULL,
    city VARCHAR(80) DEFAULT 'Pune',
    zip_code VARCHAR(15) NULL,
    status ENUM('Active', 'Suspended') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------------
-- 3. Services Table
-- Stores catalogue of offered home services and pricing
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Plumbing', 'Electrical', 'House Cleaning', 'Appliance Repair', 'Painting', 'Carpentry') NOT NULL,
    service_name VARCHAR(150) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    full_description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    duration_hours DECIMAL(4, 1) DEFAULT 1.5,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------------
-- 4. Technicians / Service Staff Table
-- Assigned to bookings for job fulfillment
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS technicians (
    technician_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    specialty VARCHAR(80) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 4.9,
    status ENUM('Available', 'On Job', 'Off Duty') DEFAULT 'Available'
) ENGINE=InnoDB;

-- --------------------------------------------------------------
-- 5. Bookings Table
-- Stores customer appointment requests, status, and invoices
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    booking_id VARCHAR(20) PRIMARY KEY, -- e.g. HSM-4019
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    technician_id INT NULL,
    booking_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL, -- e.g. '09:00 AM - 12:00 PM'
    service_address TEXT NOT NULL,
    customer_notes TEXT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    payment_method ENUM('Cash on Delivery', 'Online (Simulated)', 'UPI / Card') DEFAULT 'Cash on Delivery',
    payment_status ENUM('Pending', 'Paid', 'Refunded') DEFAULT 'Pending',
    booking_status ENUM('Pending', 'Confirmed', 'Technician Assigned', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Pending',
    user_rating TINYINT NULL,
    user_review TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_booking_service FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE RESTRICT,
    CONSTRAINT fk_booking_tech FOREIGN KEY (technician_id) REFERENCES technicians(technician_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------------
-- 6. Inquiries (Contact Us) Table
-- Stores visitor messages and queries
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
    inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------------
-- Sample Seed Data for Testing & Academic Evaluation
-- --------------------------------------------------------------

-- Default Administrator (password: admin123)
INSERT INTO administrators (full_name, email, password_hash, role) VALUES 
('Siddharth Deshpande', 'admin@homeserve.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SuperAdmin');

-- Sample Customers (password: password123)
INSERT INTO users (full_name, email, phone_number, password_hash, street_address, city, zip_code) VALUES
('Aarav Sharma', 'aarav.sharma@example.com', '+91 98765 43210', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Flat 402, Green Valley Residency, Kothrud', 'Pune', '411038'),
('Sneha Joshi', 'sneha.joshi@example.com', '+91 97654 32109', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Flat B-104, Blue Ridge Township, Hinjewadi Phase 1', 'Pune', '411057'),
('Rohan Mehta', 'rohan.mehta@example.com', '+91 99887 76655', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Plot 18, Harmony Park, ITI Road, Aundh', 'Pune', '411007');

-- Technicians
INSERT INTO technicians (full_name, phone, specialty, rating) VALUES
('Rajesh Patil', '+91 98231 11223', 'Plumbing', 4.9),
('Vikram Deshmukh', '+91 98232 22334', 'Electrical', 4.9),
('Priya Nair', '+91 98233 33445', 'House Cleaning', 5.0),
('Suresh Kulkarni', '+91 98234 44556', 'Appliance Repair', 4.8),
('Amit Verma', '+91 98235 55667', 'Painting', 4.9),
('Manoj Shinde', '+91 98236 66778', 'Carpentry', 4.8);

-- Services
INSERT INTO services (category, service_name, short_description, full_description, base_price, duration_hours, rating) VALUES
('Plumbing', 'Pipe Leakage & Tap Repair', 'Fix leaks, drippy faucets, and loose joints.', 'Comprehensive diagnostic and sealing for all residential water lines.', 299.00, 1.5, 4.9),
('Plumbing', 'Drain Unblocking & Pipe Descaling', 'Motorized auger clearing for sinks and floor traps.', 'Heavy-duty obstruction removal with non-toxic chemical pipe flush.', 499.00, 2.0, 4.8),
('Electrical', 'Electrical Circuit & Short-Fix', 'Trip detection, MCB replacement, and spark diagnosis.', 'Certified inspection of breaker boxes, short lines, and faulty wiring.', 349.00, 1.5, 4.9),
('House Cleaning', 'Full Deep Home Cleaning', 'Deep sanitation of living room, kitchen, and baths.', 'Top-to-bottom scrub, motorized buffing, and hospital-grade sanitization.', 1499.00, 4.0, 5.0),
('Appliance Repair', 'AC Servicing & Gas Refill', 'Filter wash, coil cleaning, and coolant recharge.', 'Restores cooling efficiency, checks refrigerant pressure, and clears drip tray.', 599.00, 1.5, 4.9),
('Painting', 'Interior Wall Painting & Touch-up', 'Premium washable emulsions and crack repair.', 'Putty patching, double-coat acrylic painting, and zero-mess drop protection.', 1999.00, 6.0, 4.9);

-- Sample Initial Bookings
INSERT INTO bookings (booking_id, user_id, service_id, technician_id, booking_date, time_slot, service_address, total_amount, payment_method, booking_status) VALUES
('HSM-4019', 1, 1, 1, '2026-10-30', '09:00 AM - 12:00 PM', 'Flat 402, Green Valley Residency, Kothrud, Pune - 411038', 299.00, 'Cash on Delivery', 'Technician Assigned'),
('HSM-3820', 1, 4, 3, '2026-10-18', '01:00 PM - 05:00 PM', 'Flat 402, Green Valley Residency, Kothrud, Pune - 411038', 1349.00, 'UPI / Card', 'Completed');
`;

export const PHP_SCRIPTS = [
  {
    fileName: 'db_connect.php',
    title: 'Database Connection (PDO)',
    description: 'Secure PDO MySQL connection with exception handling and utf8mb4 encoding.',
    code: `<?php
/**
 * db_connect.php - Home Service Management System
 * Establishes a secure connection to MySQL database using PDO.
 */

$host = 'localhost';
$dbname = 'home_service_db';
$username = 'root';
$password = ''; // Set your local MySQL password

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}
?>`
  },
  {
    fileName: 'register.php',
    title: 'Customer Registration Script',
    description: 'Validates user inputs, hashes passwords using bcrypt, and inserts records into `users`.',
    code: `<?php
/**
 * register.php - Handles new customer account creation
 */
require_once 'db_connect.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$fullName = trim($_POST['full_name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$phone    = trim($_POST['phone_number'] ?? '');
$password = $_POST['password'] ?? '';
$address  = trim($_POST['street_address'] ?? '');

// Validation
if (empty($fullName) || empty($email) || empty($phone) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'All required fields must be filled.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address format.']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['status' => 'error', 'message' => 'Password must be at least 6 characters.']);
    exit;
}

// Check if email already registered
$stmt = $pdo->prepare('SELECT user_id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(['status' => 'error', 'message' => 'Email is already registered.']);
    exit;
}

// Hash password with bcrypt
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$insert = $pdo->prepare('INSERT INTO users (full_name, email, phone_number, password_hash, street_address) VALUES (?, ?, ?, ?, ?)');
$success = $insert->execute([$fullName, $email, $phone, $passwordHash, $address]);

if ($success) {
    echo json_encode([
        'status'  => 'success',
        'message' => 'Registration successful! You can now log in.'
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to register account.']);
}
?>`
  },
  {
    fileName: 'book_service.php',
    title: 'Service Booking Handler',
    description: 'Validates selected service, date, time slot, creates booking reference, and calculates totals.',
    code: `<?php
/**
 * book_service.php - Handles customer service booking requests
 */
require_once 'db_connect.php';
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid method.']);
    exit;
}

$userId        = $_POST['user_id'] ?? null;
$serviceId     = $_POST['service_id'] ?? null;
$bookingDate   = $_POST['booking_date'] ?? null;
$timeSlot      = $_POST['time_slot'] ?? null;
$streetAddress = $_POST['street_address'] ?? '';
$notes         = $_POST['notes'] ?? '';
$paymentMethod = $_POST['payment_method'] ?? 'Cash on Delivery';

// Validation
if (!$userId || !$serviceId || !$bookingDate || !$timeSlot || empty($streetAddress)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing booking details.']);
    exit;
}

// Fetch service details for pricing
$stmt = $pdo->prepare('SELECT service_name, base_price FROM services WHERE service_id = ? AND is_active = 1');
$stmt->execute([$serviceId]);
$service = $stmt->fetch();

if (!$service) {
    echo json_encode(['status' => 'error', 'message' => 'Selected service is currently unavailable.']);
    exit;
}

$bookingId = 'HSM-' . rand(1000, 9999);
$totalAmount = $service['base_price'];

// Insert booking with Prepared Statement to prevent SQL Injection
$query = 'INSERT INTO bookings 
    (booking_id, user_id, service_id, booking_date, time_slot, service_address, customer_notes, total_amount, payment_method, booking_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "Pending")';

$stmt = $pdo->prepare($query);
$ok = $stmt->execute([
    $bookingId,
    $userId,
    $serviceId,
    $bookingDate,
    $timeSlot,
    $streetAddress,
    $notes,
    $totalAmount,
    $paymentMethod
]);

if ($ok) {
    echo json_encode([
        'status'     => 'success',
        'booking_id' => $bookingId,
        'message'    => 'Your booking has been placed successfully!',
        'amount'     => $totalAmount
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save booking. Please try again.']);
}
?>`
  },
  {
    fileName: 'admin_actions.php',
    title: 'Admin Management Backend',
    description: 'Manages booking status changes, technician assignments, and service price edits.',
    code: `<?php
/**
 * admin_actions.php - Administrative operations API
 */
require_once 'db_connect.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'update_booking_status':
        $bookingId = $_POST['booking_id'] ?? '';
        $newStatus = $_POST['status'] ?? '';
        $techId    = $_POST['technician_id'] ?? null;

        $stmt = $pdo->prepare('UPDATE bookings SET booking_status = ?, technician_id = ? WHERE booking_id = ?');
        $stmt->execute([$newStatus, $techId ?: null, $bookingId]);
        echo json_encode(['status' => 'success', 'message' => 'Booking status updated.']);
        break;

    case 'update_service_price':
        $serviceId = (int)($_POST['service_id'] ?? 0);
        $newPrice  = (float)($_POST['base_price'] ?? 0);

        if ($serviceId <= 0 || $newPrice <= 0) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid service ID or price.']);
            exit;
        }

        $stmt = $pdo->prepare('UPDATE services SET base_price = ? WHERE service_id = ?');
        $stmt->execute([$newPrice, $serviceId]);
        echo json_encode(['status' => 'success', 'message' => 'Service price updated successfully.']);
        break;

    case 'get_statistics':
        $totalBookings = $pdo->query('SELECT COUNT(*) FROM bookings')->fetchColumn();
        $totalRevenue  = $pdo->query('SELECT COALESCE(SUM(total_amount), 0) FROM bookings WHERE booking_status = "Completed"')->fetchColumn();
        $pendingCount  = $pdo->query('SELECT COUNT(*) FROM bookings WHERE booking_status = "Pending"')->fetchColumn();
        $userCount     = $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();

        echo json_encode([
            'status' => 'success',
            'data' => [
                'total_bookings' => (int)$totalBookings,
                'total_revenue'  => (float)$totalRevenue,
                'pending_count'  => (int)$pendingCount,
                'total_users'    => (int)$userCount
            ]
        ]);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Unknown admin action.']);
        break;
}
?>`
  }
];
