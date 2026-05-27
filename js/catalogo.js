import { ducks } from "./ducks.js";

const gridPatitos = document.querySelector("#contenedor-patitos");
const botonesFiltros = document.querySelectorAll(".filters__btn");

// FUNCIÓN PARA GENERAR EL HTML DE LAS TARJETAS
function generarCards(productos) {
    const mapeoTarjetas = productos.map((pato) => {
        const precioNumero = Number(pato.precio);
        const precioParaPantalla = !isNaN(precioNumero)
            ? `${precioNumero.toFixed(2).replace(".", ",")}€`
            : pato.precio;

        const claseCategoria = pato.categoria
            ? pato.categoria.toLowerCase().replace(" ", "-")
            : "default";

        return `
            <article class="product-card">
                <span class="product-card__badge product-card__badge--${claseCategoria}">${pato.categoria}</span>
                <div class="product-card__image-container">
                    <img class="product-card__image" src="${pato.imagen}" alt="${pato.nombre}" />
                </div>
                <h2 class="product-card__title">${pato.nombre}</h2>
                <p class="product-card__price">${precioParaPantalla}</p>
                <a href="detalle.html?id=${pato.id}" class="product-card__button">Ver detalle</a>
                <button class="product-card__button btn-agregar-carrito" data-id="${pato.id}" style="margin-top: 8px; background-color: #ffd60a;">Añadir al carrito</button>
            </article>
        `;
    });
    return mapeoTarjetas;
}

// FUNCIÓN PARA PINTAR LAS TARJETAS EN PANTALLA
function mostrarCatalogo(productos) {
    const tarjetasFormateadas = generarCards(productos);
    gridPatitos.innerHTML = tarjetasFormateadas.join("");
}

// LÓGICA DE LOS FILTROS
botonesFiltros.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        botonesFiltros.forEach((btn) => btn.classList.remove("filters__btn--active"));
        e.target.classList.add("filters__btn--active");

        const categoriaSeleccionada = e.target.getAttribute("data-category");

        if (categoriaSeleccionada === "todos") {
            mostrarCatalogo(ducks);
        } else {
            const patitosFiltrados = ducks.filter((pato) => {
                const categoriaPatoLimpia = pato.categoria
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(" ", "-");
                return categoriaPatoLimpia === categoriaSeleccionada;
            });
            mostrarCatalogo(patitosFiltrados);
        }
    });
});

// Carga inicial del catálogo
mostrarCatalogo(ducks);

// Definimos un array vacío para almacenar los patitos que añadamos al carrito
const carrito = [];

// Añadir evento click al botón de cada card usando delegación de eventos
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar-carrito") && e.target.tagName === "BUTTON") {
        const patitoId = e.target.getAttribute("data-id");
        console.log(`Subtarea 2: Se ha pulsado el botón añadir al carrito del patito con ID: ${patitoId}`);
    }
});