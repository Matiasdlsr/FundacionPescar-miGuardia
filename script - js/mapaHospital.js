// mapaHospital.js
document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([-34.6158526, -58.4350089], 12); // Coordenadas de Buenos Aires
    
    map.locate({enableHighAccuracy: true})     

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Cargar los hospitales desde el archivo JSON
    fetch('.InfoGuardia/guardias.json')
        .then(response => response.json())
        .then(hospitales => {
            hospitales.forEach(hospital => {
                const marker = L.marker(hospital.lat , hospital.lng).addTo(map);
                marker.bindPopup(`<b>${hospital.name}</b><br>Guardia: ${hospital.type.join(', ')}`);
            });
        }); 
}); 

// Función para obtener colores según el tipo de hospital
function getColor(tipo) {
    switch(tipo) {
        case 'Hospital de niños': return '#FF7F00';
        case 'Atencion Hospitalaria General': return '#FF0000';
        case 'Hospital Psiquiatrico': return '#4B0082';
        case 'Hospital Oftamologico': return '#0000FF';
        case 'Hospital Neuropsiquiatrico': return '#00FF00';
        case 'Hospital de Enfermedades Infecciosas': return '#FFFF00';
        default: return '#000000';
    }
}

// Crear una leyenda para mostrar en el mapa
const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        tipos = ['Hospital de niños', 'Atencion Hospitalaria General', 'Hospital Psiquiatrico', 'Hospital Oftamologico', 'Hospital Neuropsiquiatrico', 'Hospital de Enfermedades Infecciosas'],
        labels = [];

    // Iterar sobre los tipos de hospitales y generar etiquetas de colores
    for (let i = 0; i < tipos.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(tipos[i]) + '"></i> ' +
            tipos[i] + '<br>';    }

    return div;
};

// Añadir la leyenda al mapa
legend.addTo(map);

// Función para añadir un marcador de hospital
function agregarMarcador(lat, lng, name, type) {
    let hospitalIcon = L.divIcon({
        className: 'hospital-icon',
        html: `<div style="background-color:${getColor(tipo)}; width:100%; height:100%; border-radius:50%;"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });

    L.marker([lat, lng], {icon: hospitalIcon})
        .addTo(map)
        .bindPopup("<b>" + name + "</b><br>" + type);
}

hospitales.forEach(hospital => {
    agregarMarcador(hospital.lat, hospital.lng, hospital.name, hospital.type[0]);
});

