fetch('../InfoGuardia/miGuardia.hospitals.json')
.then(response => response.json())
.then(data => {
    hospitales = data;
}); 

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var hospitalName = document.getElementById('tituloHospital').value;
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('hospitalInterface').style.display = 'block';
    document.getElementById('hospitalName').textContent = hospitalName;
});

function showModal(action) {
      alert('Acción: ' + action + ' - Esta funcionalidad aún no está implementada.');
}
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
