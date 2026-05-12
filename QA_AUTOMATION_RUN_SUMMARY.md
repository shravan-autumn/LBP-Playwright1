## Overview

This repo is a Shopify theme instrumented for Playwright **happy-flow** UI automation using **data attributes only** (`data-*-test-id`).

- **Test runner**: Playwright (`@playwright/test`)
- **Tests**: `./tests`
- **POMs**: `./pages`
- **Selector helpers**: `./utils/selectors.js`
- **Base URL**: set via `BASE_URL` (see “How to run”)

This theme supports **cart page** (and can also render a cart drawer depending on `settings.cart_type`). The automation primarily targets the **cart page** (`/cart`) and the shared header cart link.

---

## Sections instrumented (by template) + edited theme files

### Global (all templates)

- **Edited**: `layout/theme.liquid`
  - Added global page markers:
    - `data-page-url-test-id="{{ shop.domain | append: request.path }}"`
    - `data-page-title-test-id="{{ page_title }}"`

### `index` (Homepage)

Template source: `templates/index.json` (section `type`s observed: `home-banner-before`, `home-banner`, `home-product`, `shop-by-concern`, `story-home`, `home-ingradient`, `in-the-spotlight`, `home-apart`, `home-review`, `custom-gif-section`, `custom-home-page-blogs`, plus disabled/app blocks).

- **Edited**:
  - `sections/announcement-bar-new.liquid`
  - `sections/header.liquid`
  - `snippets/header-custom-menu.liquid`
  - `sections/home-banner.liquid`
  - `sections/home-banner-before.liquid`
  - `sections/home-product.liquid`
  - `snippets/mm-product-card.liquid`
  - `snippets/home-buttons.liquid`
  - `sections/shop-by-concern.liquid`
  - `sections/story-home.liquid`
  - `sections/home-ingradient.liquid`
  - `sections/home-apart.liquid`
  - `sections/home-review.liquid`
  - `sections/custom-gif-section.liquid`
  - `sections/in-the-spotlight.liquid`
  - `sections/custom-home-page-blogs.liquid`

### `collection` (PLP)

Template source: `templates/collection.json` + `templates/collection.custom.json` (section `type`s observed: `plp-header`, `main-collection-product-grid`, `custom-collection-plp`, `collection-beauty-edits`, `collection-faq`).

- **Edited**:
  - `sections/plp-header.liquid` (breadcrumb selectors)
  - `sections/main-collection-product-grid.liquid` (relies on `mm-product-card`)
  - `snippets/facets.liquid` (filters + applied filters + clear all)
  - `sections/custom-collection-plp.liquid` (You May Also Like on PLP)
  - `sections/collection-beauty-edits.liquid` (Beauty Archives on PLP)
  - `sections/collection-faq.liquid` (FAQs + Write to us)

### `product` (PDP)

Template source: `templates/product.json` (section `type`s observed: `main-product`, `pdp-details`, `custom-collection-grid`).

- **Edited**:
  - `sections/main-product.liquid` (pincode selectors)
  - `snippets/quantity-input.liquid` (qty selectors)
  - `sections/custom-collection-grid.liquid` (You May Also Like on PDP)

### `cart` (Cart page)

Template source: `templates/cart.json` (section `type`s: `main-cart-items`, `main-cart-footer`).

- **Edited**:
  - `sections/main-cart-items.liquid`
  - `sections/main-cart-footer.liquid`

### Footer group (newsletter + footer links)

Template source: `sections/footer-group.json` (section `type`s: `newsletter`, `footer`).

- **Edited**:
  - `sections/newsletter.liquid`
  - `sections/footer.liquid`
  - `snippets/social-icons.liquid`
  - `snippets/caution-notice.liquid`

---

## Selector naming and composition (“How selector IDs are composed”)

Selectors follow the repo spec convention:

- **Section hook**: `data-section-test-id="..."`
- **Element hook**: `data-[element-name]-test-id="..."`
- **Global page hooks**: `data-page-url-test-id`, `data-page-title-test-id`

