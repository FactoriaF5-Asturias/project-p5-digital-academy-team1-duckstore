// Añadir patito al carrito
export const añadir = (carrito, pato) => {
    const existe = carrito.find(p => p.id === pato.id);
    if (existe) return carrito;
    return [...carrito, { ...pato, cantidad: 1 }];
};