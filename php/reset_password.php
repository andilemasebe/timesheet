<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        .container {
            max-width: 400px;
            margin: 40px auto;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .btn-submit {
            width: 100%;
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #message {
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 4px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Reset Your Password</h2>
        
        <div id="message"></div>

        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <div class="form-group">
                <label for="token">Reset Token:</label>
                <input type="text" id="token" name="token" required>
            </div>

            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" required>
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirm New Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>

            <button type="submit" class="btn-submit">Reset Password</button>
        </form>
    </div>

    <script>
        // Show message div when there's content
        document.addEventListener('DOMContentLoaded', function() {
            const messageDiv = document.getElementById('message');
            if (messageDiv.innerHTML.trim() !== '') {
                messageDiv.style.display = 'block';
            }
        });
    </script>
</body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once 'config/database.php';

    $token = $_POST['token'];
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $newPassword = $_POST['newPassword'];
    $confirmPassword = $_POST['confirmPassword'];
    
    // Add message div if it doesn't exist
    echo "<div id='message'></div>";

    if ($newPassword === $confirmPassword) {
        try {
            $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Verify token and update password
            $stmt = $pdo->prepare("SELECT user_id FROM password_reset_tokens WHERE token = ? AND email = ? AND expires_at > NOW() AND used = 0");
            $stmt->execute([$token, $email]);
            
            if ($stmt->rowCount() > 0) {
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                
                // Update password
                $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
                $updateStmt->execute([$hashedPassword, $email]);
                
                // Mark token as used
                $tokenStmt = $pdo->prepare("UPDATE password_reset_tokens SET used = 1 WHERE token = ?");
                $tokenStmt->execute([$token]);
                
                $message = 'Password successfully reset!';
            } else {
                $message = 'Invalid or expired token!';
            }
        } catch(PDOException $e) {
            $message = 'Error: ' . $e->getMessage();
        }
    } else {
        $message = 'Passwords do not match!';
    }
    
    // Output message using JavaScript after ensuring div exists
    echo "<script>
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('message').innerHTML = '" . htmlspecialchars($message, ENT_QUOTES) . "';
        });
    </script>";
}
?>
