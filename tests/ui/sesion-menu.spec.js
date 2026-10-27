import { test, expect } from '../../fixtures/fixtures';
import { RUTA_SESION } from '../../config/entornos';
import { mensajes } from '../../datos/mensajes';

test('acceso directo a inventory sin sesión redirige a login', async ({ page, paginaInicioSesion, paginaInventario }) => {
  await paginaInventario.visitar();

  await expect(page).toHaveURL(paginaInicioSesion.sitio);
  await expect(paginaInicioSesion.mensajeError).toContainText(mensajes.accesoSinSesion);
});

test.describe('Menú lateral', () => {

  test.use({ storageState: RUTA_SESION });
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ paginaInventario }) => {
    await paginaInventario.visitar();
  });

  test('logout vuelve a login y bloquea el acceso directo', async ({ page, paginaInicioSesion, paginaInventario, paginaMenuLateral }) => {
    await paginaMenuLateral.cerrarSesion();
    await expect(page).toHaveURL(paginaInicioSesion.sitio);

    await paginaInventario.visitar();
    await expect(page).toHaveURL(paginaInicioSesion.sitio);
  });

  test('reset app state vacía el carrito', async ({ paginaInventario, paginaMenuLateral }) => {
    await paginaInventario.agregarProductosAlCarrito(2);
    await expect(paginaInventario.badgeCarrito).toHaveText('2');

    await paginaMenuLateral.reiniciarEstado();
    await expect(paginaInventario.badgeCarrito).toHaveCount(0);
  });

  test('about navega al sitio externo de Sauce Labs', async ({ page, paginaMenuLateral }) => {
    await paginaMenuLateral.irAAcercaDe();
    await expect(page).toHaveURL(/saucelabs\.com/);
  });

  test('dynamic catalog no modifica el listado de productos', async ({ page, paginaInventario, paginaMenuLateral }) => {
    const nombresAntes = await paginaInventario.nombresProductos.allTextContents();
    await paginaMenuLateral.irACatalogoDinamico();
    await page.waitForTimeout(500);
    const nombresDespues = await paginaInventario.nombresProductos.allTextContents();

    expect(nombresDespues).toEqual(nombresAntes);
  });

});
