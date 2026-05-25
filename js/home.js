import { ducks } from "./ducks.js";

// Muestra los patitos destacados en la home
const renderDestacados = () => {
    const grid = document.querySelector("#featured-grid");
    const destacados = ducks.filter((pato) => pato.destacado === true).slice(0, 3);

    grid.innerHTML = destacados.map((pato) => `
        <article class="product-card">
            <div class="product-card__img-wrapper">
                <img src="${pato.imagen}" alt="${pato.nombre}" class="product-card__img" />
            </div>
            <div class="product-card__info">
                <div class="product-card__header">
                    <h3 class="product-card__name">${pato.nombre}</h3>
                    <span class="product-card__price">${pato.precio}€</span>
                </div>
                <p class="product-card__desc">${pato.descripcion}</p>
                <a href="pages/detalle.html?id=${pato.id}" class="product-card__btn">Ver detalle</a>
            </div>
        </article>
    `).join("");
};

// Evento al cargar el DOM
document.addEventListener("DOMContentLoaded", renderDestacados);