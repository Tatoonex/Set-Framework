export class ClienteReservas {
  constructor(request) {
    this.request = request;
  }

  async crear(datos) {
    return this.request.post(`/booking`, { data: datos });
  }

  async obtener(id) {
    return this.request.get(`/booking/${id}`);
  }

  async listar(filtros = {}) {
    return this.request.get(`/booking`, { params: filtros });
  }

  async actualizar(id, datos, token) {
    return this.request.put(`/booking/${id}`, {
      data: datos,
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });
  }

  async actualizarParcial(id, cambios, token) {
    return this.request.patch(`/booking/${id}`, {
      data: cambios,
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });
  }

  async eliminar(id, token) {
    return this.request.delete(`/booking/${id}`, {
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });
  }
}
