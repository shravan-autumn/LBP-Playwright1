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
test.describe('PDP', () => {
  test('PDP1 Verify navigation from Search PLP to PDP', async ({ page }) => {
    const firstProductName = await pdp.searchPLPToPDPNavigation("hair");
    // Get PDP product title
    const productTitle = await pdp.productTitle.textContent();
    // Validate same product is disaplyed on PDP
    expect(productTitle.trim().toLowerCase())
      .toContain(firstProductName.trim().toLowerCase());
  });

  test('PDP2 Verify PDP to PLP navigation links', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("hair");
    await pdp.PDPtoPLPnavigation(page);
  });

  test('PDP3 Verify invalid pincode validation', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await pdp.checkInvalidPincode('123456');
  });

  test('PDP4 Verify valid pincode check', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await pdp.checkValidPincode('574151');
  });

  test('PDP5 Verify add to cart from PDP', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await pdp.addToCartFromPDP();
  });

  test('PDP6 Verify quantity increase', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await pdp.increaseQuantity();
  });

  test('PDP7 Verify quantity decrease', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("oil");
    await pdp.decreaseQuantity();
  });

  test('PDP8 Verify reviews section display', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("best");
    await expect(pdp.reviewsSection).toBeVisible();
  });

  test('PDP9 Verify details section display', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("best");
    await expect(pdp.detailsSection).toBeVisible();
  });

  test('PDP10 Verify FAQ section display', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("best");
    await expect(pdp.faqSection).toBeVisible();
  });
  test('PDP11 Verify Write to us link presence and navigation', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("best");
    await pdp.writeToUsNavigation();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/contact-us");
  });

  test('PDP12 Verify reels section visibility', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("best");
    await expect(pdp.reelsSection).toBeVisible();
  });
  test('PDP13 Verify You may also like section presence and navigation', async ({ page }) => {
    await pdp.searchPLPToPDPNavigation("coconut");
    await pdp.youmayalsolikeNavigation();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/collections/coconut");
  }
  )
});

