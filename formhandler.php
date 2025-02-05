<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // You can process the data here
    // For example, send an email or save to database
    
    // Redirect back to index with success message
    header("Location: index.php?status=success");
    exit();
} else {
    // Redirect back to index if accessed directly
    header("Location: index.php");
    exit();
}
?>
