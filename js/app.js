// 1. Importamos el array de patitos desde el archivo de datos
import { ducks } from './ducks.js';

// 2. Seleccionamos el contenedor de tu catálogo en el HTML donde se pintarán los patos
// (Asegúrate de que en tu catalogo.html tu <main> o <div> de la rejilla tenga el id="contenedor-patitos")
const gridPatitos = document.getElementById('contenedor-patitos');

// 3. Función para pintar los patitos en la pantalla
function renderizarCatalogo(listaDePatitos) {
    // Vaciamos el contenedor por si acaso tiene cosas dentro
    gridPatitos.innerHTML = "";

    // Recorremos cada patito del array
    listaDePatitos.forEach(pato => {
        // Creamos la estructura de la tarjeta (el molde que desglosamos en el wireframe)
        const tarjeta = `
            <article class="product-card">
                <div class="product-card__badge">${pato.categoria}</div>
                <div class="product-card__img-container">
                    <img src="${pato.imagen}" alt="${pato.nombre}" class="product-card__img">
                </div>
                <h3 class="product-card__title">${pato.nombre}</h3>
                <p class="product-card__price">${pato.precio}</p>
                <button class="product-card__button">
                    Añadir al carrito
                </button>
            </article>
        `;
        // Lo metemos dentro de la rejilla de tu HTML
        gridPatitos.innerHTML += tarjeta;
    });
}

// 4. Ejecutamos la función pasándole todos nuestros patitos al cargar la página
renderizarCatalogo(ducks);