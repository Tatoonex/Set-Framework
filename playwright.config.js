import { defineConfig, devices } from '@playwright/test';
import { entornos, RUTA_SESION } from './config/entornos';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 500,
    },
  },
  projects: [
    // Inicia sesión una vez y guarda la sesión en RUTA_SESION
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: /.*\.setup\.js/,
      use: { baseURL: entornos.urlUi },
    },
    {
      name: 'chromium',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], baseURL: entornos.urlUi },
    },
    {
      name: 'firefox',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: { ...devices['Desktop Firefox'], baseURL: entornos.urlUi },
    },
    {
      name: 'webkit',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: { ...devices['Desktop Safari'], baseURL: entornos.urlUi },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: entornos.urlApi },
    },
  ],
});
