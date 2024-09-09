document.getElementById('loginForm').addEventListener('submit', function(event) 
{
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Validación básica
    if (email === 'email@ejemplo.com' && password === 'contraseña') {
        errorMessage.textContent = '';
        // Aquí puedes redirigir al usuario a otra página o realizar otra acción
        const res = fetch("http://localhost:3000/admin/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        
    } else {
        errorMessage.textContent = 'Email o contraseña incorrectos';
    }
    
});