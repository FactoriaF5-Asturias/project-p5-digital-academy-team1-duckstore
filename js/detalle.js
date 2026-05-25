import { ducks } from "./ducks.js";
import { agregarAlCarrito } from "./carrito.js";

// Busca el patito por id en la URL y lo muestra en el detalle
const renderDetalle = () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const pato = ducks.find((p) => p.id === id);
    const contenedor = document.querySelector("#detalle-producto");
    const breadcrumb = document.querySelector("#breadcrumb-nombre");

    if (!pato) {
        contenedor.innerHTML = `<p>Producto no encontrado.</p>`;
        return;
    }

    breadcrumb.textContent = pato.nombre;

    contenedor.innerHTML = `
        <section class="detalle__imagen">
            <span class="detalle__imagen-badge">${pato.categoria}</span>
            <img src="${pato.imagen}" alt="${pato.nombre}" class="detalle__imagen-img" />
        </section>
        <section class="detalle__info">
            <h1 class="detalle__info-title">${pato.nombre}</h1>
            <div class="detalle__info-prices">
                <span class="detalle__info-price">${pato.precio}€</span>
            </div>
            <hr class="detalle__info-divider" />
            <p class="detalle__info-description">${pato.descripcion}</p>
            <button id="btn-añadir" class="product-card__btn">
                <i class="fa-solid fa-cart-shopping"></i> Añadir al carrito
            </button>
        </section>
    `;

    // Evento al pulsar añadir al carrito
    document.querySelector("#btn-añadir").addEventListener("click", () => {
        agregarAlCarrito(pato);
    });
};

// Evento al cargar el DOM
document.addEventListener("DOMContentLoaded", renderDetalle);