import { confirmarPago, actualizarContador } from "./carrito.js";

// Leemos el carrito directamente del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Genera un ID de pedido aleatorio
const generarId = () => {
    return `#DS-${Math.floor(Math.random() * 90000) + 10000}`;
};

// Renderiza el recibo con los productos del carrito
const renderPago = () => {
    const items = document.querySelector("#pago-items");
    const subtotal = document.querySelector("#pago-subtotal");
    const total = document.querySelector("#pago-total");
    const id = document.querySelector("#pago-id");

    id.textContent = `ID: ${generarId()}`;

    const totalCalculado = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    items.innerHTML = carrito.map(p => `
        <li class="pago-item">
            <img src="${p.imagen}" alt="${p.nombre}" class="pago-item__img" />
            <div class="pago-item__info">
                <p class="pago-item__nombre">${p.nombre}</p>
                <p class="pago-item__cantidad">Cant: ${p.cantidad}</p>
            </div>
            <span class="pago-item__precio">${(p.precio * p.cantidad).toFixed(2)}€</span>
        </li>
    `).join("");

    subtotal.textContent = `${totalCalculado.toFixed(2)}€`;
    total.textContent = `${totalCalculado.toFixed(2)}€`;
};

// Muestra el mensaje de exito con animacion
const mostrarExito = () => {
    const btnWrapper = document.querySelector("#pago-btn-wrapper");
    const exito = document.querySelector("#pago-exito");

    btnWrapper.style.display = "none";

    exito.innerHTML = `
        <div class="pago-exito__pato">🦆</div>
        <h2 class="pago-exito__titulo">¡Compra realizada con éxito!</h2>
        <p class="pago-exito__texto">Tu pedido está en camino a chapotear...</p>
    `;

    exito.style.display = "flex";
    exito.classList.add("pago-exito--animado");

    confirmarPago();
};

// Evento al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    renderPago();

    // Evento al confirmar pago
    document.querySelector("#btn-confirmar-pago").addEventListener("click", mostrarExito);
});