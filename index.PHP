<?php  
if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    $name = $_POST["name"];  
    $email = $_POST["email"];  
    $message = $_POST["message"];  

    $to = "your_email@example.com"; // Замените на ваш email  
    $subject = "Новое сообщение с форума клана K2";  
    $body = "Имя: " . $name . "\n" .  
            "Email: " . $email . "\n" .  
            "Сообщение:\n" . $message;  
    $headers = "From: " . $email;  

    if (mail($to, $subject, $body, $headers)) {  
        echo "<p style='color: green; font-weight: bold;'>Сообщение успешно отправлено!</p>";  
    } else {  
        echo "<p style='color: red; font-weight: bold;'>Ошибка отправки сообщения.</p>";  
    }  
} else {  
    echo "<p style='color: red; font-weight: bold;'>Неверный запрос.</p>";  
}  
?>  