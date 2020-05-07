<?php

    $name = $_POST['user-name'];
    $phone = $_POST['user-phone'];
    $street = $_POST['user-street'];
    $home = $_POST['user-home'];
    $hausing = $_POST['user-hausing'];
    $apart = $_POST['user-apart'];
    $floor = $_POST['user-floor'];
    $comment = $_POST['user-comment'];
    $purchase = $_POST['purchase'];

    $nocall = $_POST['nocall']; 
    $nocall = isset($nocall) ? 'НЕТ' : 'ДА';

    $mail_message = '
    <html>
    <head>
        <title>Заявка</title>
    </head>
    <body>
        <h2>Заказ</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Номер телефона: ' . $phone . '</li>
            <li>Улица: ' . $street . '</li>
            <li>Дом: ' . $home . '</li>
            <li>Корпус: ' . $hausing . '</li>
            <li>Квартира: ' . $apart . '</li>
            <li>Этаж: ' . $floor . '</li>
            <li>Комментарий: ' . $comment . '</li>
            <li>Способ оплаты: ' . $purchase . '</li>
            <li>Нужно ли перезванивать клиенту: ' . $nocall . '</li>
        </ul>
    </body>
    </html>';

    $headers = "From: Администратор сайта <admin@burger.ru>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('alexandr_web@mail.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    $mail ? $data['status'] = true : $data['status'] = false;

    echo json_encode($data);

?>
