import { test, expect } from '../../fixtures/fixtures';
import { RUTA_SESION } from '../../config/entornos';
import { mensajes } from '../../datos/mensajes';

test.use({ storageState: RUTA_SESION });

test.describe('Checkout', () => {

  test.beforeEach(async ({ page, paginaInventario, paginaCarrito }) => {
    await paginaInventario.visitar();
    await paginaInventario.agregarProductosAlCarrito(1);
    await paginaInventario.irAlCarrito();
    await paginaCarrito.irACheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('checkout con datos vacíos muestra error de validación', async ({ page, paginaDatosCheckout }) => {
    await paginaDatosCheckout.botonContinuar.click();

    await expect(paginaDatosCheckout.mensajeError).toContainText(mensajes.nombreRequerido);
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('cancelar en checkout regresa al carrito sin perder los productos', async ({ page, paginaDatosCheckout, paginaCarrito }) => {
    await paginaDatosCheckout.botonCancelar.click();

    await expect(page).toHaveURL(/cart\.html/);
    await expect(paginaCarrito.items).toHaveCount(1);
  });

});
