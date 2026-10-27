import { test, expect } from '../../fixtures/fixtures';
import { usuarios } from '../../datos/usuarios';
import { mensajes } from '../../datos/mensajes';

test.describe('Inicio de sesión - saucedemo.com', () => {

  test('inicio de sesión true - credenciales válidas', { tag: '@smoke' }, async ({ page, paginaInicioSesion, paginaInventario }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.estandar);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(paginaInventario.titulo).toHaveText(mensajes.tituloInventario);
  });

  test('inicio de sesión false - credenciales inválidas', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.invalido);

    await expect(page).toHaveURL(paginaInicioSesion.sitio);
    await expect(paginaInicioSesion.mensajeError).toBeVisible();
    await expect(paginaInicioSesion.mensajeError).toContainText(mensajes.credencialesInvalidas);
  });

  test('inicio de sesión - usuario bloqueado', async ({ page, paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.iniciarSesionComo(usuarios.bloqueado);

    await expect(page).toHaveURL(paginaInicioSesion.sitio);
    await expect(paginaInicioSesion.mensajeError).toContainText(mensajes.usuarioBloqueado);
  });

  test('inicio de sesión - campos vacíos', async ({ paginaInicioSesion }) => {
    await paginaInicioSesion.visitar();
    await paginaInicioSesion.botonIngresar.click();

    await expect(paginaInicioSesion.mensajeError).toContainText(mensajes.usuarioRequerido);
  });

});
