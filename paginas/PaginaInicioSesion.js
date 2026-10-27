import { entornos } from '../config/entornos';

export class PaginaInicioSesion {
  constructor(page) {
    this.page = page;
    this.sitio = `${entornos.urlUi}/`;
    this.campoUsuario = page.locator('#user-name');
    this.campoContrasena = page.locator('#password');
    this.botonIngresar = page.locator('#login-button');
    this.mensajeError = page.locator('[data-test="error"]');
  }

  async visitar() {
    await this.page.goto('/');
  }

  async iniciarSesion(usuario, contrasena) {
    await this.campoUsuario.fill(usuario);
    await this.campoContrasena.fill(contrasena);
    await this.botonIngresar.click();
  }

  // Recibe un objeto de datos/usuarios.js
  async iniciarSesionComo({ usuario, contrasena }) {
    await this.iniciarSesion(usuario, contrasena);
  }
}
