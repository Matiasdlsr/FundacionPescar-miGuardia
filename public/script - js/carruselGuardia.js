// carruselGuardias.js

document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('hospitales');
    const swiperContainer = document.querySelector('.swiper-container');

    // Cargar los hospitales desde el archivo JSON
    fetch('../InfoGuardia/guardias.json')
        .then(response => response.json())
        .then(hospitales => {
            hospitales.forEach(hospital => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = 
                   `<img src="${hospital.imageUrl}" alt="${hospital.name}" />
                    <h3>${hospital.name}</h3>
                    <p>Guardia: ${hospital.type}</p>
                    <p>Ubicación: ${hospital.dire}</p>` 
                ;
                swiperWrapper.appendChild(slide);
            });

            // Crear y agregar botones de navegación dinámicamente
            const prevButton = document.createElement('div');
            prevButton.classList.add('custom-button-prev');
            prevButton.innerHTML = '<ion-icon name="arrow-back-outline"></ion-icon>'; // Icono personalizado

            const nextButton = document.createElement('div');
            nextButton.classList.add('custom-button-next');
            nextButton.innerHTML = '<ion-icon name="arrow-forward-outline"></ion-icon>'; // Icono personalizado

            // Agregar los botones al contenedor del carrusel
            swiperContainer.appendChild(prevButton);
            swiperContainer.appendChild(nextButton);

            // Inicializar Swiper
            new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
},
                navigation: {
                    nextEl: '.custom-button-next',
                    prevEl: '.custom-button-prev',
                },
                loop: true,
            });
        });
});