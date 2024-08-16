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

//-----------------------------


document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    const map = L.map('map').setView([-34.6037, -58.3816], 13); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Datos de hospitales (Ejemplo)
    const hospitales = [
        { nombre: 'Hospital Ramos Mejía', ubicacion: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
        { nombre: 'Hospital Italiano', ubicacion: 'Buenos Aires', lat: -34.6050, lng: -58.3800 },
        { nombre: 'Hospital de Clínicas', ubicacion: 'Buenos Aires', lat: -34.6070, lng: -58.3790 }
        // Agrega más hospitales según tus datos
    ];

    // Configuración del autocompletado
    const hospitalNames = hospitales.map(h => h.nombre);
    const searchInput = document.getElementById('place-input');

    const typeahead = new Typeahead({
        input: searchInput,
        source: hospitalNames,
        minLength: 1,
        items: 5
    });

    searchInput.addEventListener('typeahead:selected', function(event, selected) {
        const hospital = hospitales.find(h => h.nombre === selected);
        if (hospital) {
            map.setView([hospital.lat, hospital.lng], 15);
            L.marker([hospital.lat, hospital.lng]).addTo(map)
                .bindPopup(hospital.nombre)
                .openPopup();
        }
    });

    // Función para manejar la búsqueda y redirigir a otra página
    document.getElementById('search-button').addEventListener('click', function() {
        const query = document.getElementById('place-input').value.toLowerCase();
        const hospital = hospitales.find(h => h.nombre.toLowerCase().includes(query) && h.ubicacion.toLowerCase() === 'buenos aires');
        
        if (hospital) {
            window.location.href = `/hospital/${hospital.nombre.replace(/\s+/g, '-').toLowerCase()}`;
        } else {
            alert('No se ha encontrado hospitales');
        }
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev',
            
        },
    });
});