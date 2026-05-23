import { ducks } from './ducks.js';

const gridPatitos = document.getElementById('contenedor-patitos');
// Seleccionamos todos los botones de filtro
const botonesFiltro = document.querySelectorAll('.filters__btn');

// 1. Tu función de pintar que ya funcionaba perfectamente
function renderizarCatalogo(listaDePatitos) {
    gridPatitos.innerHTML = "";

    listaDePatitos.forEach(pato => {
        const claseBadge = pato.categoria.toLowerCase().replace('é', 'e').replace(' ', '-');

        const tarjeta = `
            <article class="product-card">
                <span class="product-card__badge product-card__badge--${claseBadge}">${pato.categoria}</span>
                <div class="product-card__image-container">
                    <img class="product-card__image" src="${pato.imagen}" alt="${pato.nombre}" />
                </div>
                <h2 class="product-card__title">${pato.nombre}</h2>
                <p class="product-card__price">${pato.precio}</p>
                <a href="detalle.html" class="product-card__button">Ver detalle</a>
            </article>
        `;
        gridPatitos.innerHTML += tarjeta;
    });
}

// 2. NUEVO: Lógica para filtrar al hacer clic
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Desactivamos el diseño activo del botón anterior
        document.querySelector('.filters__btn--active')?.classList.remove('filters__btn--active');
        // Activamos el diseño en el botón que acabamos de pulsar
        boton.classList.add('filters__btn--active');

        // Capturamos la categoría que queremos filtrar
        const categoriaSeleccionada = e.target.getAttribute('data-category');

        if (categoriaSeleccionada === 'todos') {
            // Si pulsa 'Todos', mostramos el array completo
            renderizarCatalogo(ducks);
        } else {
            // Si pulsa otra cosa, filtramos el array dejando solo los que coincidan
            const patitosFiltrados = ducks.filter(pato => pato.categoria === categoriaSeleccionada);
            renderizarCatalogo(patitosFiltrados);
        }
    });
});

// 3. Ejecución inicial al cargar la página
renderizarCatalogo(ducks);