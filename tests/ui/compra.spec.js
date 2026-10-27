import fs from 'fs';
import { test, expect } from '../../fixtures/fixtures';
import { RUTA_SESION } from '../../config/entornos';
import { mensajes } from '../../datos/mensajes';
import { generarDatosCheckout } from '../../utilidades/generadores';

test.use({ storageState: RUTA_SESION });

test('compra happy path - tres productos', { tag: '@smoke' }, async ({
  page,
  paginaInventario,
  paginaCarrito,
  paginaDatosCheckout,
  paginaResumenCheckout,
  paginaConfirmacionCompra,
}) => {
  await paginaInventario.visitar();
  await paginaInventario.agregarProductosAlCarrito(3);
  await paginaInventario.irAlCarrito();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(paginaCarrito.items).toHaveCount(3);

  await paginaCarrito.irACheckout();
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  await paginaDatosCheckout.completarDatosCon(generarDatosCheckout());
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await paginaResumenCheckout.finalizarCompra();
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(paginaConfirmacionCompra.encabezado).toHaveText(mensajes.compraExitosa);

  const rutaPdf = await paginaConfirmacionCompra.descargarComprobantePdf(test.info().outputDir);
  expect(fs.existsSync(rutaPdf)).toBe(true);
});

test('bug - permite finalizar una compra sin productos en el carrito', async ({
  page,
  paginaInventario,
  paginaCarrito,
  paginaDatosCheckout,
  paginaResumenCheckout,
}) => {
  test.fail(true, 'El sitio deja completar el checkout con el carrito vacío (Item total $0) en vez de bloquearlo o mostrar un error');

  await paginaInventario.visitar();
  await paginaInventario.irAlCarrito();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(paginaCarrito.items).toHaveCount(0);

  await paginaCarrito.irACheckout();
  await paginaDatosCheckout.completarDatosCon(generarDatosCheckout());
  await paginaResumenCheckout.finalizarCompra();

  await expect(page).not.toHaveURL(/checkout-complete\.html/);
});
