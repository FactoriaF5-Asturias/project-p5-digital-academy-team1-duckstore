import { ducks } from './ducks.js';

const gridPatitos = document.getElementById('contenedor-patitos');
const botonesFiltro = document.querySelectorAll('.filters__btn');

// ==========================================================================
// 1. FUNCIÓN PRINCIPAL PARA PINTAR LOS PATITOS EN LA WEB
// ==========================================================================
function mostrarPatitos(productos) {
    gridPatitos.innerHTML = '';

    productos.forEach(pato => {
        // Transformamos el precio a número y le ponemos el formato de euro con coma
        const precioNumero = Number(pato.precio);
        const precioParaPantalla = !isNaN(precioNumero) 
            ? `${precioNumero.toFixed(2).replace('.', ',')}€` 
            : pato.precio;

        // Evitamos errores con los espacios en las categorías para las cápsulas de CSS
        const claseCategoria = pato.categoria 
            ? pato.categoria.toLowerCase().replace(' ', '-') 
            : 'default';

        const tarjeta = `
            <article class="product-card">
                <span class="product-card__badge product-card__badge--${claseCategoria}">${pato.categoria}</span>
                <div class="product-card__image-container">
                    <img class="product-card__image" src="${pato.imagen}" alt="${pato.nombre}" />
                </div>
                <h2 class="product-card__title">${pato.nombre}</h2>
                <p class="product-card__price">${precioParaPantalla}</p>
                <a href="detalle.html" class="product-card__button">Ver detalle</a>
            </article>
        `;
        gridPatitos.innerHTML += tarjeta;
    });
}

// ==========================================================================
// 2. LÓGICA PARA FILTRAR AL HACER CLIC EN LOS BOTONES
// ==========================================================================
botonesFiltro.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Desactivamos el diseño activo del botón anterior
        document.querySelector('.filters__btn--active')?.classList.remove('filters__btn--active');
        
        // Activamos el botón actual
        e.target.classList.add('filters__btn--active');

        const categoriaSeleccionada = e.target.textContent.trim();

        if (categoriaSeleccionada === "Todos") {
            mostrarPatitos(ducks);
        } else {
            const patitosFiltrados = ducks.filter(pato => pato.categoria === categoriaSeleccionada);
            mostrarPatitos(patitosFiltrados);
        }
    });
});

// ==========================================================================
// 3. LLAMADA INICIAL: Carga todos los patitos nada más abrir la web
// ==========================================================================
mostrarPatitos(ducks);