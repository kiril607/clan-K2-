document.addEventListener("DOMContentLoaded", () => {
    console.log("Сайт клана загружен!");

    // Функция для отображения определенной секции и скрытия остальных  
    function showSection(sectionId) {
        const sections = document.querySelectorAll('main > section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.add('active');
        }
    }

    // Обработчики кликов на ссылки в навигации  
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартный переход по ссылке  
            const sectionId = link.dataset.section; // Получаем ID секции из атрибута data-section  
            showSection(sectionId); // Показываем нужную секцию  
        });
    });

    // Обработчик для кнопки "Проголосовать"  
    window.vote = function () {
        document.getElementById("vote-message").style.display = "block";
    };
});

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Или любой другой порт  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/process_form', async (req, res) => {
    const { name, email, message } = req.body;

    // Настройки Nodemailer (замените на свои)  
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com', //  SMTP-сервер  
        port: 587, //  Порт SMTP  
        secure: false, // true для 465, false для других портов  
        auth: {
            user: 'your_email@example.com', //  Ваш email  
            pass: 'your_password' //  Ваш пароль  
        },
    });

    const mailOptions = {
        from: email,
        to: 'your_email@example.com', // Куда отправлять  
        subject: 'Новое сообщение с форума клана K2',
        text: `Имя: ${name}\nEmail: ${email}\nСообщение:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Сообщение отправлено');
        res.send("<p style='color: green; font-weight: bold;'>Сообщение успешно отправлено!</p>");
    } catch (error) {
        console.error(error);
        res.status(500).send("<p style='color: red; font-weight: bold;'>Ошибка отправки сообщения.</p>");
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('forum-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить стандартную отправку формы  

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                // Отобразить сообщение об успехе или ошибке  
                form.innerHTML = data; // Заменить содержимое формы на сообщение  
            })
            .catch(error => {
                console.error('Ошибка:', error);
                form.innerHTML = "<p style='color: red; font-weight: bold;'>Ошибка отправки сообщения.</p>";
            });
    });
});  