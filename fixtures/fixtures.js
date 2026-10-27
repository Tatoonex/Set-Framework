import { test as base, expect } from '@playwright/test';
import { PaginaInicioSesion } from '../paginas/PaginaInicioSesion';
import { PaginaInventario } from '../paginas/PaginaInventario';
import { PaginaCarrito } from '../paginas/PaginaCarrito';
import { PaginaDetalleProducto } from '../paginas/PaginaDetalleProducto';
import { PaginaDatosCheckout } from '../paginas/PaginaDatosCheckout';
import { PaginaResumenCheckout } from '../paginas/PaginaResumenCheckout';
import { PaginaConfirmacionCompra } from '../paginas/PaginaConfirmacionCompra';
import { PaginaMenuLateral } from '../paginas/PaginaMenuLateral';
import { ClienteAutenticacion } from '../api/ClienteAutenticacion';
import { ClienteReservas } from '../api/ClienteReservas';

// Cada prueba recibe las páginas y clientes que pida, ya creados.
export const test = base.extend({
  paginaInicioSesion: async ({ page }, use) => use(new PaginaInicioSesion(page)),
  paginaInventario: async ({ page }, use) => use(new PaginaInventario(page)),
  paginaCarrito: async ({ page }, use) => use(new PaginaCarrito(page)),
  paginaDetalleProducto: async ({ page }, use) => use(new PaginaDetalleProducto(page)),
  paginaDatosCheckout: async ({ page }, use) => use(new PaginaDatosCheckout(page)),
  paginaResumenCheckout: async ({ page }, use) => use(new PaginaResumenCheckout(page)),
  paginaConfirmacionCompra: async ({ page }, use) => use(new PaginaConfirmacionCompra(page)),
  paginaMenuLateral: async ({ page }, use) => use(new PaginaMenuLateral(page)),

  clienteAutenticacion: async ({ request }, use) => use(new ClienteAutenticacion(request)),
  clienteReservas: async ({ request }, use) => use(new ClienteReservas(request)),
});

export { expect };