For this theme, **section ids** are built from stable Shopify variables:

- Most sections use:  
  `template.name + '-' + section.type + '-' + section.id`

Examples:

- Header section marker: `data-section-test-id="{{ template.name }}-header-{{ section.id }}"`
- Newsletter marker: `data-section-test-id="{{ template.name }}-newsletter-{{ section.id }}"`

Element ids extend the section marker with semantic names and indices, e.g.:

- `data-logo-test-id="{{ headerSectionId }}-logo-1"`
- `data-hero-banner-link-test-id="{{ homeBannerSectionId }}-hero-banner-link-1"`
- `data-filter-checkbox-test-id="{{ facetsSectionId }}-filter-[filter]-[index]"`

---

## Selectors added (source of truth)

### Header / Global nav

- `layout/theme.liquid`
  - `data-page-url-test-id` (page identity)
  - `data-page-title-test-id` (page title identity)

- `sections/header.liquid`
  - `data-section-test-id` on header wrapper
  - `data-logo-test-id` on logo links
  - `data-account-link-test-id` on account link
  - `data-cart-link-test-id` on cart link

- `sections/announcement-bar-new.liquid`
  - `data-section-test-id` on announcement container
  - `data-announcement-bar-test-id` on announcement links

- `snippets/header-custom-menu.liquid`
  - `data-section-test-id` on menu container
  - `data-megamenu-link-test-id` / `data-megamenu-sublink-test-id` for menu items
  - Dedicated homepage nav hooks (when matching title):
    - `data-nav-about-us-test-id`
    - `data-nav-ingredients-test-id`
    - `data-nav-beauty-archives-test-id`
    - `data-nav-contact-us-test-id`

### Product card / ATC / quantity

- `snippets/mm-product-card.liquid`
  - `data-product-card-test-id` on card root
  - `data-product-link-test-id` on product image link
  - `data-product-image-test-id` on image
  - `data-product-title-link-test-id` on title link

- `snippets/home-buttons.liquid`
  - `data-atc-btn-test-id` on Add to Cart button

- `snippets/quantity-input.liquid`
  - `data-qty-wrapper-test-id`
  - `data-qty-minus-test-id`
  - `data-qty-input-test-id`
  - `data-qty-plus-test-id`

### PLP filters

- `snippets/facets.liquid`
  - `data-section-test-id` on facets container
  - `data-filter-checkbox-test-id` on each filter checkbox
  - `data-applied-filters-test-id` for applied filter containers
  - `data-clear-all-test-id` for “clear all”

### Homepage sections

- `sections/home-banner.liquid`
  - `data-section-test-id`
  - `data-hero-banner-test-id`
  - `data-hero-banner-link-test-id`

- `sections/home-banner-before.liquid`
  - `data-section-test-id`
  - `data-hero-before-link-test-id`

- `sections/home-product.liquid`
  - `data-section-test-id`
  - `data-collection-tab-test-id`
  - `data-view-all-test-id`
  - `data-add-to-cart-toast-test-id`
  - `data-view-cart-drawer-test-id`

- `sections/shop-by-concern.liquid`
  - `data-section-test-id`
  - `data-shop-by-concern-link-test-id`

- `sections/story-home.liquid`
  - `data-section-test-id`
  - `data-discover-our-story-link-test-id`

- `sections/home-ingradient.liquid`
  - `data-section-test-id`
  - `data-know-your-ingredients-link-test-id`

- `sections/home-apart.liquid`
  - `data-section-test-id`
  - `data-what-sets-us-apart-card-test-id`

- `sections/home-review.liquid`
  - `data-section-test-id`

- `sections/custom-gif-section.liquid`
  - `data-section-test-id`

- `sections/in-the-spotlight.liquid`
  - `data-section-test-id`
  - `data-in-the-spotlight-slide-test-id`

