import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { Login } from '../pages/login.js';

let hp;


test.beforeEach(async ({ page }) => {
  hp = new HomePage(page);
  lp = new Login(page);
  await hp.goto();
  await hp.cookieAccept;
});
test.describe('Login / Account', () => {
  test('Login1 Verify navigation to login page via account link', async ({ page }) => {
    await lp.loginNavigation();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/account/login");
  });

  test('Verify user can register and login', async ({ page }) => {
    const lp = new Login(page);
    await lp.registerUser();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/account");
    await lp.logout();
    await lp.login();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/account");
  });
});

