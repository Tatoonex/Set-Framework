import { test, expect } from '../../fixtures/fixtures';
import { usuarios } from '../../datos/usuarios';
import { RUTA_SESION } from '../../config/entornos';

test.describe('Exploratorios', () => {

  test('problem_user puede iniciar sesión y ver el catálogo', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.conProblemas);

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('error_user puede agregar y quitar un producto del carrito', async ({ page, paginaInicioSesion, paginaInventario, paginaCarrito }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.conErrores);
    await expect(page).toHaveURL(/inventory\.html/);

    await paginaInventario.agregarProducto(0);
    await paginaInventario.irAlCarrito();
    await expect(paginaCarrito.items).toHaveCount(1);

    await paginaCarrito.quitarProducto(0);
    await expect(paginaCarrito.items).toHaveCount(0);
  });

  test('visual_user puede iniciar sesión sin errores funcionales', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.visual);

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('intento de inyección en el login no autentica', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.inyeccion);

    await expect(page).toHaveURL(paginaInicioSesion.sitio);
    await expect(paginaInicioSesion.mensajeError).toBeVisible();
  });

  test.describe('con sesión iniciada', () => {
    test.use({ storageState: RUTA_SESION });

    test('doble click en agregar al carrito agrega y quita el producto', async ({ paginaInventario }) => {
      await paginaInventario.visitar();
      await paginaInventario.productos.nth(0).locator('button').dblclick();

      await expect(paginaInventario.badgeCarrito).toHaveCount(0);
      await expect(paginaInventario.productos.nth(0).locator('button')).toHaveText('Add to cart');
    });
  });

});
