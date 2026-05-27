import { test, expect } from '@playwright/test';

test('la home carga y muestra 3 patitos destacados', async ({ page }) => {
    await page.goto('/index.html');
    const patitos = await page.locator('.product-card').count();
    expect(patitos).toBe(3);
});