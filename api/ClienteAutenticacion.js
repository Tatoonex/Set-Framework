export class ClienteAutenticacion {
  constructor(request) {
    this.request = request;
  }

  async iniciarSesion(usuario, contrasena) {
    return this.request.post(`/auth`, {
      data: { username: usuario, password: contrasena },
    });
  }
}
