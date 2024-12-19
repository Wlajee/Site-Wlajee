document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем значения из полей ввода
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const messageElement = document.getElementById('message');

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
        messageElement.textContent = "Пароли не совпадают!";
        messageElement.style.display = 'block';
        return;
    }

    // Проверка на пустые поля
    if (!username || !password) {
        messageElement.textContent = "Все поля должны быть заполнены!";
        messageElement.style.display = 'block';
        return;
    }

    // Сохранение данных в LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Проверка на существование логина
    if (users.some(user => user.username === username)) {
        messageElement.textContent = "Пользователь с таким логином уже существует!";
        messageElement.style.display = 'block';
        return;
    }

    // Добавляем нового пользователя
    users.push({ username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));

    // Уведомление об успешной регистрации
    messageElement.textContent = "Регистрация прошла успешно!";
    messageElement.style.color = 'green';
    messageElement.style.display = 'block';

    // Обновляем список пользователей
    displayUsers(users);

    // Очистка формы
    document.getElementById('registrationForm').reset();
});

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = ''; // Очищаем список пользователей

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `Логин: ${user.username}`;
        usersList.appendChild(li);
    });
}

// Загружаем и отображаем сохраненных пользователей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    displayUsers(users);
});
