<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <form action="formhandler.php" method="POST">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
    </form>
</body>
</html>

