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