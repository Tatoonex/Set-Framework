# Framework de pruebas con Playwright (en español)

Mini framework de pruebas automatizadas de **UI** ([saucedemo.com](https://www.saucedemo.com)) y **API** ([Restful Booker](https://restful-booker.herokuapp.com)) con Playwright.

## Estructura

```
├── config/
│   └── entornos.js        URLs por entorno y ruta de la sesión guardada
├── datos/
│   ├── usuarios.js        Usuarios de UI y API
│   └── mensajes.js        Textos esperados en las validaciones
├── utilidades/
│   └── generadores.js     Datos aleatorios (checkout, reservas, fechas)
├── fixtures/
│   └── fixtures.js        Inyecta Page Objects y clientes API en las pruebas
├── paginas/               Page Objects (patrón POM)
├── api/                   Clientes de la API
├── tests/
│   ├── setup/             Inicia sesión una vez y guarda la sesión
│   ├── ui/                Pruebas de interfaz
│   └── api/               Pruebas de API
└── playwright.config.js
```

## Cómo escribir una prueba

Importa `test` desde los fixtures y pide las páginas que necesites:

```js
import { test, expect } from '../../fixtures/fixtures';
import { RUTA_SESION } from '../../config/entornos';

test.use({ storageState: RUTA_SESION }); // empieza con la sesión ya iniciada

test('mi prueba', { tag: '@smoke' }, async ({ paginaInventario, paginaCarrito }) => {
  await paginaInventario.visitar();
  await paginaInventario.agregarProducto(0);
  await paginaInventario.irAlCarrito();
  await expect(paginaCarrito.items).toHaveCount(1);
});
```

Para agregar una página nueva: crea la clase en `paginas/` y regístrala en `fixtures/fixtures.js`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm test` | Todas las pruebas (UI en 3 navegadores + API) |
| `npm run test:smoke` | Solo las pruebas etiquetadas `@smoke` |
| `npm run test:regresion` | Todo excepto `@smoke` |
| `npm run test:ui` | Solo UI |
| `npm run test:chromium` | Solo UI en Chromium |
| `npm run test:api` | Solo API |
| `npm run reporte` | Abre el último reporte HTML |
| `npm run panel` | Panel local en http://localhost:3456 |

## Entornos

Las URLs y credenciales se pueden cambiar con variables de entorno sin tocar el código:

| Variable | Valor por defecto |
|---|---|
| `URL_UI` | `https://www.saucedemo.com` |
| `URL_API` | `https://restful-booker.herokuapp.com` |
| `CONTRASENA_SAUCEDEMO` | `secret_sauce` |
| `USUARIO_API` / `CONTRASENA_API` | `admin` / `password123` |

En GitHub Actions se configuran como *Secrets* del repositorio.

## Integración continua

El workflow `.github/workflows/playwright.yml` corre todas las pruebas en cada push o PR a `main`. Desde la pestaña **Actions → Pruebas de Playwright → Run workflow** se puede ejecutar a mano eligiendo `smoke`, `regresion` o `api`.
