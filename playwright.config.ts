import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000, // Даємо більше часу (1 хв), бо ми сповільнюємо тест
  use: {
    baseURL: 'http://localhost:3000',
    headless: false, // Показувати браузер
    viewport: { width: 1280, height: 720 }, // Розмір вікна як у ноутбука
    video: 'on', // ЗАПИСУВАТИ ВІДЕО (збережеться в папці test-results)
    launchOptions: {
      slowMo: 1000, // Пауза 1 сек між діями Playwright (глобальна)
    },
  },
  webServer: {
    command: 'npx ts-node src/app.ts',
    port: 3000,
    reuseExistingServer: true,
  },
});