import { test, expect } from '@playwright/test';

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;

    // Global / header
    this.pageUrlMarker = page.locator('[data-page-url-test-id]');
    this.pageTitleMarker = page.locator('[data-page-title-test-id]');
    //X cookie popup selectors need to be added I have hardcoded for now
    this.cookieAcceptPopup = page.locator("//button[@id='onetrust-accept-btn-handler']");
    //x change the logo selector I have hardcoded for now
    this.logo = page.locator('[class="header__heading-logo motion-reduce"]');
    //mega menu locators need to be added 
    this.megaMenuShop = page.locator('[data-megamenu-link-test-id="index-header-custom-menu-1-menu-link-1"]');
    this.megaMenuAllCollectionLinks = page.locator('//a[@class="menu-link mega-menu-link"]');
    this.megaMenuOffers = page.locator("(//a[contains(text(),'Offers')])[1]");
    this.megaMenuOffersDropdown = page.locator("//a[contains(text(),'Offers')]/following-sibling::ul//child::a[@class='menu-link mega-menu-link']");
    this.accountLink = page.locator('[data-account-link-test-id]');
    //x Seacrh link locator needs to be added i have hardcoced now
    this.searchTexfield = page.locator("//div[@class='header__icons header__icons--localization header-localization']//input");
    this.searchSuggestionBox = page.locator("//div[@class='wizzy-autocomplete-suggestions']");
    this.cartLink = page.locator('[data-cart-link-test-id]');
    this.announcementBarLink = page.locator('[data-announcement-bar-test-id]').first();

    // Primary nav (top-level)
    this.navAboutUs = page.locator('[data-nav-about-us-test-id]');
    this.navIngredients = page.locator('[data-nav-ingredients-test-id]');
    this.navBeautyArchives = page.locator('[data-nav-beauty-archives-test-id]');
    //x Support link locator needs to be added i have hardcoced now
    this.navSupport = page.locator('[data-nav-support-test-id]');
    this.navContactUs = page.locator("[data-megamenu-link-test-id='index-header-custom-menu-1-menu-link-7']");

    //x Hero banner link locator needs to be added i have hardcoded for now
    this.heroBannerLink = page.locator('[data-hero-banner-link-test-id]').first();
    this.heroBanner = page.locator("//section[@class='home-banner']");

    // Home collection tabs + product cards
    //x product card and ATC selectors need to be added I have hardcoded for now
    this.productTitle = page.locator("//section[@class='home-products']//p[@class='h-pro-card-cnt-description']");
    this.addToCartButton = page.locator("//div[@class='product-form__buttons']");
    this.viewAllLink = page.locator("[data-view-all-test-id]");
    this.collectionTabs = page.locator('[data-collection-tab-test-id]');
    this.productCards = page.locator('[data-product-card-test-id]');
    this.firstProductLink = page.locator('[data-product-link-test-id]').first();
    this.firstAtcButton = page.locator('[data-atc-btn-test-id]').first();
    this.atcToast = page.locator('[data-add-to-cart-toast-test-id]').first();
    this.viewCartDrawerButton = page.locator('[data-view-cart-drawer-test-id]').first();

    // Shop by concern
    this.shopByConcernLinks = page.locator('[data-shop-by-concern-link-test-id]');
    //x shop by concern link locators need to be added I have hardcoded for now
    this.shopByConcernLinks = page.locator("//div[@class='col-4 col-xl-2']//p");

    // Story / discover
    this.discoverOurStoryLink = page.locator('[data-discover-our-story-link-test-id]').first();
    //x Discover beauty bill link locator needs to be added I have hardcoded for now
    this.discoverBeautyBill = page.locator("(//h3[contains(text(),'Discover Beauty Bill')]//ancestor::section//a[@href='/pages/beauty-bill'])[1]");

    // Ingredients banner
    this.knowYourIngredientsLink = page.locator('[data-know-your-ingredients-link-test-id]').first();

    // In the spotlight section presence
    //X hardcoded the in the spotlight section locator and add to cart button locator and product title locator as they are not having any test id or unique attribute
    this.inTheSpotlightSection = page.locator('[data-in-the-spotlight-slide-test-id]').first();
    this.inTheSpotLightAddToCartButton = page.locator("//div[text()='in the spotlight']//parent::div[@class='container']//descendant::div[@class='owl-item active']//button[@name='add']");
    this.inTheSpotLightProductTitle = page.locator('[class="h-spotlight--name-review"]');
    this.inTheSpotLightNotifyMeButton = page.locator("//section[@data-section-test-id='index--template--19179790860458__in_the_spotlight_Ee8KK3']//button[contains(text(),'Notify Me')]");
    this.inTheSpotLightNotifyPopup = page.locator("//div[@class='notify-modal-box']");

    // What sets us apart section presence
    this.whatSetsUsApartSection = page.locator('[data-section-test-id="index--template--19179790860458__home-apart"]');
    this.whatSetsUsApartCard = page.locator('[data-what-sets-us-apart-card-test-id]');
    this.whatSetsUsApartContent = page.locator('[data-what-sets-us-apart-card-test-id]>span');

    //whats trending on social
    this.trendingOnSocialSection = page.locator("//div[contains(text(),'wha')]");

    // Reels / Customer Love presence (best-effort)
    this.customerLoveSection = page.locator('[data-section-test-id*="home-review"]').first();
    //Discover over story
    this.discoverOurStoryLink = page.locator("[data-section-test-id='index--template--19179790860458__story-home']");
    //x Discover our story banner locator needs to be added I have hardcoded for now
    this.discoverOurStoryBanner = page.locator("(//a[@data-discover-our-story-link-test-id='index--template--19179790860458__story-home-discover-our-story-link-1'])[1]");
    //Natural igresints banner
    this.knowYourIngredientsLink = page.locator("[data-section-test-id='index--template--19179790860458__home-ingradient']");

    // Beauty archives (home)
    //x Beauty archives selectors need to be added I have hardcoded for now
    this.beautyArchivesViewAll = page.locator("//h2[contains(text(),'beauty archives')]/parent::div[@class='home-page--blogs-container h-beauty-desk']//a");
    this.beautyArchivesFirstArticle = page.locator('(//a[@data-beauty-archives-article-title-test-id="index--template--19179790860458__custom_home_page_blogs_HHR3h8-beauty-archives-article-title-1"])[1]');

    // Newsletter
    this.newsletterEmail = page.locator('[data-newsletter-email-input-test-id]');
    this.newsletterConsent = page.locator('[data-newsletter-consent-checkbox-test-id]');
    this.newsletterSubmit = page.locator('[data-newsletter-submit-btn-test-id]');
    this.newsletterSuccess = page.locator('[id^="Newsletter-success--"]');

    // Footer
    this.footerProductLinks = page.locator("//p[contains(text(),'Product Links')]//parent::div//a");
    this.footerConcernLinks = page.locator("//p[contains(text(),'Concerns')]//parent::div//a");
    this.footerQuickLinks = page.locator("//p[contains(text(),'Quick links')]//parent::div//a");
    this.footerLegalLinks = page.locator("//p[contains(text(),'legal')]//parent::div//a");
    this.facebookLink = page.locator("//div[@class='footer__blocks-wrapper desktop_only ft-blwr-desk row']//a[@href='https://www.facebook.com/lovebeautyandplanetin']");
    this.instagramLink = page.locator("//div[@class='footer__blocks-wrapper desktop_only ft-blwr-desk row']//a[@href='https://www.instagram.com/lovebeautyandplanet_in/']");
    this.youtubeLink = page.locator("//div[@class='footer__blocks-wrapper desktop_only ft-blwr-desk row']//a[@href='https://www.youtube.com/channel/UCUFcrEf1Wb1164G6O2_LoyA']");
    this.cautionNotice = page.locator('[data-caution-notice-test-id]');
    //cart drawer
    this.cartproductTitle = page.locator("//a[contains(@class,'cart-item__name')]");
  }

  async goto() {
    await this.page.goto('https://lovebeautyandplanet.in/?preview_theme_id=145663918250');
  }
  async cookieAccept() {
    if (await this.cookieAcceptPopup.isVisible()) {
      await this.cookieAcceptPopup.click();
    }
  }

  async openAccountFromHeader() {
    await this.accountLink.click();
  }

  async openCartFromHeader() {
    await this.cartLink.click();
  }

  async clickAnnouncementBar() {
    await this.announcementBarLink.click();
  }

  async openAboutUs() {
    await this.navAboutUs.click();
  }

  async openIngredients() {
    await this.navIngredients.click();
  }

  async openBeautyArchives() {
    await this.navBeautyArchives.click();
  }

  async openContactUs() {
    await this.navContactUs.click();
  }

  async clickHeroBanner() {
    await this.heroBanner.click();
  }

  async switchToCollectionTabByIndex(index1Based) {
    await this.collectionTabs.nth(index1Based - 1).click();
  }

  async openFirstProductFromCollectionTab() {
    await this.firstProductLink.click();
  }

  async addFirstProductToCartFromCollectionTab() {
    await this.firstAtcButton.click();
  }

  async openShopByConcernFirstLink() {
    await this.shopByConcernLinks.first().click();
  }
  async openDiscoverOurStory() {
    await this.discoverOurStoryLink.click();
    await this.discoverOurStoryBanner.click();
  }
  async clickDiscoverBeautyBill() {
    await this.discoverBeautyBill.click();
  }

  async openKnowYourIngredientsBanner() {
    await this.knowYourIngredientsLink.click();
  }

  async openBeautyArchivesViewAll() {
    await this.beautyArchivesViewAll.click();
  }

  async openFirstBeautyArchivesArticle() {
    await this.beautyArchivesFirstArticle.click();
  }

  async subscribeNewsletter(email) {
    await this.newsletterEmail.fill(email);
    await this.newsletterConsent.check();
    await this.newsletterSubmit.click();
  }
  async clickFacebookLink() {
    await this.facebookLink.click();
  }
  async clickInstagramLink() {
    await this.instagramLink.click();
  }
  async clickYoutubeLink() {
    await this.youtubeLink.click();
  }

  async PLPRedirectionFromMegaMenu(collectionName) {
    await this.megaMenuShop.hover();
    await this.megaMenuAllCollectionLinks
      .filter({ hasText: collectionName })
      .first()
      .waitFor();
    await this.megaMenuAllCollectionLinks
      .filter({ hasText: collectionName })
      .first()
      .click();
  }
  async megamenuCollectionNavigation(page) {
    const expectedUrls = [
      'https://lovebeautyandplanet.in/collections/buy3-1399',
      'https://lovebeautyandplanet.in/collections/buy4-1799',
      'https://lovebeautyandplanet.in/collections/combos'
    ];

    // Get total dropdown options count
    const count = await this.megaMenuOffersDropdown.count();

    for (let i = 0; i < count; i++) {
      // Hover on Offers menu
      await this.megaMenuOffers.hover();
      // Wait for dropdown visibility
      await this.megaMenuOffersDropdown.first().waitFor();
      // Click dropdown option
      await this.megaMenuOffersDropdown.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
    }
  }
  async clickSearchTextfield() {
    await this.searchTexfield.click();

  }
  async clickAccountLink() {
    await this.accountLink.click();
  }
  async clickCartLink() {
    await this.cartLink.click();

  }
  async collectionTabsNavigation(page) {
    const expectedUrls = [
      'https://lovebeautyandplanet.in/collections/bestseller',
      'https://lovebeautyandplanet.in/collections/combos',
      'https://lovebeautyandplanet.in/collections/new-launches'
    ];
    for (let i = 0; i < await this.collectionTabs.count(); i++) {
      await this.collectionTabs.nth(i).click();
      await this.viewAllLink.nth(i).waitFor();
      await this.viewAllLink.nth(i).click();
      // Verify URL
      await expect(page).toHaveURL(expectedUrls[i]);
      // Navigate back
      await page.goBack();
    }
  }

  async addFirstProductToCartFromCollectionTab(page) {
    const productName = (await this.productTitle.first().innerText()).toLowerCase();
    await this.addToCartButton.first().click();
    await this.cartLink.click();
    await this.cartproductTitle.first().waitFor();
    const cartProducts = await this.cartproductTitle.allTextContents();
    const lowerCaseProducts = cartProducts.map(product =>
      product.toLowerCase()
    );
    expect(lowerCaseProducts).toContain(productName);
  }
  async shopByConcernSectionRedirections(page) {
    const expectedUrls = [
      'https://lovebeautyandplanet.in/collections/argan-oil-lavender',
      'https://lovebeautyandplanet.in/collections/onion-blackseed-patchouli',
      'https://lovebeautyandplanet.in/collections/bond-repair',
      'https://lovebeautyandplanet.in/collections/curry-leaves-biotin-mandarin',
      'https://lovebeautyandplanet.in/collections/rice-water-angelica',
      'https://lovebeautyandplanet.in/collections/tea-tree-and-vetiver'

    ];
    for (let i = 0; i < await this.shopByConcernLinks.count(); i++) {
      await this.shopByConcernLinks.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);
      await page.goBack();
      await this.shopByConcernLinks.nth(i).waitFor();
    }
  }
  async inTheSpotLightSection() {
    // Capture spotlight product title
    const productName = (
      await this.inTheSpotLightProductTitle.first().innerText()
    ).trim().toLowerCase();

    // Check whether Notify Me button is visible
    if (await this.inTheSpotLightNotifyMeButton.first().isVisible()) {

      // Click Notify Me
      await this.inTheSpotLightNotifyMeButton.first().click();

      // Verify Notify popup is displayed
      await expect(this.inTheSpotLightNotifyPopup).toBeVisible();
    }  else {

    // Click Add to Cart
    await this.inTheSpotLightAddToCartButton.first().click();

    // Open cart drawer
    await this.cartLink.click();

    // Wait for cart products
    await this.cartproductTitle.first().waitFor();

    // Convert cart products to lowercase
    const cartProducts = (
      await this.cartproductTitle.allTextContents()
    ).map(product =>
      product.trim().toLowerCase()
    );
    // Get meaningful product name
    const shortProductName = productName
      .split('\n')
      .pop()
      .trim();
    // Verify partial match
    const productAdded = cartProducts.some(product =>
      product.includes(shortProductName)
    );

    expect(productAdded).toBeTruthy();
  }
}
  async whatSetsUsApartDropdown() {
    for (let i = 0; i < await this.whatSetsUsApartCard.count(); i++) {
      await this.whatSetsUsApartCard.nth(i).click();
      await expect(this.whatSetsUsApartContent.nth(i)).toBeVisible();
    }
  }
  async footerProductLinksRedirections(page) {
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
    for (let i = 0; i < await this.footerProductLinks.count(); i++) {
      await this.footerProductLinks.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);
      await page.goBack();
      await this.footerProductLinks.nth(i).waitFor();
    }
  }
  async footerConcernLinksRedirections(page) {
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
    for (let i = 0; i < await this.footerConcernLinks.count(); i++) {
      await this.footerConcernLinks.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);
      await page.goBack();
      await this.footerConcernLinks.nth(i).waitFor();
    }
  }

  async footerQuickLinksRedirections(page) {
    const expectedUrls = [
      'https://lovebeautyandplanet.in/pages/our-story',
      'https://lovebeautyandplanet.in/pages/faq',
      'https://lovebeautyandplanet.in/pages/blogs',
      'https://lovebeautyandplanet.in/pages/contact-us',
      'https://lovebeautyandplanet.in/pages/shipping-refund-policy',
      'https://lovebeautyandplanet.in/pages/refund-policy',
      'https://lovebeautyandplanet.in/pages/track-order'
    ];
    for (let i = 0; i < await this.footerQuickLinks.count(); i++) {
      await this.footerQuickLinks.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);
      await page.goBack();
      await this.footerQuickLinks.nth(i).waitFor();
    }
  }
  async footerLegalLinksRedirections(page, context) {
    const expectedUrls = [
      'https://lovebeautyandplanet.in/policies/privacy-policy',
      'https://www.unilevernotices.com/privacy-notices/india-english.html',
      'https://notices.unilever.com/general/en/accessibility/',
      'https://www.unilevernotices.com/cookie-notices/india-english.html',
      'https://lovebeautyandplanet.in/pages/terms-of-use',
      'https://lovebeautyandplanet.in/pages/site-map',
      'https://lovebeautyandplanet.in/pages/terms-conditions-1'
    ];

    for (let i = 0; i < await this.footerLegalLinks.count(); i++) {

      const link = this.footerLegalLinks.nth(i);

      let popup = null;

      //Listen for popup BUT don't block forever
      const popupPromise = context.waitForEvent('page', { timeout: 2000 })
        .catch(() => null);

      await link.click();

      popup = await popupPromise;

      // CASE 1: NEW TAB OPENED
      if (popup) {

        await popup.waitForLoadState('domcontentloaded');

        await expect(popup).toHaveURL(expectedUrls[i]);

        await popup.close();

        await page.bringToFront();

      }

      // CASE 2: SAME TAB NAVIGATION
      else {

        await page.waitForURL(expectedUrls[i], { timeout: 5000 });

        await expect(page).toHaveURL(expectedUrls[i]);

        await page.goBack();

        await page.waitForLoadState('domcontentloaded');
      }

      // Ensure footer is stable before next iteration
      await link.waitFor({ state: 'visible' });
    }
  }
  async facebookRedirection(page, context) {
    // Wait for new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.clickFacebookLink()
    ]);

    // Wait until page is loaded
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.facebook.com/lovebeautyandplanetin');
  }
  async instagramRedirection(page, context) {

    // Wait for new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.clickInstagramLink()
    ]);

    // Wait until page is loaded
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.instagram.com/lovebeautyandplanet_in/');

  }
  async youtubeRedirection(page, context) {
    // Wait for new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.clickYoutubeLink()
    ]);

    // Wait until page is loaded
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.youtube.com/channel/UCUFcrEf1Wb1164G6O2_LoyA');
  }
}

