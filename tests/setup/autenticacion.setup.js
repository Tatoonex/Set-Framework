import { test as setup, expect } from '../../fixtures/fixtures';
import { usuarios } from '../../datos/usuarios';
import { RUTA_SESION } from '../../config/entornos';

setup('iniciar sesión con usuario estándar', async ({ page, paginaInicioSesion }) => {
  await paginaInicioSesion.visitar();
  await paginaInicioSesion.iniciarSesionComo(usuarios.estandar);
  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: RUTA_SESION });
});
