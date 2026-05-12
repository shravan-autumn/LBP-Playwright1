import { test, expect } from '@playwright/test';
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
test.describe('Homepage', () => {
  test('HP1 Verify logo is displayed', async ({ page }) => {
    await expect(hp.logo).toBeVisible();
  });

  test('HP2 Verify announcement bar navigation', async ({ page }) => {
    await hp.clickAnnouncementBar();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/collections/bundle-offers");
  });

  test('HP3 Verify megamenu collection navigation', async ({ page }) => {
    await hp.megamenuCollectionNavigation(page);
  });

  test('HP4 Verify About Us navigation', async ({ page }) => {
    await hp.openAboutUs();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/our-story");
  });

  test('HP5 Verify Know Your Ingredients navigation', async ({ page }) => {
    await hp.openIngredients();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/ingredients");
  });

  test('HP6 Verify Beauty Archives navigation', async ({ page }) => {
    await hp.openBeautyArchives();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/blogs");
  });

  test('HP7 Verify Contact Us navigation', async ({ page }) => {
    await hp.openContactUs();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/contact-us");
  });
  test("HP8 Verify search icon form header", async ({ page }) => {
    await hp.clickSearchTextfield();
    expect(hp.searchSuggestionBox).toBeVisible();
  });
  test("HP9 Verify account page navigation form header", async ({ page }) => {
    await hp.clickAccountLink();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/account/login");
  });
  test("HP10 Verify cart icon in header", async ({ page }) => {
    await hp.clickCartLink();
    await expect(c.emptyCartMessage).toBeVisible();
  });

  test('HP11 Verify hero banner redirection', async ({ page }) => {
    await hp.clickHeroBanner();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/collections/bounce-back-reset-mist");
  });

  test('HP12 Verify collection tabs navigation', async ({ page }) => {
    await hp.collectionTabsNavigation(page);
  });

  test('HP13 Verify product navigation from collection tab', async ({ page }) => {
    await hp.switchToCollectionTabByIndex(1);
    await hp.openFirstProductFromCollectionTab();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/products/love-beauty-planet-argan-oil-and-lavender-sulfate-free-smooth-and-serene-shampoo-600ml");
  });

  test('HP14 Verify add to cart functionality from collection tab', async ({ page }) => {
    await hp.addFirstProductToCartFromCollectionTab(page);
  });

  test('HP15 Verify Shop by Concern section', async ({ page }) => {
    await hp.shopByConcernSectionRedirections(page);
  });

  test('HP16 Verify Discover Beauty Bill navigation', async ({ page }) => {
    await hp.clickDiscoverBeautyBill();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/beauty-bill");
  });

  test('HP17 Verify In the Spotlight section and add to cart functionality', async ({ page }) => {
    await hp.inTheSpotLightSection();
  });

  test('HP18 Verify What Sets Us Apart section', async ({ page }) => {
    await expect(hp.whatSetsUsApartSection).toBeVisible();
  });

  test('HP19 Verify What Sets Us Apart section dropdown contents visibility', async ({ page }) => {
    await hp.whatSetsUsApartDropdown();
  });

  test('HP20 Verify trending on social Reels section visibility', async ({ page }) => {
    await expect(hp.trendingOnSocialSection).toBeVisible();
  });

  test('HP21 Verify Customer Love section display', async ({ page }) => {
    await expect(hp.customerLoveSection).toBeVisible();
  });

  test('HP22 Verify Discover Our Story navigation', async ({ page }) => {
    await hp.openDiscoverOurStory();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/our-story");
  });

  test('HP23 Verify Know Your Ingredients navigation', async ({ page }) => {
    await hp.openKnowYourIngredientsBanner();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/ingredients");
  });

  test('HP24 Verify Beauty Archives view all navigation', async ({ page }) => {
    await hp.openBeautyArchivesViewAll();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/blogs");
  });

  test('HP24 Verify Beauty Archives article navigation', async ({ page }) => {
    await hp.openFirstBeautyArchivesArticle();
    await expect(page).toHaveURL("https://lovebeautyandplanet.in/blogs/hair/post-festive-season-hair-care-tips");
  });

  test('HP25 Verify footer product links', async ({ page }) => {
    await hp.footerProductLinksRedirections(page);
  });

  test('HP26 Verify footer concern links', async ({ page }) => {
    await hp.footerConcernLinksRedirections(page);
  });

  test('HP27 Verify footer quick links', async ({ page }) => {
    await hp.footerQuickLinksRedirections(page);
  });

  test('HP28 Verify footer legal links', async ({ page, context }) => {
    await hp.footerLegalLinksRedirections(page, context);
  });

  test('HP29 Verify footer facebook links', async ({ page, context }) => {
    await hp.facebookRedirection(page, context);

  });

  test('HP30 Verify footer instagram links', async ({ page, context }) => {
    await hp.instagramRedirection(page, context);
  });
  test('HP31 Verify footer youtube links', async ({ page, context }) => {
    await hp.youtubeRedirection(page, context);
  });

  test('HP32 Verify caution notice display', async ({ page }) => {
    await expect(hp.cautionNotice).toBeVisible();
  });
});

