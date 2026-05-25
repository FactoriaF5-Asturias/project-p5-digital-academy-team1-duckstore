// Recuperamos el carrito del navegador o empezamos vacio
const carritoGuardado = localStorage.getItem('carrito');
export let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// Guardamos el carrito en el navegador
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Añadir al carrito
export const agregarAlCarrito = (pato) => {
    const existe = carrito.find(p => p.id === pato.id);
    if (existe) {
        alert('Este patito ya está en el carrito.');
        return;
    }
    carrito.push({ ...pato, cantidad: 1 });
    guardarCarrito();
    actualizarContador();
    renderCarrito();
};

// Actualizar contador del nav
export const actualizarContador = () => {
    const contador = document.querySelector('#contador-carrito');
    if (contador) contador.textContent = carrito.length;
};

// Pintar el carrito en pantalla
export const renderCarrito = () => {
    const contenedor = document.querySelector('#carrito-items');
    const total = document.querySelector('#carrito-total');
    if (!contenedor) return;

    // Actualizar subtitulo segun productos en carrito
    const subtitulo = document.querySelector('#carrito-subtitulo');
    if (subtitulo) {
        subtitulo.textContent = carrito.length === 0
            ? 'Tu carrito esta vacio.'
            : `Tienes ${carrito.length} patito${carrito.length === 1 ? '' : 's'} listo${carrito.length === 1 ? '' : 's'} para irse a casa contigo...`;
    }

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p>Tu carrito está vacío.</p>`;
        if (total) total.textContent = '0.00€';
        return;
    }

    contenedor.innerHTML = carrito.map(pato => `
    <li class="carrito-item">
      <img src="${pato.imagen}" alt="${pato.nombre}">
      <div class="carrito-item__info">
        <h4 class="carrito-item__nombre">${pato.nombre}</h4>
        <p class="carrito-item__categoria">${pato.categoria}</p>
        <p class="carrito-item__precio">${Number(pato.precio).toFixed(2)}€</p>
      </div>
      <div class="carrito-item__cantidad">
        <button class="btn-decrementar" data-id="${pato.id}">−</button>
        <span>${pato.cantidad}</span>
        <button class="btn-incrementar" data-id="${pato.id}">+</button>
      </div>
      <div class="carrito-item__subtotal">
        <p>Subtotal: <strong>${(pato.precio * pato.cantidad).toFixed(2)}€</strong></p>
        <button class="btn-eliminar" data-id="${pato.id}">🗑️ Eliminar</button>
      </div>
    </li>
  `).join('');

    const totalCalculado = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    if (total) total.textContent = `${totalCalculado.toFixed(2)}€`;
    agregarEventosCarrito();
};

// Eventos de los botones del carrito
const agregarEventosCarrito = () => {
    document.querySelectorAll('.btn-incrementar').forEach(btn => {
        btn.addEventListener('click', () => incrementarCantidad(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-decrementar').forEach(btn => {
        btn.addEventListener('click', () => decrementarCantidad(parseInt(btn.dataset.id)));
    });
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarDelCarrito(parseInt(btn.dataset.id)));
    });
};

// Incrementar cantidad
export const incrementarCantidad = (id) => {
    const pato = carrito.find(p => p.id === id);
    if (pato) pato.cantidad += 1;
    guardarCarrito();
    renderCarrito();
};

// Decrementar cantidad
export const decrementarCantidad = (id) => {
    const pato = carrito.find(p => p.id === id);
    if (!pato) return;
    if (pato.cantidad === 1) {
        eliminarDelCarrito(id);
    } else {
        pato.cantidad -= 1;
        guardarCarrito();
        renderCarrito();
    }
};

// Eliminar del carrito
export const eliminarDelCarrito = (id) => {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    actualizarContador();
    renderCarrito();
};

// Mostrar recibo
export const mostrarRecibo = () => {
    const recibo = document.querySelector('#recibo');
    const btnConfirmar = document.querySelector('#btn-confirmar');
    if (!recibo) return;

    const totalCalculado = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    recibo.innerHTML = `
    <h2>Resumen de tu pedido</h2>
    <ul>
      ${carrito.map(p => `
        <li>
          <span>${p.nombre}</span>
          <span>${p.cantidad} x ${Number(p.precio).toFixed(2)}€</span>
          <span>${(p.precio * p.cantidad).toFixed(2)}€</span>
        </li>
      `).join('')}
    </ul>
    <p><strong>Total: ${totalCalculado.toFixed(2)}€</strong></p>
  `;

    recibo.style.display = 'block';
    if (btnConfirmar) btnConfirmar.style.display = 'block';
};

// Confirmar pago
export const confirmarPago = () => {
    carrito = [];
    guardarCarrito();
    actualizarContador();
    const recibo = document.querySelector('#recibo');
    const btnConfirmar = document.querySelector('#btn-confirmar');
    const mensajePago = document.querySelector('#mensaje-pago');
    const contenedor = document.querySelector('#carrito-items');

    if (recibo) recibo.style.display = 'none';
    if (btnConfirmar) btnConfirmar.style.display = 'none';
    if (mensajePago) mensajePago.style.display = 'block';
    if (contenedor) contenedor.innerHTML = '';
};

// Eventos botones de pago
document.querySelector('#btn-pago')?.addEventListener('click', mostrarRecibo);
document.querySelector('#btn-confirmar')?.addEventListener('click', confirmarPago);

// Evento al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    renderCarrito();
});