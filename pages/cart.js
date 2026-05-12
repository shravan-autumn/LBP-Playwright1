import { expect } from '@playwright/test';

exports.Cart = class Cart {

  constructor(page) {
    this.page = page;
    //x empty cart message locator needs to be added i have hardcoded for now
    this.emptyCartMessage = page.locator('[class="cart__empty-text"]');
    this.emptyCartContinueShopping = page.locator("//div[@class='cart-drawer__warnings center']//a[@href='/collections/all']");
    this.cartLink = page.locator('[data-cart-link-test-id]');

    this.productTitle = page.locator("//a[contains(@class,'cart-item__name')]");
    this.pageUrlMarker = page.locator('[data-page-url-test-id]');

    this.cartItemsSection = page.locator('[data-section-test-id*="main-cart-items"]').first();
    this.emptyCartWrapper = page.locator('[data-empty-cart-test-id]').first();

    this.cartLineItems = page.locator('[data-cart-line-item-test-id]');
    this.checkoutDestination = page.locator('[data-checkout-destination-test-id]').first();

    this.freebieRow = page.locator('tr.freebie-product');
    this.closeCart = page.locator('(//button[@class="drawer__close"])[1]');
    this.cartTotalPrice = page.locator('//span[@class="price-amount"]');
    this.freebie = page.locator('//div[@class="freebie-text"]');
    this.checkoutButton = page.locator("//span[contains(text(),'Checkout')]");
    this.gokwikPopup = page.locator('//div[@class="gokwik-modal gokwik-modal-content"]');
    this.hidebar = page.locator('(//span[@class="_TextLabel_1ymlj_49"])[1]');
    this.pdpatcButton = page.locator('//button[@id="ProductSubmitButton-template--19179790532778__main"]');
    this.pdpproductTitle = page.locator('//div[@class="product__title"]');
    this.pdpproductPrice = page.locator('//div[@class="sing-product-variant"]//span[@class="pro-variant-price"]');
    this.quantitySelctor = page.locator('[data-quantity-variant-id="42670785069226"]');
    this.quantityminus = page.locator('//tr//button[@name="minus"]');
    this.quantityplus = page.locator('//tr//button[@name="plus"]');
    this.cartLink = page.locator('[data-cart-link-test-id]');



  }

  async hidebar() {
    await this.hidebar.click();
  }

  async checkoutValidation() {
    await this.checkoutButton.click();
    await this.gokwikPopup.waitFor();
    await expect(this.gokwikPopup).toBeVisible();
  }

  async closecart() {
    await this.closeCart.waitFor();
    await this.closeCart.click();
  }
  async emptycartVisibility() {
    await this.cartLink.click();
    await expect(this.emptyCartMessage).toBeVisible();
  }
  async continueShopping() {
    await this.cartLink.click();
    await this.emptyCartContinueShopping.waitFor();
    await this.emptyCartContinueShopping.click();
    await expect(this.page).toHaveURL(
      'https://lovebeautyandplanet.in/collections/all'
    );
  }
  async expectEmptyCartAndGoToCollections() {
    await expect(this.emptyCartWrapper).toBeVisible();
    await this.emptyCartContinueShopping.click();
  }

  async expectHasAtLeastNLineItems(n) {
    await expect(this.cartLineItems).toHaveCount(n);
  }

  async expectTotalPriceVisible() {
    await expect(this.cartTotalPrice).toBeVisible();
  }

  async expectFreebiePresent() {
    await expect(this.freebieRow.first()).toBeVisible();
  }
  async addToCart() {
    const productTitle = await this.pdpproductTitle.textContent();
    await this.pdpatcButton.click();
    return productTitle;
  }
  async addFirstProductToCart() {
    var productTitle = await this.addToCart();
    // Wait for cart product
    await this.productTitle.first().waitFor();
    // Get first cart product
    var cartTitle = await this.productTitle.first().textContent();
    // Take few words from PDP title
    var expectedText = productTitle
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 5)
      .join(' ');
    // Validate cart contains similar text
    expect(cartTitle.toLowerCase()).toContain(expectedText);
    await this.closecart();
  }
  async addSecondProductToCart() {
    var productTitle = await this.addToCart();
    // Wait for cart product
    await this.productTitle.first().waitFor();
    // Get first cart product
    var cartTitle = await this.productTitle.first().textContent();
    // Take few words from PDP title
    var expectedText = productTitle
      .toLowerCase()
      .trim()
      .split(' ')
      .slice(0, 5)
      .join(' ');
    // Validate cart contains similar text
    expect(cartTitle.toLowerCase()).toContain(expectedText);
    await this.closecart();
  }
  async cartQunatitySelectorFunctionality(page) {

    const initialPrice = parseInt(
      (await this.cartTotalPrice.textContent()).replace(/[^\d]/g, '')
    );
    await this.cartLink.click();
    await this.quantityplus.click();
    await page.waitForTimeout(2000);
    const increasedPrice = parseInt(
      (await this.cartTotalPrice.textContent()).replace(/[^\d]/g, '')
    );
    expect(increasedPrice).toBeGreaterThan(initialPrice);
    await this.quantityminus.click();
    await page.waitForTimeout(2000);
    const decreasedPrice = parseInt(
      (await this.cartTotalPrice.textContent()).replace(/[^\d]/g, '')
    );
    expect(decreasedPrice).toBe(initialPrice);
  }

}

