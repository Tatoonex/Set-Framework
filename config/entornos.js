// URLs por entorno. Se pueden sobrescribir con variables de entorno:
//   URL_UI=https://staging.mi-sitio.com URL_API=https://api.staging.com npx playwright test
export const entornos = {
  urlUi: process.env.URL_UI || 'https://www.saucedemo.com',
  urlApi: process.env.URL_API || 'https://restful-booker.herokuapp.com',
};

// Archivo donde el proyecto "setup" guarda la sesión iniciada
export const RUTA_SESION = 'playwright/.auth/usuario-estandar.json';
