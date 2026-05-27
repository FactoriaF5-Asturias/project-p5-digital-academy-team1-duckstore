import { test, expect } from '@playwright/test';

test('la home carga y muestra 3 patitos destacados', async ({ page }) => {
    await page.goto('/index.html');
    const patitos = await page.locator('.product-card').count();
    expect(patitos).toBe(3);
});

test.only('añadir un patito al carrito actualiza el contador', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.product-card__btn').first().click();
    await page.waitForURL('**/detalle.html**');
    await page.locator('#btn-añadir').click();
    const contador = await page.locator('#contador-carrito').textContent();
    expect(contador).toBe('1');
});