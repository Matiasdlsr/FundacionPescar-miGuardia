/*document.getElementById('loginForm').addEventListener('submit', function(event) {
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
*/

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


    // Función para obtener el nombre del hospital de la URL
    function getHospitalNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('hospital');
    }
    // Función para cargar los hospitales
    function loadHospitals() {

        const hospitalName = getHospitalNameFromURL(); // Obtener el nombre del hospital de la URL new

        fetch('/api/guards')
            .then(response => response.json())
            .then(hospitals => {
                const hospitalCards = document.getElementById('hospitalCards');
                hospitalCards.innerHTML = '';  // Limpiar contenido previo
                
                // Filtrar los hospitales que coincidan con el nombre obtenido de la URL new
                const filteredHospitals = hospitals.filter(hospital => hospital.name === hospitalName);
                    
                // Mostrar solo los hospitales filtrados new
                    filteredHospitals.forEach(hospital => {

                // hospitals.forEach(hospital => {
                    const card = document.createElement('div');
                    card.classList.add('card', hospital.state === 'Ocupado' ? 'saturated' : 'normal');
                    
                    card.innerHTML = `
                        <p>${hospital.typeguard}</p>
                        <p>Piso: ${hospital.piso}</p>
                        <p class="status">${hospital.state}</p>
                    `;
                    hospitalCards.appendChild(card);
                    // Si no tiene datos guardados
                    if (filteredHospitals.length === 0) {
                    hospitalCards.innerHTML = '<p>No se encontraron guardias para este hospital.</p>';
        }
                });
            })
            .catch(error => console.error('Error al cargar hospitales:', error));
    }
    
    //Función para cargar comentarios/reseñas
    function loadFeedback() {
        fetch('/api/comments')
            .then(response => response.json())
            .then(comments => {
                const feedbackSection = document.getElementById('feedbackSection');
                feedbackSection.innerHTML = '';  // Limpiar contenido previo
    
                comments.forEach(comment => {
                    const feedbackCard = document.createElement('div');
                    feedbackCard.classList.add('feedback-card');
                    
                    const createdAt = new Date(comment.createdAt.$date).toLocaleString();
                    feedbackCard.innerHTML = `
                        <p class="name">${comment.name}</p>
                        <p>"${comment.text}"</p>                           
                        <p class="description">${createdAt}</p>
                    `;
                    feedbackSection.appendChild(feedbackCard);
                });
            })
            .catch(error => console.error('Error al cargar comentarios:', error));
    }
    // Función para enviar un nuevo comentario
function submitNewComment() {
    const newCommentText = document.getElementById('newCommentText').value;
    
    if (!newCommentText) {
        alert('Por favor, escribe un comentario antes de enviar.');
        return;
    }

    const newComment = {
        text: newCommentText,
        name: getHospitalNameFromURL(),  // Puedes reemplazar esto con el nombre real si es necesario
        createdAt: new Date().toISOString()
    };

    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    .then(response => response.json())
    .then(data => {
        // Limpiar el textarea después de enviar el comentario
        document.getElementById('newCommentText').value = '';
        loadFeedback();
        // Recargar los comentarios
    })
    .catch(error => console.error('Error al enviar el comentario:', error));
}

// Añadir evento al botón de enviar
document.getElementById('submitComment').addEventListener('click', submitNewComment);

// Cargar los comentarios al iniciar
loadFeedback();



            // Llamar a las funciones para cargar los datos al cargar la página
    // Llamar a las funciones para cargar los datos al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        const hospitalName = getHospitalNameFromURL();
        if (hospitalName) {
            document.getElementById('hospital-title').textContent = hospitalName; // Cambiar título por el nombre del hospital
        }
        loadHospitals();  // Cargar hospitales
        loadFeedback();   // Cargar comentarios/reseñas
    });