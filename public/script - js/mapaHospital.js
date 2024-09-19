document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([-34.6158526, -58.4350089], 12); // Coordenadas de Buenos Aires

    map.locate({enableHighAccuracy: true});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Cargar los hospitales desde el archivo JSON
    fetch('../InfoGuardia/guardias.json')
        .then(response => response.json())
        .then(hospitales => {
            hospitales.forEach(hospital => {
                // Verificar si lat y lng son números válidos
                const lat = parseFloat(hospital.lat);
                const lng = parseFloat(hospital.lng);

                if (!isNaN(lat) && !isNaN(lng)) {
                    // Agregar marcador con ícono personalizado
                    agregarMarcador(map, lat, lng, hospital.name, hospital.type);
                } else {
                    console.error(`Coordenadas inválidas para el hospital: ${hospital.name}`);
                }
            });

            // Crear una leyenda para mostrar en el mapa
            const legend = L.control({position: 'bottomright'});

            legend.onAdd = function (map) {
                let div = L.DomUtil.create('div', 'info legend'),
                    tipos = ['Hospital de niños', 'Atencion Hospitalaria General', 'Hospital Psiquiatrico', 'Hospital Oftamologico', 'Hospital Neuropsiquiatrico', 'Hospital de Enfermedades Infecciosas'];

                // Iterar sobre los tipos de hospitales y generar etiquetas de colores
                for (let i = 0; i < tipos.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor(tipos[i]) + '"></i> ' +
                        tipos[i] + '<br>';    
                }

                return div;
            };

            // Añadir la leyenda al mapa
            legend.addTo(map);
        });

    // Función para obtener colores según el tipo de hospital
    function getColor(tipo) {
        switch(tipo) {
            case 'Hospital de niños': return '#4CAF50'; // Verde
            case 'Atencion Hospitalaria General': return '#F44336'; // Rojo
            case 'Hospital Psiquiatrico': return '#9C27B0'; // Púrpura
            case 'Hospital Oftamologico': return '#2196F3'; // Azul
            case 'Hospital Neuropsiquiatrico': return '#FFC107'; // Amarillo
            case 'Hospital de Enfermedades Infecciosas': return '#FF5722'; // Naranja oscuro
            default: return '#9E9E9E'; // Gris
        }
    }

    // Función para añadir un marcador de hospital
    function agregarMarcador(map, lat, lng, name, type) {
        let hospitalIcon = L.divIcon({
            className: 'hospital-icon',
            html: `<div style="background-color:${getColor(type)}; width:20px; height:20px; border-radius:50%;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -10]
        });

        L.marker([lat, lng], {icon: hospitalIcon})
            .addTo(map)
            .bindPopup(`<b>${name}</b><br>${type}`);
    }

    // Función para manejar la búsqueda y redirigir
    document.getElementById('search-button').addEventListener('click', function () {
        const input = document.getElementById('place-input').value.toLowerCase();

        fetch('../InfoGuardia/guardias.json')
            .then(response => response.json())
            .then(hospitales => {
                const hospital = hospitales.find(h => h.name.toLowerCase() === input);
                if (hospital) {
                    // Redirigir a la página específica para ver la disponibilidad
                    window.location.href = `/ver-disponibilidad?name=${encodeURIComponent(hospital.name)}`;
                } else {
                    alert('Hospital no encontrado');
                }
            });
    });
});
