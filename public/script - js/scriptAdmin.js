document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Validación del formato de correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Formato de correo no válido';
        return;
    }

    // Validación de campos vacíos
    if (email === '' || password === '') {
        errorMessage.textContent = 'Email y contraseña son obligatorios';
        return;
    }

    // Aquí haces la petición fetch
    fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Aquí podrías redirigir o manejar la respuesta
        // Ejemplo: redirigir a otra página
        window.location.href = "/dashboard";
    })
    .catch(error => {
        errorMessage.textContent = 'Error en el servidor: ' + error.message;
    });
});
