import { test, expect } from '../../fixtures/fixtures';
import { usuarios } from '../../datos/usuarios';
import { RUTA_SESION } from '../../config/entornos';

test.describe('No funcionales', () => {

  test('rendimiento - performance_glitch_user tarda notablemente más que standard_user', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    const inicioEstandar = Date.now();
    await paginaInicioSesion.iniciarSesionComo(usuarios.estandar);
    await expect(page).toHaveURL(/inventory\.html/);
    const duracionEstandar = Date.now() - inicioEstandar;

    await page.context().clearCookies();
    await paginaInicioSesion.visitar();
    const inicioGlitch = Date.now();
    await paginaInicioSesion.iniciarSesionComo(usuarios.lento);
    await expect(page).toHaveURL(/inventory\.html/);
    const duracionGlitch = Date.now() - inicioGlitch;

    expect(duracionGlitch).toBeGreaterThan(duracionEstandar * 2);
  });

  test('seguridad - el sitio se sirve sobre HTTPS', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();

    expect(page.url()).toMatch(/^https:\/\//);
  });

  test('seguridad - el campo de contraseña oculta el valor', async ({ paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();

    await expect(paginaInicioSesion.campoContrasena).toHaveAttribute('type', 'password');
  });

  test.describe('con sesión iniciada', () => {
    test.use({ storageState: RUTA_SESION });

    test('accesibilidad - las imágenes de producto tienen texto alternativo', async ({ page, paginaInventario }) => {
      await paginaInventario.visitar();

      const imagenes = page.locator('.inventory_item_img img');
      const cantidad = await imagenes.count();
      for (let i = 0; i < cantidad; i++) {
        await expect(imagenes.nth(i)).toHaveAttribute('alt', /.+/);
      }
    });
  });

  test.describe('responsividad', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('el flujo de login es usable en un viewport móvil', async ({ page, paginaInicioSesion }) => {
      await paginaInicioSesion.visitar();
      await paginaInicioSesion.iniciarSesionComo(usuarios.estandar);

      await expect(page).toHaveURL(/inventory\.html/);
    });
  });

});
