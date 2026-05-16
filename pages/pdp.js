import { expect } from '@playwright/test';

exports.PDP = class PDP {

  constructor(page) {
    this.page = page;
    this.searchTexfield = page.locator("//div[@class='header__icons header__icons--localization header-localization']//input");
    this.productTitlesSearchPLP = page.locator('(//div[@class="result-product-item-info h-pro-card-cnt"]//a)[1]');
    this.firstProductLinkSearchPLP = page.locator('[data-product-link-test-id]').first();
    this.searchPageResults = page.locator('[class="wizzy-summary-head"]');
    this.productPrice = page.locator('//div[@class="sing-product-variant"]//span[@class="pro-variant-price"]');


    this.pageUrlMarker = page.locator('[data-page-url-test-id]');
    this.productTitle = page.locator('//div[@class="product__title"]');
    this.viewproductsLink = page.locator('//div[@class="pdp-offers "]//a');

    // Breadcrumb back to PLP (best-effort: use browser back + header nav)
    this.breadcrumbHome = page.locator('[data-breadcrumb-home-test-id]').first();
    this.breadcrumbCollections = page.locator('[data-breadcrumb-collections-test-id]').first();

    // ATC + quantity (from shared snippets)
    this.atcButton = page.locator('//button[@id="ProductSubmitButton-template--19179790532778__main"]');
    this.qtyPlus = page.locator('[data-qty-plus-test-id]').first();
    this.qtyMinus = page.locator('[data-qty-minus-test-id]').first();
    this.qtyInput = page.locator('[data-qty-input-test-id]').first();

    // Pincode validation
    this.pincodeInput = page.locator('[data-pincode-input-test-id]').first();
    this.pincodeCheckBtn = page.locator('[data-pincode-check-btn-test-id]').first();
    this.pincodeError = page.locator('[data-pincode-response-test-id]');
    this.pincodeResponse = page.locator('[data-pincode-response-test-id]');

    // Details / FAQ / Reviews presence
    this.detailsSection = page.locator('[data-id="pdp-details"]');
    this.reviewsSection = page.locator('[class="yotpo-headline"]');
    this.faqSection = page.locator('//button[contains(text(),"FAQS")]');
    this.writeToUs = page.locator("//a[contains(text(),'Write to us')]");
    this.reelsSection = page.locator('[id="reelUp_playlist_3503"]');
    this.faqtab = page.locator("//div[@class='container']//a[contains(text(),'FAQs')]");


    // You may also like section on PDP
    this.ymalSection = page.locator('[data-section-test-id*="custom-collection-grid"]').first();
    this.ymalFirstCard = page.locator('[data-section-test-id*="custom-collection-grid"] [data-product-card-test-id]').first();
    this.ymalViewAll = page.locator('[data-view-all-test-id="product--template--19179790532778__custom_collection_grid_pigQig-view-all-1"]');
    this.cautionNotice = page.locator('[data-caution-notice-test-id]');
    //cart drawer
    this.cartproductTitle = page.locator("//a[contains(@class,'cart-item__name')]");
    this.closeCart = page.locator('(//button[@class="drawer__close"])[1]');

  }

  async expectLoaded() {
    await expect(this.pageUrlMarker).toHaveCount(1);
  }

  async checkInvalidPincode(value) {
    await this.pincodeInput.fill(value);
    await this.pincodeCheckBtn.click();
    await expect(this.pincodeError).toBeVisible();
  }

  async checkValidPincode(value) {
    await this.pincodeInput.fill(value);
    await this.pincodeCheckBtn.click();
    await expect(this.pincodeResponse).toBeVisible();
  }

  async addToCart() {
    const productTitle = await this.productTitle.textContent();
    await this.atcButton.click();
    return productTitle;
  }

  async increaseQuantity() {
    await this.atcButton.click();
    const before = await this.qtyInput.inputValue();
    await this.qtyPlus.click();
    await expect(this.qtyInput).not.toHaveValue(before);
  }

  async decreaseQuantity() {
    await this.atcButton.click();
    const before = await this.qtyInput.inputValue();
    await this.qtyPlus.click();
    await this.closeCart.click();
    await this.qtyMinus.click();
    await expect(this.qtyInput).toHaveValue(before);
  }

  async searchPLPToPDPNavigation(productName) {
    await this.searchTexfield.click();

    await this.searchTexfield.pressSequentially(productName, {
      delay: 100
    });
    // Get first product name from PLP
    const firstProductName = await this.productTitlesSearchPLP
      .first()
      .textContent();
    // Open first product
    await this.productTitlesSearchPLP.click();

    return firstProductName;
  }
  async writeToUsNavigation() {
    await this.faqtab.click();
    await this.writeToUs.waitFor();
    await this.writeToUs.click();
  }
  async youmayalsolikeNavigation() {
    await this.ymalViewAll.click();
  }
  async PDPtoPLPnavigation(page) {
    const expectedUrls = [
      'https://lovebeautyandplanet.in/collections/all-products',
      'https://lovebeautyandplanet.in/collections/bundle-offers',
      'https://lovebeautyandplanet.in/collections/bundle-offers'

    ];
    for (let i = 0; i < await this.viewproductsLink.count(); i++) {
      await this.viewproductsLink.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);
      await page.goBack();
      await this.viewproductsLink.nth(i).waitFor();
    }
  }
  async addToCartFromPDP() {
    const productTitle = await this.addToCart();

    // Wait for cart product
    await this.cartproductTitle.first().waitFor();

    // Get first cart product
    const cartTitle = await this.cartproductTitle.first().textContent();

    // Take few words from PDP title
    const expectedText = productTitle
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 5)
      .join(' ');

    // Validate cart contains similar text
    expect(cartTitle.toLowerCase()).toContain(expectedText);
  }
}
