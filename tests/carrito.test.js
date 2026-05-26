import { describe, it, expect } from 'vitest';
import { añadir } from '../js/logic/carrito-logic.js';

describe('Carrito de compras', () => {

    it('deberia añadir un patito al carrito', () => {
        const carrito = [];
        const pato = { id: 1, nombre: 'Pato Clasico', precio: 12.50 };
        const resultado = añadir(carrito, pato);
        expect(resultado.length).toBe(1);
    });

});