- `sections/custom-home-page-blogs.liquid`
  - `data-section-test-id`
  - `data-beauty-archives-view-all-test-id`
  - `data-beauty-archives-article-link-test-id`
  - `data-beauty-archives-article-title-test-id`

### PLP sections

- `sections/plp-header.liquid`
  - `data-section-test-id`
  - `data-breadcrumb-home-test-id`
  - `data-breadcrumb-collections-test-id`
  - `data-breadcrumb-current-test-id`

- `sections/custom-collection-plp.liquid`
  - `data-section-test-id`
  - `data-view-all-test-id`
  - `data-add-to-cart-toast-test-id`
  - `data-view-cart-drawer-test-id`

- `sections/collection-beauty-edits.liquid`
  - `data-section-test-id`
  - `data-beauty-archives-view-all-test-id`
  - `data-beauty-archives-article-link-test-id`
  - `data-beauty-archives-article-title-test-id`

- `sections/collection-faq.liquid`
  - `data-section-test-id`
  - `data-faq-view-all-test-id`
  - `data-write-to-us-link-test-id`

### PDP sections

- `sections/main-product.liquid`
  - `data-section-test-id` on pincode wrapper
  - `data-pincode-form-test-id`
  - `data-pincode-input-test-id`
  - `data-pincode-check-btn-test-id`
  - `data-pincode-change-btn-test-id`
  - `data-pincode-error-test-id`
  - `data-pincode-response-test-id`

- `sections/custom-collection-grid.liquid` (PDP “You may also like”)
  - `data-section-test-id`
  - `data-view-all-test-id`
  - `data-add-to-cart-toast-test-id`
  - `data-view-cart-drawer-test-id`

### Cart sections

- `sections/main-cart-items.liquid`
  - `data-section-test-id`
  - `data-empty-cart-test-id`
  - `data-empty-cart-continue-shopping-test-id`
  - `data-cart-form-test-id`
  - `data-cart-line-item-test-id`
  - `data-cart-item-title-test-id`

- `sections/main-cart-footer.liquid`
  - `data-section-test-id`
  - `data-cart-totals-test-id`
  - `data-cart-total-price-test-id`
  - `data-checkout-cta-test-id`
  - `data-checkout-destination-test-id`

### Auth

- `sections/main-login.liquid`
  - `data-section-test-id`
  - `data-login-email-input-test-id`
  - `data-login-password-input-test-id`
  - `data-login-submit-btn-test-id`
  - `data-create-account-link-test-id`

- `sections/main-register.liquid`
  - `data-section-test-id`
  - `data-register-first-name-input-test-id`
  - `data-register-last-name-input-test-id`
  - `data-register-email-input-test-id`
  - `data-register-phone-input-test-id`
  - `data-register-password-input-test-id`
  - `data-register-confirm-password-input-test-id`
  - `data-register-submit-btn-test-id`

### Footer / newsletter / caution

- `sections/newsletter.liquid`
  - `data-section-test-id`
  - `data-newsletter-email-input-test-id`
  - `data-newsletter-consent-checkbox-test-id`
  - `data-newsletter-submit-btn-test-id`

- `sections/footer.liquid`
  - `data-section-test-id`
  - `data-footer-links-test-id`
  - `data-footer-link-test-id`

- `snippets/social-icons.liquid`
  - `data-social-links-test-id`
  - `data-social-link-test-id` (facebook/instagram/youtube)

- `snippets/caution-notice.liquid`
  - `data-caution-notice-test-id`

---

## Test cases mapping (required → selectors → POM → spec)

### Login (3)

1. **Verify navigation to login page via account link**
   - **Selectors**: `data-account-link-test-id`
   - **POM**: `HomePage.openAccountFromHeader()`
   - **Spec**: `tests/login.spec.js` → `Login1`

2. **Verify user can create account with valid credentials**
   - **Selectors**: `data-create-account-link-test-id`, register inputs + submit
   - **POM**: (direct locators in spec, uses instrumented attributes)
   - **Spec**: `tests/login.spec.js` → `Login2`

