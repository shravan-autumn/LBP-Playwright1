import { expect } from '@playwright/test';
exports.PLP = class PLP {

  constructor(page) {
    this.page = page;

    this.pageUrlMarker = page.locator('[data-page-url-test-id]');
    this.breadcrumbHome = page.locator('[data-breadcrumb-home-test-id]').first();
    this.breadcrumbCollections = page.locator('[data-breadcrumb-collections-test-id]').first();
    this.breadcrumbCurrent = page.locator('[data-breadcrumb-current-test-id]').first();

    // Product cards + add to cart
    this.productTitles = page.locator('//p[@class="h-pro-card-cnt-description"]');
    this.productCards = page.locator('[data-product-card-test-id]');
    this.firstProductLink = page.locator('[data-product-link-test-id]').first();
    this.firstAtcButton = page.locator('[data-atc-btn-test-id]').first();
    this.atcToast = page.locator('[data-add-to-cart-toast-test-id]').first();
    this.viewCartDrawerButton = page.locator('[data-view-cart-drawer-test-id]').first();

    // Filters (facets)
    this.allFilterOptions = page.locator("//span[@class='facet-checkbox__text']");
    this.appliedFilters = page.locator('[data-applied-filter-test-id]');
    this.facetsSection = page.locator('[data-section-test-id*="-facets-"]').first();
    this.anyFilterCheckbox = page.locator('[data-filter-checkbox-test-id]').first();
    this.appliedFiltersDesktop = page.locator('[data-applied-filters-test-id*="desktop"]').first();
    this.appliedFiltersMobile = page.locator('[data-applied-filters-test-id*="mobile"]').first();
    this.clearAllDesktop = page.locator('[data-clear-all-test-id*="desktop"]').first();
    this.clearAllMobile = page.locator('[data-clear-all-test-id*="mobile"]').first();

    // You may also like section on PLP
    this.ymalSection = page.locator("//h2[contains(text(),'you may also like')]");
    this.ymalViewAll = page.locator('[data-view-all-test-id="collection--template--19179791057066__custom_collection_plp_YtQM8r-view-all-1"]');

    // Beauty archives section on PLP
    this.beautyEditsSection = page.locator('[data-section-test-id*="collection-beauty-edits"]').first();
    this.beautyEditsViewAll = page.locator('[data-beauty-archives-view-all-test-id]').first();

    // FAQs + write to us
    this.faqsection = page.locator('[data-section-test-id="collection--template--19179791057066__collection-faq"]');
    this.writeToUs = page.locator('[data-write-to-us-link-test-id]');
    //PLP
    this.plpProductTitle = page.locator('//div[@class="product__title"]');
    //cart drawer
    this.cartproductTitle = page.locator("//a[contains(@class,'cart-item__name')]");
    //Home page
    this.cartLink = page.locator('[data-cart-link-test-id]');

  }

  async gotoCollection(handle = 'all-products') {
    await this.page.goto(`/collections/${handle}`);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.pageUrlMarker).toHaveCount(1);
  }

  async openFirstProduct() {
    await this.firstProductLink.click();
  }

  async applyFiltersAndValidateProducts() {

    const filtersToApply = [
      'Argan Oil And Lavender',
      'Hair Care',
      'Frizz control'
    ];

    // Apply filters
    for (const filter of filtersToApply) {

      const filterOption = this.allFilterOptions
        .filter({ hasText: filter })
        .first();

      await filterOption.scrollIntoViewIfNeeded();
      await filterOption.click();

      // Wait for applied filter to appear
      await this.page.waitForSelector(
        '[data-applied-filter-test-id]'
      );

      await this.page.waitForTimeout(2000);

      // Validate current applied filter displayed
      const appliedFiltersText =
        await this.appliedFilters.allInnerTexts();

      expect(
        appliedFiltersText.join(' ').toLowerCase()
      ).toContain(filter.toLowerCase());
    }

    // Final validation of all applied filters
    const finalAppliedFilters =
      await this.appliedFilters.allInnerTexts();

    const normalizedFilters =
      finalAppliedFilters.join(' ').toLowerCase();

    for (const filter of filtersToApply) {

      expect(normalizedFilters)
        .toContain(filter.toLowerCase());
    }

    // Get all product titles
    const allProductTitles =
      await this.productTitles.allInnerTexts();

    // Validate relvant products are displayed - at least in the first few products (to optimize test execution time instead of checking all products)
    const fewProducts = allProductTitles.slice(0, 4);

    let relevantProductsCount = 0;

    for (const title of fewProducts) {

      const normalizedTitle = title.toLowerCase();

      const isRelevant = filtersToApply.some(filter => {

        const filterWords = filter
          .toLowerCase()
          .split(' ');

        return filterWords.some(word =>
          normalizedTitle.includes(word)
        );
      });

      if (isRelevant) {
        relevantProductsCount++;
      }
    }
    expect(relevantProductsCount).toBeGreaterThan(0);
  }

  async removeAppliedFilters() {

    const filtersToApply = [
      'Argan Oil And Lavender',
      'Hair Care'
    ];

    // Apply filters
    for (const filter of filtersToApply) {

      const filterOption = this.allFilterOptions
        .filter({ hasText: filter })
        .first();

      await filterOption.scrollIntoViewIfNeeded();

      await filterOption.click();

      // Wait for applied filter to appear
      await this.page.waitForSelector(
        '[data-applied-filter-test-id]'
      );

      await this.page.waitForTimeout(2000);
      await this.clearAllDesktop.click();
      await expect(this.clearAllDesktop).not.toBeVisible();

    }
  }
  async expectAppliedFiltersVisible() {
    // Desktop applied filters commonly used; fall back to mobile container if needed.
    if (await this.appliedFiltersDesktop.count()) {
      await expect(this.appliedFiltersDesktop).toBeVisible();
      return;
    }
    await expect(this.appliedFiltersMobile).toBeVisible();
  }

  async clearAllFilters() {
    if (await this.clearAllDesktop.count()) {
      await this.clearAllDesktop.click();
      return;
    }
    await this.clearAllMobile.click();
  }

  async addFirstProductToCart() {
    await this.firstAtcButton.click();
  }

  async openYmalViewAll() {
    await this.ymalViewAll.click();
  }

  async openBeautyEditsViewAll() {
    await this.beautyEditsViewAll.click();
  }

  async openFaqViewAll() {
    await this.faqViewAll.click();
  }

  async openWriteToUs() {
    await this.writeToUs.click();
  }
async PLPtoPDPnavigation(){
   // Get first product name from PLP
      const firstProductName = await this.productTitles
        .first()
        .textContent();
  
      // Open first product
      await this.openFirstProduct();
  
      // Get PDP product title
      const productTitle = await this.plpProductTitle
        .textContent();
  
      // Validate same product opened
      expect(productTitle.trim().toLowerCase())
        .toContain(firstProductName.trim().toLowerCase());
}
async addToCartFRomPLP(){
    // Get first product name from PLP
      const productName = (
        await this.productTitles.first().innerText()
      ).toLowerCase();
  
      // Add first product to cart
      await this.firstAtcButton.click();
  
      // Open cart drawer
      await this.cartLink.click();
  
      // Wait for cart product to appear
      await this.cartproductTitle.first().waitFor();
  
      // Get all cart product titles
      const cartProducts =
        await this.cartproductTitle.allTextContents();
  
      // Convert cart products to lowercase
      const lowerCaseProducts = cartProducts.map(product =>
        product.toLowerCase()
      );
  
      // Validate same product added to cart
      expect(lowerCaseProducts)
        .toContain(productName);
}
}

