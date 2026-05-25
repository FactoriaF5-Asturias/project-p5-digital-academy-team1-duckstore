import { carrito, actualizarContador } from "./carrito.js";

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

// Evento al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    renderPago();
});