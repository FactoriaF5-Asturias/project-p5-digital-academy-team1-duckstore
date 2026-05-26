import { ducks } from './ducks.js';

const gridPatitos = document.querySelector('#contenedor-patitos');
const botonesFiltros = document.querySelectorAll('.filters__btn'); // <- Seleccionamos los botones de filtros

// Función para generar el catálogo usando .map() y Template Strings
function generarCards(productos) {
    const mapeoTarjetas = productos.map(pato => {
        // Formateamos el precio para que aparezca con coma y el símbolo del euro
        const precioNumero = Number(pato.precio);
        const precioParaPantalla = !isNaN(precioNumero) 
            ? `${precioNumero.toFixed(2).replace('.', ',')}€` 
            : pato.precio;

        // Limpiamos los espacios en la categoría para las clases CSS
        const claseCategoria = pato.categoria 
            ? pato.categoria.toLowerCase().replace(' ', '-') 
            : 'default';

        // RETORNAMOS EL BLOQUE HTML (¡Aquí ya le añadimos el ?id=${pato.id} para que funcione el detalle!)
        return `
            <article class="product-card">
                <span class="product-card__badge product-card__badge--${claseCategoria}">${pato.categoria}</span>
                <div class="product-card__image-container">
                    <img class="product-card__image" src="${pato.imagen}" alt="${pato.nombre}" />
                </div>
                <h2 class="product-card__title">${pato.nombre}</h2>
                <p class="product-card__price">${precioParaPantalla}</p>
                <a href="detalle.html?id=${pato.id}" class="product-card__button">Ver detalle</a>
            </article>
        `;
    });

    return mapeoTarjetas;
}

// Función para pintar las tarjetas en la pantalla usando innerHTML
function mostrarCatalogo(productos) {
    const tarjetasFormateadas = generarCards(productos);
    
    // .join('') une todas las tarjetas del array en una sola cadena de texto limpia
    gridPatitos.innerHTML = tarjetasFormateadas.join('');
}

botonesFiltros.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // 1. Quitamos la clase 'active' de todos los botones y se la ponemos al que tocamos
        botonesFiltros.forEach(btn => btn.classList.remove('filters__btn--active'));
        e.target.classList.add('filters__btn--active');

        // 2. Capturamos la categoría del botón (todos, clasicos, superheroes, etc.)
        const categoriaSeleccionada = e.target.getAttribute('data-category');

        // 3. Filtramos el array de patitos
        if (categoriaSeleccionada === 'todos') {
            mostrarCatalogo(ducks); // Si pulsa Todos, mostramos toda la lista
        } else {
            // Filtramos comparando que la categoría del patito coincida (pasándolo a minúsculas y quitando tildes de forma simple)
            const patitosFiltrados = ducks.filter(pato => {
                const categoriaPatoLimpia = pato.categoria
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "") // Esto quita los acentos de "Superhéroes" automáticamente
                    .replace(' ', '-');
                return categoriaPatoLimpia === categoriaSeleccionada;
            });
            mostrarCatalogo(patitosFiltrados);
        }
    });
});

// Ejecutamos la función nada más cargar la página para que se vean todos los patitos al inicio
mostrarCatalogo(ducks);

// 1. Seleccionamos todos los botones que tengan la clase de filtro
const botonesFiltros = document.querySelectorAll('.filters__btn');

// 2. Añadimos el evento click a cada uno de ellos
botonesFiltros.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesFiltros.forEach(btn => btn.classList.remove('filters__btn--active'));
        e.target.classList.add('filters__btn--active');

        const categoria = e.target.getAttribute('data-category');
        
        // Filtrar el array con filter() al hacer click
        const patitosFiltrados = ducks.filter(pato => {
            const categoriaPatoLimpia = pato.categoria
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Quita los acentos de "Superhéroes"
                .replace(' ', '-');
            
            return categoriaPatoLimpia === categoria;
        });

        mostrarCatalogo(patitosFiltrados);
    });
});