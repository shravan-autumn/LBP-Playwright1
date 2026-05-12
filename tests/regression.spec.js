//POM test
import { test, expect } from '@playwright/test';
//import the class
import { HomePage } from '../pages/homepage.js';
import { Login } from '../pages/login.js';

let hp;
let lp;

test.beforeEach(async ({ page }) => {
    hp = new HomePage(page);
    lp = new Login(page);
    await hp.goto();
    await hp.cookieAccept;
});
test.describe('Regression', () => {
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
    test('HP1 Verify logo is displayed', async ({ page }) => {
        await expect(hp.logo).toBeVisible();
    });

    test('HP2 Verify announcement bar navigation', async ({ page }) => {
        await hp.clickAnnouncementBar();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/collections/bundle-offers");
    });

    test('HP3 Verify megamenu product navigation', async ({ page }) => {

        const expectedUrls = [
            'https://lovebeautyandplanet.in/collections/buy3-1399',
            'https://lovebeautyandplanet.in/collections/buy4-1799',
            'https://lovebeautyandplanet.in/collections/combos'
        ];

        // Get total dropdown options count
        const count = await hp.megaMenuOffersDropdown.count();

        for (let i = 0; i < count; i++) {
            // Hover on Offers menu
            await hp.megaMenuOffers.hover();
            // Wait for dropdown visibility
            await hp.megaMenuOffersDropdown.first().waitFor();
            // Click dropdown option
            await hp.megaMenuOffersDropdown.nth(i).click();
            // Verify URL
            await expect(page).toHaveURL(expectedUrls[i]);
            // Navigate back
            await page.goBack();
        }
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
        await hp.searchTexfield.click();
        expect(hp.searchSuggestionBox).toBeVisible();
    });
    test("HP9 Verify account page navigation form header", async ({ page }) => {
        await hp.accountLink.click();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/account/login");
    });
    test("HP10 Verify cart icon in header", async ({ page }) => {
        await hp.cartLink.click();
        await expect(c.emptyCartMessage).toBeVisible();
    });

    test('HP11 Verify hero banner redirection', async ({ page }) => {
        await hp.clickHeroBanner();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/collections/bounce-back-reset-mist");
    });

    test('HP12 Verify collection tabs navigation', async ({ page }) => {
        const expectedUrls = [
            'https://lovebeautyandplanet.in/collections/bestseller',
            'https://lovebeautyandplanet.in/collections/combos',
            'https://lovebeautyandplanet.in/collections/new-launches'
        ];
        for (let i = 0; i < await hp.collectionTabs.count(); i++) {
            await hp.collectionTabs.nth(i).click();
            await hp.viewAllLink.nth(i).waitFor();
            await hp.viewAllLink.nth(i).click();
            // Verify URL
            await expect(page).toHaveURL(expectedUrls[i]);
            // Navigate back
            await page.goBack();
        }
    });

    test('HP13 Verify product navigation from collection tab', async ({ page }) => {
        await hp.switchToCollectionTabByIndex(1);
        await hp.openFirstProductFromCollectionTab();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/products/love-beauty-planet-argan-oil-and-lavender-sulfate-free-smooth-and-serene-shampoo-600ml");
    });

    test('HP14 Verify add to cart functionality from collection tab', async ({ page }) => {
        const productName = (await hp.productTitle.first().innerText()).toLowerCase();
        await hp.addToCartButton.first().click();
        await hp.cartLink.click();
        await c.productTitle.first().waitFor();
        const cartProducts = await c.productTitle.allTextContents();
        const lowerCaseProducts = cartProducts.map(product =>
            product.toLowerCase()
        );
        expect(lowerCaseProducts).toContain(productName);
    });

    test('HP15 Verify Shop by Concern section', async ({ page }) => {
        const expectedUrls = [
            'https://lovebeautyandplanet.in/collections/argan-oil-lavender',
            'https://lovebeautyandplanet.in/collections/onion-blackseed-patchouli',
            'https://lovebeautyandplanet.in/collections/bond-repair',
            'https://lovebeautyandplanet.in/collections/curry-leaves-biotin-mandarin',
            'https://lovebeautyandplanet.in/collections/rice-water-angelica',
            'https://lovebeautyandplanet.in/collections/tea-tree-and-vetiver'

        ];
        for (let i = 0; i < await hp.shopByConcernLinks.count(); i++) {
            await hp.shopByConcernLinks.nth(i).click();
            await expect(page).toHaveURL(expectedUrls[i]);
            await page.goBack();
            await hp.shopByConcernLinks.nth(i).waitFor();
        }
    });

    test('HP16 Verify Discover Beauty Bill navigation', async ({ page }) => {
        await hp.clickDiscoverBeautyBill();
        await expect(page).toHaveURL("https://lovebeautyandplanet.in/pages/beauty-bill");
    });

    test('HP17 Verify In the Spotlight section and add to cart functionality', async ({ page }) => {
        // Capture spotlight product title
        const productName = (
            await hp.inTheSpotLightProductTitle.first().innerText()
        ).trim().toLowerCase();

        // Check whether Notify Me button is visible
        if (await hp.inTheSpotLightNotifyMeButton.first().isVisible()) {

            // Click Notify Me
            await hp.inTheSpotLightNotifyMeButton.first().click();

            // Verify Notify popup is displayed
            await expect(hp.inTheSpotLightNotifyPopup).toBeVisible();
        } else {

            // Click Add to Cart
            await hp.inTheSpotLightAddToCartButton.first().click();

            // Open cart drawer
            await hp.cartLink.click();

            // Wait for cart products
            await c.productTitle.first().waitFor();

            // Convert all cart products to lowercase
            const cartProducts = (await c.productTitle.allTextContents()).map(product =>
                product.trim().toLowerCase()
            );

            // Verify added product exists in cart
            expect(cartProducts).toContain(productName);
        }
    });

    test('HP18 Verify What Sets Us Apart section', async ({ page }) => {
        await expect(hp.whatSetsUsApartCard).toBeVisible();
    });

    test('HP19 Verify What Sets Us Apart section dropdown contents visibility', async ({ page }) => {
        for (let i = 0; i < await hp.whatSetsUsApartCard.count(); i++) {
            await hp.whatSetsUsApartCard.nth(i).click();
            await expect(hp.whatSetsUsApartContent.nth(i)).toBeVisible();
        }
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

    test('HP25 Verify newsletter subscription', async ({ page }) => {
        const email = `qa+${Date.now()}@example.com`;
        await hp.subscribeNewsletter(email);
        await hp.newsletterSuccess.waitFor();
        await expect(hp.newsletterSuccess).toBeVisible();
    });


    test('HP26 Verify footer product links', async ({ page }) => {
        const expectedUrls = [
            'https://lovebeautyandplanet.in/collections/shampoo',
            'https://lovebeautyandplanet.in/collections/conditioner',
            'https://lovebeautyandplanet.in/collections/hair-masks',
            'https://lovebeautyandplanet.in/collections/hair-serum',
            'https://lovebeautyandplanet.in/collections/hair-scalp-oil',
            'https://lovebeautyandplanet.in/collections/new-launches',
            'https://lovebeautyandplanet.in/collections/bestseller',
            'https://lovebeautyandplanet.in/collections/combos'

        ];
        for (let i = 0; i < await hp.footerProductLinks.count(); i++) {
            await hp.footerProductLinks.nth(i).click();
            await expect(page).toHaveURL(expectedUrls[i]);
            await page.goBack();
            await hp.footerProductLinks.nth(i).waitFor();
        }
    });

    test('HP27 Verify footer concern links', async ({ page }) => {
        const expectedUrls = [
            'https://lovebeautyandplanet.in/collections/frizz',
            'https://lovebeautyandplanet.in/collections/hairfall',
            'https://lovebeautyandplanet.in/collections/split-ends',
            'https://lovebeautyandplanet.in/collections/curl-care',
            'https://lovebeautyandplanet.in/collections/dandruff',
            'https://lovebeautyandplanet.in/collections/bond-repair',
            'https://lovebeautyandplanet.in/collections/hair-thinning',
            'https://lovebeautyandplanet.in/collections/scalp-health'

        ];
        for (let i = 0; i < await hp.footerConcernLinks.count(); i++) {
            await hp.footerConcernLinks.nth(i).click();
            await expect(page).toHaveURL(expectedUrls[i]);
            await page.goBack();
            await hp.footerConcernLinks.nth(i).waitFor();
        }
    });

    test('HP28 Verify footer quick links', async ({ page }) => {
        const expectedUrls = [
            'https://lovebeautyandplanet.in/pages/our-story',
            'https://lovebeautyandplanet.in/pages/faq',
            'https://lovebeautyandplanet.in/pages/blogs',
            'https://lovebeautyandplanet.in/pages/contact-us',
            'https://lovebeautyandplanet.in/pages/shipping-refund-policy',
            'https://lovebeautyandplanet.in/pages/refund-policy',
            'https://lovebeautyandplanet.in/pages/track-order'
        ];
        for (let i = 0; i < await hp.footerQuickLinks.count(); i++) {
            await hp.footerQuickLinks.nth(i).click();
            await expect(page).toHaveURL(expectedUrls[i]);
            await page.goBack();
            await hp.footerQuickLinks.nth(i).waitFor();
        }
    });

    test('HP29 Verify footer legal links', async ({ page, context }) => {

        const expectedUrls = [
            'https://lovebeautyandplanet.in/policies/privacy-policy',
            'https://www.unilevernotices.com/privacy-notices/india-english.html',
            'https://notices.unilever.com/general/en/accessibility/',
            'https://www.unilevernotices.com/cookie-notices/india-english.html',
            'https://lovebeautyandplanet.in/pages/terms-of-use',
            'https://lovebeautyandplanet.in/pages/site-map',
            'https://lovebeautyandplanet.in/pages/terms-conditions-1'
        ];

        for (let i = 0; i < await hp.footerLegalLinks.count(); i++) {

            const link = hp.footerLegalLinks.nth(i);

            let popup = null;

            // 👉 Listen for popup BUT don't block forever
            const popupPromise = context.waitForEvent('page', { timeout: 2000 })
                .catch(() => null);

            await link.click();

            popup = await popupPromise;

            // =========================
            // CASE 1: NEW TAB OPENED
            // =========================
            if (popup) {

                await popup.waitForLoadState('domcontentloaded');

                await expect(popup).toHaveURL(expectedUrls[i]);

                await popup.close();

                await page.bringToFront();

            }

            // =========================
            // CASE 2: SAME TAB NAVIGATION
            // =========================
            else {

                await page.waitForURL(expectedUrls[i], { timeout: 5000 });

                await expect(page).toHaveURL(expectedUrls[i]);

                await page.goBack();

                await page.waitForLoadState('domcontentloaded');
            }

            // Ensure footer is stable before next iteration
            await link.waitFor({ state: 'visible' });
        }
    });





    test('HP30 Verify footer facebook links', async ({ page, context }) => {

        // Wait for new tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            hp.clickFacebookLink()
        ]);

        // Wait until page is loaded
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://www.facebook.com/lovebeautyandplanetin');

    });

    test('HP31 Verify footer instagram links', async ({ page, context }) => {

        // Wait for new tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            hp.clickInstagramLink()
        ]);

        // Wait until page is loaded
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://www.instagram.com/lovebeautyandplanet_in/');

    });
    test('HP32 Verify footer youtube links', async ({ page, context }) => {

        // Wait for new tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            hp.clickYoutubeLink()
        ]);

        // Wait until page is loaded
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://www.youtube.com/channel/UCUFcrEf1Wb1164G6O2_LoyA');

    });

    test('HP33 Verify caution notice display', async ({ page }) => {
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

        // Get first product name from PLP
        const firstProductName = await plp.productTitles
            .first()
            .textContent();

        // Open first product
        await plp.openFirstProduct();

        // Get PDP product title
        const productTitle = await pdp.productTitle
            .textContent();

        // Validate same product opened
        expect(productTitle.trim().toLowerCase())
            .toContain(firstProductName.trim().toLowerCase());
    });

    test('PLP4 Verify add to cart functionality from collection page', async ({ page }) => {

        await hp.PLPRedirectionFromMegaMenu('New Launches');

        // Get first product name from PLP
        const productName = (
            await plp.productTitles.first().innerText()
        ).toLowerCase();

        // Add first product to cart
        await plp.firstAtcButton.click();

        // Open cart drawer
        await hp.cartLink.click();

        // Wait for cart product to appear
        await c.productTitle.first().waitFor();

        // Get all cart product titles
        const cartProducts =
            await c.productTitle.allTextContents();

        // Convert cart products to lowercase
        const lowerCaseProducts = cartProducts.map(product =>
            product.toLowerCase()
        );

        // Validate same product added to cart
        expect(lowerCaseProducts)
            .toContain(productName);
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
        const productTitle = await pdp.productTitle
            .textContent();
        // Validate same product is disaplyed on PDP
        expect(productTitle.trim().toLowerCase())
            .toContain(firstProductName.trim().toLowerCase());


    });

    test('PDP2 Verify PDP to PLP navigation links', async ({ page }) => {
        await pdp.searchPLPToPDPNavigation("hair");

        const expectedUrls = [
            'https://lovebeautyandplanet.in/collections/all-products',
            'https://lovebeautyandplanet.in/collections/bundle-offers',
            'https://lovebeautyandplanet.in/collections/bundle-offers'

        ];
        for (let i = 0; i < await pdp.viewproductsLink.count(); i++) {
            await pdp.viewproductsLink.nth(i).click();
            await expect(page).toHaveURL(expectedUrls[i]);
            await page.goBack();
            await pdp.viewproductsLink.nth(i).waitFor();

        }
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

        const productTitle = await pdp.addToCart();

        // Wait for cart product
        await c.productTitle.first().waitFor();

        // Get first cart product
        const cartTitle = await c.productTitle.first().textContent();

        // Take few words from PDP title
        const expectedText = productTitle
            .toLowerCase()
            .trim()
            .split(' ')
            .slice(0, 5)
            .join(' ');

        // Validate cart contains similar text
        expect(cartTitle.toLowerCase()).toContain(expectedText);

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
        var productTitle = await pdp.addToCart();
        // Wait for cart product
        await c.productTitle.first().waitFor();
        // Get first cart product
        var cartTitle = await c.productTitle.first().textContent();
        // Take few words from PDP title
        var expectedText = productTitle
            .toLowerCase()
            .trim()
            .split(' ')
            .slice(0, 5)
            .join(' ');
        // Validate cart contains similar text
        expect(cartTitle.toLowerCase()).toContain(expectedText);
        await c.closecart();
        await pdp.searchPLPToPDPNavigation("Best");
        var productTitle = await pdp.addToCart();
        // Wait for cart product
        await c.productTitle.first().waitFor();
        // Get first cart product
        var cartTitle = await c.productTitle.first().textContent();
        // Take few words from PDP title
        var expectedText = productTitle
            .toLowerCase()
            .trim()
            .split(' ')
            .slice(0, 5)
            .join(' ');
        // Validate cart contains similar text
        expect(cartTitle.toLowerCase()).toContain(expectedText);
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

        await pdp.addToCart(); // MISSING STEP

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

    test('Cart6 Verify checkout navigation', async ({ page }) => {
        await pdp.searchPLPToPDPNavigation("Best");
        var productTitle = await pdp.addToCart();
        await c.checkoutValidation();
    });
});
