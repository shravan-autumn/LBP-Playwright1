// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 70000,
  expect: {
    timeout: 70000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
 // workers: process.env.CI ? 1 : undefined,
  workers: 1,
  reporter:[ ['html'], ['list']],
  use: {
    launchOptions: {
      slowMo: 1000,
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled'
      ]
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    channel: 'chrome',
    browserName: 'chromium',
    headless: false,
    viewport: null,
   //viewport: { width: 1440, height: 900 },
    trace: 'on-first-retry',
  },

  // projects: [
  //   {
  //     name: 'Desktop Chrome',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //     },
  //   },
  //   {
  //     name: 'iPhone 13',   // 📱 mobile emulation
  //     use: {
  //       ...devices['iPhone 13'],
  //     },
  //   },
  //   {
  //     name: 'Pixel 5',     // 📱 Android emulation
  //     use: {
  //       ...devices['Pixel 5'],
  //     },
  //   },
  // ],
});
