<?php
require_once 'config.php';

// Authentication functions
function loginUser($username, $password) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_role'] = $user['role'];
        return true;
    }
    return false;
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header("Location: login.php");
        exit();
    }
}

// User management functions
function createUser($name, $username, $password, $email, $role) {
    global $pdo;
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, username, password, email, role) VALUES (?, ?, ?, ?, ?)");
    return $stmt->execute([$name, $username, $hashedPassword, $email, $role]);
}

function getUserById($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

// Timesheet functions
function addTimeEntry($userId, $projectId, $date, $hours, $description) {
    global $pdo;
    
    $stmt = $pdo->prepare("INSERT INTO time_entries (user_id, project_id, date, hours, description) VALUES (?, ?, ?, ?, ?)");
    return $stmt->execute([$userId, $projectId, $date, $hours, $description]);
}

function getWeeklyTimesheet($userId, $startDate) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM time_entries WHERE user_id = ? AND date >= ? AND date < DATE_ADD(?, INTERVAL 7 DAY)");
    $stmt->execute([$userId, $startDate, $startDate]);
    return $stmt->fetchAll();
}

// Project management functions
function getActiveProjects() {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM projects WHERE status = 'active'");
    $stmt->execute();
    return $stmt->fetchAll();
}
