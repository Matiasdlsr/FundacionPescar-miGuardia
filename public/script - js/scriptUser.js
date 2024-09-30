document.addEventListener('DOMContentLoaded', () => {
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.getElementById('register-container');
    const loginAdminBtn = document.getElementById('loginAdmin');

    // Mostrar formulario de registro
    showRegisterBtn.onclick = function() {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
        loginAdminBtn.style.display = 'none'; // Ocultar botón de Admin
    }

    // Volver al formulario de login
    showLoginBtn.onclick = function() {
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        loginAdminBtn.style.display = 'block'; // Mostrar botón de Admin
    }

    // Validación de formularios
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;

        // Validación de contraseñas
        if (password !== password2) {
            event.preventDefault();
            alert('Las contraseñas no coinciden.');
        }
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        const username = document.getElementById('email').value; // Cambia a 'email'
        const password = document.getElementById('passwordLogin').value; // Cambia a 'passwordLogin'

        if (username.trim() === '' || password.trim() === '') {
            event.preventDefault();
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (password.length < 6) {
            event.preventDefault();
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
    });
});