3. **Verify user can login with valid credentials**
   - **Selectors**: `data-login-email-input-test-id`, `data-login-password-input-test-id`, `data-login-submit-btn-test-id`
   - **POM**: (direct locators in spec)
   - **Spec**: `tests/login.spec.js` → `Login3` (skips unless env creds provided)

### Homepage (27)

All homepage cases are implemented in `tests/homepage.spec.js` using `pages/homepage.js`.

- **HP1** logo: `data-logo-test-id` → `HomePage.logo` → `Homepage: HP1`
- **HP2** announcement navigation: `data-announcement-bar-test-id` → `clickAnnouncementBar()` → `HP2`
- **HP3** megamenu product nav: `data-megamenu-link-test-id` → (direct) → `HP3`
- **HP4** about us nav: `data-nav-about-us-test-id` → `openAboutUs()` → `HP4`
- **HP5** ingredients nav: `data-nav-ingredients-test-id` → `openIngredients()` → `HP5`
- **HP6** beauty archives nav: `data-nav-beauty-archives-test-id` → `openBeautyArchives()` → `HP6`
- **HP7** contact us nav: `data-nav-contact-us-test-id` → `openContactUs()` → `HP7`
- **HP8** hero banner redirect: `data-hero-banner-link-test-id` → `clickHeroBanner()` → `HP8`
- **HP9** collection tabs: `data-collection-tab-test-id` → `switchToCollectionTabByIndex()` → `HP9`
- **HP10** product nav from tab: `data-product-link-test-id` → `openFirstProductFromCollectionTab()` → `HP10`
- **HP11** ATC from tab: `data-atc-btn-test-id` + `data-add-to-cart-toast-test-id` → `addFirstProductToCartFromCollectionTab()` → `HP11`
- **HP12** shop by concern visible: `data-shop-by-concern-link-test-id` → `shopByConcernLinks` → `HP12`
- **HP13** discover beauty bill nav: uses discover/story link hook → `openDiscoverOurStory()` → `HP13`
- **HP14** spotlight + ATC: `data-in-the-spotlight-slide-test-id` + `data-atc-btn-test-id` → (direct) → `HP14`
- **HP15** sets us apart: `data-what-sets-us-apart-card-test-id` → `HP15`
- **HP16** reels section display: apps blocks disabled → `HP16` best-effort
- **HP17** customer love display: section marker → `HP17`
- **HP18** discover our story: `data-discover-our-story-link-test-id` → `openDiscoverOurStory()` → `HP18`
- **HP19** beauty archives view all: `data-beauty-archives-view-all-test-id` → `openBeautyArchivesViewAll()` → `HP19`
- **HP20** beauty archives article: `data-beauty-archives-article-link-test-id` → `openFirstBeautyArchivesArticle()` → `HP20`
- **HP21** newsletter subscription: `data-newsletter-*` → `subscribeNewsletter()` → `HP21`
- **HP22–HP25** footer link groups: `data-footer-link-test-id` → `footerLinks` → `HP22–HP25`
- **HP26** footer social: `data-social-link-test-id` → `footerSocialLinks` → `HP26`
- **HP27** caution notice: `data-caution-notice-test-id` → `cautionNotice` → `HP27`

### PLP (10)

Implemented in `tests/plp.spec.js` using `pages/plp.js` (and `HomePage` for navigation).

