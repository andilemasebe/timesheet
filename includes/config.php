<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'timesheet_db');

// Application configuration
define('SITE_URL', 'http://localhost/timesheet');
define('SITE_NAME', 'Timesheet Management System');
define('ADMIN_EMAIL', 'admin@example.com');

// Session configuration
ini_set('session.cookie_lifetime', 60 * 60 * 24); // 24 hours
ini_set('session.gc_maxlifetime', 60 * 60 * 24); // 24 hours
session_start();

// Connect to database
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
