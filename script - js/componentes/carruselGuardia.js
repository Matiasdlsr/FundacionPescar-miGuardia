// carruselGuardias.js

document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('hospitales');
  
    // Cargar los hospitales desde el archivo JSON
    fetch('/models/guardias.json')
        .then(response => response.json())
        .then(hospitales => {
            hospitales.forEach(hospital => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `
                    <img src="${hospital.imageUrl}" alt="${hospital.name}" />
                    <h3>${hospital.name}</h3>
                    <p>Guardia: ${hospital.type}</p>
                    <p>Ubicación: ${hospital.dire}</p>
                `;
                swiperWrapper.appendChild(slide);
            });
  
            // Inicializar Swiper
            new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                loop: true,
            });
        });
  });
  