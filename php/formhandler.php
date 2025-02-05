<!-- 

// if($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $username = htmlspecialchars($_POST['username']);
//     $password = htmlspecialchars($_POST['password']);
//     $role = htmlspecialchars($_POST['role']);
//     $error = "";

     // Redirect back to index with success message
    //  header("Location: index.php?status=success");
    //  exit();
    
    //  if(loginUser($username, $password)) {
    //     $redirectUrl = ($_SESSION['user_role'] == 'admin') ? 'admin-dashboard.php' : 'employee-dashboard.php';
    //     header("Location: $redirectUrl");
    //     exit();
    // } 
    // else {
    //     $error = "Invalid username or password";
    // } 

//     if(empty($username) || empty($password)) {
//         $error = "Please fill in all the fields";
//         exit();
//         header("Location: ../index.php");
//     } else {
//         $error = "Invalid username or password";
//     }  

//     echo $error;
//     echo  "These are the data, that the user submitted";
//     echo '<br>';
//     echo $username;
//     echo '<br>';
//     echo $password;
//     echo '<br>';
//     echo $_POST['role'];

//     header("Location: ../index.php");
// }
//  else {
//     header("Location: ../index.php");
//     exit();
// }
//  -->



<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);
    $role = htmlspecialchars($_POST["role"]);
    $error = "";
    
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
