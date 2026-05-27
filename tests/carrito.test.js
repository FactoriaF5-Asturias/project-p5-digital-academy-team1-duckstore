import { describe, it, expect } from 'vitest';
import { añadir, eliminar } from '../js/logic/carrito-logic.js';

describe('Carrito de compras', () => {

    it('deberia añadir un patito al carrito', () => {
        const carrito = [];
        const pato = { id: 1, nombre: 'Pato Clasico', precio: 12.50 };
        const resultado = añadir(carrito, pato);
        expect(resultado.length).toBe(1);
    });

    it('no deberia añadir el mismo patito dos veces', () => {
        const carrito = [];
        const pato = { id: 1, nombre: 'Pato Clasico', precio: 12.50 };
        const resultado = añadir(añadir(carrito, pato), pato);
        expect(resultado.length).toBe(1);
    });

    it('deberia eliminar un patito del carrito', () => {
        const carrito = [];
        const pato = { id: 1, nombre: 'Pato Clasico', precio: 12.50 };
        const conPato = añadir(carrito, pato);
        const resultado = eliminar(conPato, 1);
        expect(resultado.length).toBe(0);
    });

});