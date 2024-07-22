document.getElementById('loginForm').addEventListener('submit', function(event) 
{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Validación básica
    if (email === 'email@ejemplo.com' && password === 'contraseña') {
        errorMessage.textContent = '';
        alert('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario a otra página o realizar otra acción
    } else {
        errorMessage.textContent = 'Email o contraseña incorrectos';
    }
});