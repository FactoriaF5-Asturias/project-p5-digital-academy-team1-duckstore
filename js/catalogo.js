import { ducks } from './ducks.js';

const gridPatitos = document.querySelector('#contenedor-patitos');
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

        // Retornamos el bloque de HTML usando template strings (comillas invertidas)
        return `
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
    });

    return mapeoTarjetas;
}

// Función para pintar las tarjetas en la pantalla usando innerHTML
function mostrarCatalogo(productos) {
    const tarjetasFormateadas = generarCards(productos);
    
    // .join('') une todas las tarjetas del array en una sola cadena de texto limpia
    gridPatitos.innerHTML = tarjetasFormateadas.join('');
}

// Ejecutamos la función nada más cargar la página para que se vean todos los patitos
mostrarCatalogo(ducks);