- **PLP1** homepage → PLP: `data-shop-by-concern-link-test-id` → `HomePage.openShopByConcernFirstLink()` → `PLP1`
- **PLP2** applied filters display: `data-filter-checkbox-test-id`, `data-applied-filters-test-id` → `applyAnyFilterIfAvailable()` + `expectAppliedFiltersVisible()` → `PLP2`
- **PLP3** filtered products correctness: product cards visible → `PLP3`
- **PLP4** clearing filters: `data-clear-all-test-id` → `clearAllFilters()` → `PLP4`
- **PLP5** add to cart: `data-atc-btn-test-id` + toast hook → `addFirstProductToCart()` → `PLP5`
- **PLP6** You may also like: section marker `custom-collection-plp` → `PLP6`
- **PLP7** beauty archives section: `collection-beauty-edits` marker → `PLP7`
- **PLP8** view all redirection: `data-beauty-archives-view-all-test-id` → `openBeautyEditsViewAll()` → `PLP8`
- **PLP9** FAQs section: `data-faq-view-all-test-id` → `openFaqViewAll()` → `PLP9`
- **PLP10** write to us: `data-write-to-us-link-test-id` → `openWriteToUs()` → `PLP10`

### PDP (10)

Implemented in `tests/pdp.spec.js` using `pages/pdp.js`.

- **PDP1** PLP → PDP navigation: product URL assertion → `PDP1`
- **PDP2** PDP → PLP links: breadcrumb or back → `PDP2`
- **PDP3** invalid pincode: `data-pincode-*` + `data-pincode-error-test-id` → `checkInvalidPincode()` → `PDP3`
- **PDP4** valid pincode: `data-pincode-*` + response hook → `checkValidPincode()` → `PDP4`
- **PDP5** add to cart: `data-atc-btn-test-id` → `addToCart()` → `PDP5`
- **PDP6** qty increase: `data-qty-plus-test-id` + input hook → `increaseQuantity()` → `PDP6`
- **PDP7** qty decrease: `data-qty-minus-test-id` + input hook → `decreaseQuantity()` → `PDP7`
- **PDP8** reviews section display: `pdp-details` marker (Yotpo loads async) → `PDP8`
- **PDP9** details section display: `pdp-details` marker → `PDP9`
- **PDP10** You may also like: `custom-collection-grid` marker → `PDP10`

### Cart (5)

Implemented in `tests/cart.spec.js` using `pages/cart.js`.

- **Cart1** empty cart → collections: `data-empty-cart-*` → `expectEmptyCartAndGoToCollections()` → `Cart1`
- **Cart2** multiple products: add twice then assert line items present (`data-cart-line-item-test-id`) → `Cart2`
- **Cart3** total price: `data-cart-total-price-test-id` → `expectTotalPriceVisible()` → `Cart3`
- **Cart4** freebie addition: expects `tr.freebie-product` after adding multiple times → `Cart4`
- **Cart5** checkout navigation: `data-checkout-destination-test-id` presence → `Cart5`

---

## How it works (templates → sections → selectors → tests)

1. **Detect used sections**
   - Shopify JSON templates store sections under the top-level `sections` object, each with a `type`.
   - I read:
     - `templates/index.json`
     - `templates/collection.json`
     - `templates/collection.custom.json`
     - `templates/product.json`
     - `templates/cart.json`
     - plus footer group `sections/footer-group.json`
   - The unique `type`s are then matched to `sections/<type>.liquid` (and shared `snippets/*.liquid` used by those sections).

2. **Instrument only what tests need**
   - Added `data-section-test-id` to the section roots and `data-[element]-test-id` only for UI elements used by the required happy flows.

3. **Automation reads only those attributes**
   - POM constructors define locators using `page.locator('[data-...-test-id]')`.
   - Specs call POM methods and assert final states via Playwright `expect`.

---

## How to run tests

### 1) Install dependencies

```bash
npm install
```

### 2) Run against a storefront

Set `BASE_URL` to your live or dev storefront URL:

```bash
BASE_URL="https://your-store-domain" npx playwright test
```

### 3) Optional: login credentials

Login happy-flow test requires:

- `TEST_EMAIL`
- `TEST_PASSWORD`

Example:

```bash
BASE_URL="https://your-store-domain" TEST_EMAIL="user@example.com" TEST_PASSWORD="password" npx playwright test tests/login.spec.js
```

