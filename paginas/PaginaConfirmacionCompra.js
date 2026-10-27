import path from 'path';

export class PaginaConfirmacionCompra {
  constructor(page) {
    this.page = page;
    this.encabezado = page.locator('.complete-header');
    this.mensaje = page.locator('.complete-text');
    this.botonGenerarPdf = page.locator('#generate-pdf-order');
  }

  async descargarComprobantePdf(directorioDestino) {
    const [descarga] = await Promise.all([
      this.page.waitForEvent('download'),
      this.botonGenerarPdf.click(),
    ]);
    const rutaArchivo = path.join(directorioDestino, descarga.suggestedFilename());
    await descarga.saveAs(rutaArchivo);
    return rutaArchivo;
  }
}
