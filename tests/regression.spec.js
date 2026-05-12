import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { PLP } from '../pages/plp.js';
import { Cart } from '../pages/cart.js';
import { PDP } from '../pages/pdp.js';
import { Login } from '../pages/login.js';

let hp;
let plp;
let c;
let pdp;
let lp;

test.beforeEach(async ({ page }) => {
    hp = new HomePage(page);
    plp = new PLP(page);
    c = new Cart(page);
    pdp = new PDP(page);
    lp = new Login(page);
    await hp.goto();
    await hp.cookieAccept;
});
test.describe('ALL', () => {
    test('Login1 Verify navigation to login page via account link', async ({ page }) => {
        await lp.loginNavigation();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/account/login");
    });

    test('Login2 Verify user can register and login', async ({ page }) => {
        const lp = new Login(page);
        await lp.registerUser();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/account");
        await lp.logout();
        await lp.login();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/account");
    });
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
    test('PLP1 Verify user naviagtes to PLP applies filters and verify relevant products are disaplyed', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('New Launches');
        await expect(page).toHaveURL('https://lovebeautyandplanet.in/collections/new-launches');
        await plp.applyFiltersAndValidateProducts();
    });

    test('PLP2 Verify Remove All Filters functionality', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('New Launches');
        await plp.removeAppliedFilters();
    });

    test('PLP3 Verify product page navigation from collection page', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('New Launches');
        await plp.PLPtoPDPnavigation();
    });

    test('PLP4 Verify add to cart functionality from collection page', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('New Launches');
        await plp.addToCartFRomPLP();

    });

    test('PLP5 Verify You may also like section presence and navigation', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('Bestsellers');
        await expect(plp.ymalSection).toBeVisible();
        await plp.openYmalViewAll();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/collections/all-products");
    }
    );

    test('PLP6 Verify Beauty Archives View All redirection', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('Value Combos');
        await plp.openBeautyEditsViewAll();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/blogs/hair");
    });

    test('PLP7 Verify FAQs section', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('Value Combos');
        await expect(plp.faqsection).toBeVisible();
    });

    test('PLP8 Verify Write to Us redirection', async ({ page }) => {
        await hp.PLPRedirectionFromMegaMenu('View All Products');
        await plp.openWriteToUs();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/contact-us");
    });
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
