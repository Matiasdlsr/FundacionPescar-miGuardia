document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([-34.6158526, -58.4350089], 12); // Coordenadas de Buenos Aires

    map.locate({enableHighAccuracy: true});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let markers = L.layerGroup().addTo(map);
    let hospitales = [];

    // Cargar los hospitales desde el archivo JSON
    fetch('../InfoGuardia/miGuardia.hospitals.json')
        .then(response => response.json())
        .then(data => {
            hospitales = data;
            mostrarHospitales(hospitales);
            crearLeyenda();
        });

    function mostrarHospitales(hospitalesAMostrar) {
        markers.clearLayers();
        hospitalesAMostrar.forEach(hospital => {
            const lat = parseFloat(hospital.lat);
            const lng = parseFloat(hospital.lng);

            if (!isNaN(lat) && !isNaN(lng)) {
                agregarMarcador(map, lat, lng, hospital.name, hospital.type);
            } else {
                console.error(`Coordenadas inválidas para el hospital: ${hospital.name}`);
            }
        });
    }

    function crearLeyenda() {
        const legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend'),
                tipos = ['Hospital de niños', 'Atencion Hospitalaria General', 'Hospital Psiquiatrico', 'Hospital Oftamologico', 'Hospital Neuropsiquiatrico', 'Hospital de Enfermedades Infecciosas'];

            for (let i = 0; i < tipos.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(tipos[i]) + '"></i> ' +
                    tipos[i] + '<br>';    
            }

            return div;
        };
        legend.addTo(map);
    }

    function getColor(tipo) {
        switch(tipo) {
            case 'Hospital de niños': return '#4CAF50';
            case 'Atencion Hospitalaria General': return '#F44336';
            case 'Hospital Psiquiatrico': return '#9C27B0';
            case 'Hospital Oftamologico': return '#2196F3';
            case 'Hospital Neuropsiquiatrico': return '#FFC107';
            case 'Hospital de Enfermedades Infecciosas': return '#FF5722';
            default: return '#9E9E9E';
        }
    }

    function agregarMarcador(map, lat, lng, name, type) {
        let hospitalIcon = L.divIcon({
            className: 'hospital-icon',
            html: `<div style="background-color:${getColor(type)}; width:20px; height:20px; border-radius:50%;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -10]
        });

        L.marker([lat, lng], {icon: hospitalIcon})
            .addTo(markers)
            .bindPopup(`<b>${name}</b><br>${type}`);
    }

    // Función para filtrar hospitales
       // Función para filtrar hospitales
       function filtrarHospitales(busqueda) {
        return hospitales.filter(hospital => 
            hospital.name.toLowerCase().includes(busqueda.toLowerCase())
        );
    }
    // Función para actualizar la lista de sugerencias
    function actualizarSugerencias(hospitalesFiltrados) {
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = '';
        hospitalesFiltrados.forEach(hospital => {
            const suggestion = document.createElement('div');
            suggestion.textContent = hospital.name;
            suggestion.classList.add('suggestion');
            suggestion.addEventListener('click', () => {
                redirigirAHospital(hospital);
            });
            suggestionsContainer.appendChild(suggestion);
        });
    }
   
      // Función para redirigir a la página del hospital
      function redirigirAHospital(nombreHospital) {
        window.location.href = `/admin/`;
    }

   // Evento de entrada en el campo de búsqueda
   document.getElementById('place-input').addEventListener('input', function () {
    const input = this.value;
    if (input.length > 2) {
        const hospitalesFiltrados = filtrarHospitales(input);
        actualizarSugerencias(hospitalesFiltrados);
    } else {
        document.getElementById('suggestions').innerHTML = '';
    }
});

// Evento de clic en el botón de búsqueda
document.getElementById('search-button').addEventListener('click', function () {
    const input = document.getElementById('place-input').value;
    const hospitalesFiltrados = filtrarHospitales(input);
    
    if (hospitalesFiltrados.length > 0) {
        redirigirAHospital(hospitalesFiltrados[0].name);
    } else {
        alert('No se encontraron hospitales que coincidan con la búsqueda');
    }
});
});