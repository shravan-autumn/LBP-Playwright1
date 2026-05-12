//POM test
import { test, expect } from '@playwright/test';
//import the class
import { HomePage } from '../pages/homepage.js';
import { PLP } from '../pages/plp.js';
import { Cart } from '../pages/cart.js';
import { PDP } from '../pages/pdp.js';

let hp;
let plp;
let c;
let pdp;

test.beforeEach(async ({ page }) => {
  hp = new HomePage(page);
  plp = new PLP(page);
  c = new Cart(page);
  pdp = new PDP(page);
  await hp.goto();
  await hp.cookieAccept;
});

test.describe('Cart', () => {
  test('Cart1 Verify empty cart visibility', async ({ page }) => {
    await c.emptycartVisibility();
  });

  test('Cart2 Verify continue shopping functionality in empty cart', async ({ page }) => {
    await c.continueShopping();

  });

  test('Cart3 Verify adding multiple products to cart', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await c.addFirstProductToCart();
    await pdp.searchPLPToPDPNavigation("Best");
    await c.addSecondProductToCart();
  });

  test('Cart4 Verify total price calculation', async ({ page }) => {

    await pdp.searchPLPToPDPNavigation("oil");
    var productPrice = parseInt(
      (await pdp.productPrice.first().textContent()).trim()
    );
    await pdp.addToCart();
    await c.closecart();
    // Second product
    await pdp.searchPLPToPDPNavigation("Best");
    var productPrice1 = parseInt(
      (await pdp.productPrice.first().textContent()).trim()
    );
    await pdp.addToCart();
    var expectedPrice = productPrice1 + productPrice;
    await c.cartTotalPrice.waitFor();
    const totalPrice = parseInt(
      (await c.cartTotalPrice.textContent()).replace(/[^\d]/g, '')
    );
    expect(totalPrice).toBe(expectedPrice);
  });

  test('Cart5 Verify freebie product addition', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("Best");
    var productTitle = await pdp.addToCart();
    await expect(c.freebie).toBeVisible();
  });

  test('Cart6 Verify the cart quantity increase/decrease functionality', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await c.addFirstProductToCart();
    await c.cartQunatitySelectorFunctionality(page);
  });

  test('Cart7 Verify checkout navigation', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("Best");
    var productTitle = await pdp.addToCart();
    await c.checkoutValidation();
  });
});

