<?php
session_start();
require_once 'config/database.php';

// Check if user is authenticated
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Timesheet System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/timesheet.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="card mt-4">
            <div class="card-body">
                <h2>Daily Time Record</h2>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="webcam-container">
                            <video id="webcam" autoplay playsinline></video>
                            <canvas id="canvas" class="d-none"></canvas>
                            <button class="btn btn-primary" id="captureBtn">Take Photo</button>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="fingerprint-scanner">
                            <div id="fingerprintImage"></div>
                            <button class="btn btn-primary" id="scanFingerprint">Scan Fingerprint</button>
                        </div>
                    </div>
                </div>

                <form id="timesheetForm" class="mt-4">
                    <div class="mb-3">
                        <label>Employee ID:</label>
                        <input type="text" class="form-control" id="employeeId" required>
                    </div>

                    <div class="btn-group w-100">
                        <button type="button" class="btn btn-success" id="clockIn">Clock In</button>
                        <button type="button" class="btn btn-warning" id="breakStart">Start Break</button>
                        <button type="button" class="btn btn-info" id="lunchStart">Start Lunch</button>
                        <button type="button" class="btn btn-danger" id="clockOut">Clock Out</button>
                    </div>
                </form>

                <div class="mt-4">
                    <h3>Today's Timeline</h3>
                    <div id="timelineDisplay"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
