let map;
let autocomplete;

window.initMap = function() {
    const coords = { lat: -34.59017675796801, lng: -58.45562526142192 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: coords,
    });

    const marker = new google.maps.Marker({
        position: coords,
        map: map,
    });

    searchGoogleMap(); 
};

const searchGoogleMap = () => {
    const placeInput = document.getElementById("place-input");
    
    
    autocomplete = new google.maps.places.Autocomplete(placeInput, {
        types: ['establishment'],
        componentRestrictions: { country: 'ar' },
        fields: ['place_id', 'geometry', 'name', 'types']
    });

    // Filtrar por hospitales y guardias
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name', 'type']);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.types.includes('hospital')) {
            console.log("No details available for input: '" + place.name + "'");
            return;
        }
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            map.setZoom(13);
            new google.maps.Marker({
                position: place.geometry.location,
                map: map,
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const placeInput = document.getElementById("place-input").value;
        const request = {
            query: placeInput,
            fields: ['name', 'geometry'],
            types: ['hospital']
        };

        const service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(13);
                results.forEach(result => {
                    new google.maps.Marker({
                        position: result.geometry.location,
                        map: map,
                    });
                });
            }
        });
    });
});

// Seccion de comentarios

document.getElementById('comment-form').addEventListener('submit', function(e) { //comment-add es el id del elemento que envia el comentario
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Crear la fecha actual en formato dd/mm/yyyy
    const date = new Date();
    const formattedDate = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Crear una nueva fila para la tabla
    const newRow = document.createElement('tr');

    // Crear las celdas
    const nameCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const commentCell = document.createElement('td');

    // Asignar contenido a las celdas
    nameCell.innerHTML = `<img src="https://via.placeholder.com/30" alt="avatar"> ${name}`;
    dateCell.textContent = formattedDate;
    commentCell.textContent = comment;

    // Añadir las celdas a la nueva fila
    newRow.appendChild(nameCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(commentCell);

    // Añadir la nueva fila al cuerpo de la tabla
    document.getElementById('comments-table-body').appendChild(newRow);

    // Limpiar el formulario
    document.getElementById('comment-form').reset();
});

// fin seccion comentarios

// popup
document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});