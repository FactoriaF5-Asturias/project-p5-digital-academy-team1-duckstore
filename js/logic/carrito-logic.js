// Añadir patito al carrito
export const añadir = (carrito, pato) => {
    const existe = carrito.find(p => p.id === pato.id);
    if (existe) return carrito;
    return [...carrito, { ...pato, cantidad: 1 }];
};

// Eliminar patito del carrito
export const eliminar = (carrito, id) => {
    return carrito.filter(p => p.id !== id);
};

// Incrementar cantidad
export const incrementar = (carrito, id) => {
    return carrito.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p);
};

// Decrementar cantidad
export const decrementar = (carrito, id) => {
    return carrito.map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0);
};

// Calcular total
export const calcularTotal = (carrito) => {
    return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
};