import { describe, it, expect } from 'vitest';
import { añadir, eliminar, incrementar, decrementar } from '../js/logic/carrito-logic.js';

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

    it('deberia incrementar la cantidad de un patito', () => {
        const carrito = [];
        const pato = { id: 1, nombre: 'Pato Clasico', precio: 12.50 };
        const conPato = añadir(carrito, pato);
        const resultado = incrementar(conPato, 1);
        expect(resultado[0].cantidad).toBe(2);
    });

    it('deberia decrementar la cantidad de un patito', () => {
        const carrito = [];
        const pato = { id: 1, nombre: 'Pato Clasico', precio: 12.50 };
        const conPato = añadir(carrito, pato);
        const conDos = incrementar(conPato, 1);
        const resultado = decrementar(conDos, 1);
        expect(resultado[0].cantidad).toBe(1);
    });

});