import { test, expect } from '@playwright/test';

test.describe('Pruebas E2E de la página de Contacto', () => {

  test('Debería rellenar y enviar el formulario con éxito', async ({ page }) => {
   await page.goto('http://127.0.0.1:5500/pages/contacto.html');

    await page.locator('#nombre').fill('Luisa Cortes');
    await page.locator('#email').fill('luisa@correo.com');
    await page.locator('#mensaje').fill('¡Hola! El formulario pasa el test de Playwright.');

    await page.locator('#btn-enviar').click();

    const valorNombre = await page.locator('#nombre').inputValue();
    expect(valorNombre).toBe('');
  });

});