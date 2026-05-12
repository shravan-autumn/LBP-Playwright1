# Love Beauty and Planet — QA Automation Subagent (Playwright)

## Purpose
This repository contains **Playwright** UI automation for Love Beauty and Planet (Shopify storefront). The automation follows a **Page Object Model (POM)** split:

- **Definition files** in `pages/`: selectors + page actions (methods)
- **Execution files** in `tests/`: Playwright test specs that call the POM methods

This document is written as a **“bigger picture” subagent spec**: it explains the repo structure and coding standards, and it also defines the **required behaviors** for a QA automation subagent you will run inside a Shopify theme repo.

## Playwright configuration (`playwright.config.js`)
The project uses Playwright Test runner.

- **Test directory**: `testDir: './tests'`
- **Reporter**: HTML
- **Default browser**: Chromium (headed by default in this repo)
- **CI**: retries/workers configured for stability

When adding new tests, they must run under this configuration via:

```bash
npx playwright test
```

## File structure
Typical structure (some files may be empty placeholders until the agent fills them):

```
LoveBeautyAndPlanet/
  pages/
    homepage.js
    plp.js
    pdp.js
    cart.js
  tests/
    homepage.spec.js
    plp.spec.js
    pdp.spec.js
    cart.spec.js
  utils/
    selectors.js
  playwright.config.js
  package.json
  .github/workflows/playwright.yml
```

### `pages/` (definition / POM)
The `pages/` folder contains page-specific JS definition files:

- `pages/homepage.js`
- `pages/plp.js`
- `pages/pdp.js`
- `pages/cart.js`

Each definition file contains:

- **a constructor** that defines all required DOM selectors for that page’s test cases
- **methods** that implement the actions and assertions helpers needed by the specs

#### Selector rule (critical)
In Shopify theme repos, selectors must be **data attributes only** with `test-id` (see “Selector naming convention” below). Avoid brittle selectors (`class`, long XPath, text locators) except as a temporary fallback while instrumenting the theme.

#### Recommended POM skeleton (example)
Use a POM that exposes **locators** and **meaningful actions**. Prefer passing ids into helper functions rather than repeating CSS strings.

```js
// pages/homepage.js
export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logo = page.locator('[data-logo-test-id]');
    this.accountLink = page.locator('[data-account-link-test-id]');
    this.announcementBar = page.locator('[data-announcement-bar-test-id]');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openAccount() {
    await this.accountLink.click();
  }

  async clickAnnouncementBar() {
    await this.announcementBar.click();
  }
}
```

### `tests/` (execution / spec)
The `tests/` folder contains page-specific execution files:

- `tests/homepage.spec.js`
- `tests/plp.spec.js`
- `tests/pdp.spec.js`
- `tests/cart.spec.js`

Each spec file:

- imports the matching POM classes from `pages/`
- sets up page state in `beforeEach` (e.g., navigate to base URL / open required menus)
- contains tests that call POM methods and assert via `expect`

#### Recommended spec skeleton (example)
Keep `beforeEach` minimal and deterministic. Prefer one assertion per expected outcome.

```js
// tests/homepage.spec.js
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    const hp = new HomePage(page);
    await hp.goto();
    // store on test context if you prefer: test.info().attachments etc.
    page.__hp = hp; // optional pattern (or use a closure variable)
  });

  test('Verify logo is displayed', async ({ page }) => {
    const hp = page.__hp;
    await expect(hp.logo).toBeVisible();
  });
});
```

### Common “fill in the gaps”
In addition to `pages/` and `tests/`, the repo commonly includes:

- **CI**: `.github/workflows/playwright.yml` (runs `npx playwright test`)
- **Artifacts**: `playwright-report/`, `test-results/` (ignored in git)
- **Dependencies**: `package.json` / `package-lock.json`

## Coding standards (JS / Playwright / TypeScript-ready)
These are standard “world” conventions, tuned for Playwright + Shopify themes.

### General JavaScript / TypeScript hygiene
- **Consistency**: one style per repo (prefer `import` syntax; avoid mixing CJS and ESM inside the same file unless necessary).
- **Naming**:
  - POM classes: `HomePage`, `PLP`, `PDP`, `Cart`
  - Locators: noun-based (`atcButton`, `heroBanner`, `filtersPanel`)
  - Methods: verb-based (`goto()`, `openMegaMenu()`, `addFirstProductToCart()`)
- **No hard sleeps**: avoid `waitForTimeout()` except for diagnosing flaky UI.
- **Deterministic waits**: prefer `await expect(locator).toBeVisible()` or `await locator.waitFor()`.

### Playwright best practices
- **Locators**:
  - Prefer `page.locator('[data-...-test-id="..."]')` style.
  - Keep locators in POM constructors; keep interactions inside POM methods.
- **Assertions**:
  - Use `expect` for URL, visibility, text, count, enabled/disabled, etc.
  - Assert meaningful end-states (navigation landed, cart count changed, totals updated).
- **Test isolation**:
  - Each test should start from a known state (fresh navigation, cart reset if needed).
  - Do not rely on test ordering.
- **No focused tests in committed code**:
  - Never leave `test.only()` / `describe.only()` in the repo.

#### Locator helper examples (recommended)
If your team prefers a consistent helper, create a small utility (in the target repo) and standardize on it.

```js
// utils/selectors.js
export function byTestIdAttr(attrName, value) {
  return `[data-${attrName}-test-id="${value}"]`;
}

export function bySectionTestId(value) {
  return `[data-section-test-id="${value}"]`;
}
```

Usage:

```js
import { bySectionTestId, byTestIdAttr } from '../utils/selectors.js';

this.heroSection = page.locator(bySectionTestId('index-hero-1'));
this.heroCta = page.locator(byTestIdAttr('hero-cta', 'index-hero-1-hero-cta-1'));
```

### TypeScript-ready guidance
Even if files are `.js` today, write code in a TS-friendly way:

- Avoid dynamic property creation on objects.
- Prefer small helper functions with clear inputs/outputs.
- When/if migrating to `.ts`, the POM classes should become typed, and fixtures (`baseURL`, test users) should be centralized.

## Selector naming convention (Shopify theme instrumentation)
Selectors must be **data attributes** with `test-id` and follow this naming convention (from your `QA Automation.pdf`):

### 1) Section selector
- **Attribute**: `data-section-test-id`
- **Value template**: `{{ template.name | append: '[section-name]' | append: '[section-index]' }}`
- **Example**: `data-section-test-id="index-product-list-3"`

### 2) Element selector
- **Attribute**: `data-[element-name]-test-id`
- **Value template**:
  `{{ template.name | append: '[section-name]' | append: '[section-index]' | append: '[element-name]' | append: '[element-index]' }}`
- **Example**: `data-atc-btn-test-id="index-product-list-3-atc-btn-3"`

#### Liquid instrumentation example (element + section)
The agent should add these attributes directly in the Shopify theme section templates, using `template.name` and stable section/element indices.

```liquid
{%- comment -%}
Example: in sections/product-list.liquid
Section name: product-list
Section index: 3
Element name: atc-btn
Element index: 3
{%- endcomment -%}

<section
  data-section-test-id="{{ template.name | append: 'product-list' | append: '3' }}"
>
  <button
    type="button"
    data-atc-btn-test-id="{{ template.name | append: 'product-list' | append: '3' | append: 'atc-btn' | append: '3' }}"
  >
    Add to cart
  </button>
</section>
```

### 3) Sub-element selector (parent/child)
- **Parent attribute**: `data-[element-name]-parent-test-id`
- **Child attribute**: `data-[element-name]-child-test-id`
- **Examples**:
  - `data-menu-links-lvl-1-test-id="index-mega-menu-1-menu-links-lvl-1-3"`
  - `data-menu-links-lvl-2-test-id="index-mega-menu-1-menu-links-lvl-2-3"`

### 4) Global page selectors
- `data-page-url-test-id="{{ shop.domain | append: request.path }}"`
- `data-page-title-test-id="{{ page_title }}"`

#### Global page selector example
This is best attached once in `layout/theme.liquid` (or the root wrapper).

```liquid
<body
  data-page-url-test-id="{{ shop.domain | append: request.path }}"
  data-page-title-test-id="{{ page_title }}"
>
```

### 5) Validation selectors
Attach validation elements to their parent element id:

- `data-[element-name]-success-test-id="...-success-[element-index]"`
- `data-[element-name]-error-test-id="...-error-[element-index]"`
- `data-[element-name]-toast-test-id="...-toast-[element-index]"`
- `data-[element-name]-alert-test-id="...-alert-[element-index]"`

### 6) Source / destination selectors (modal/popup)
- `data-[element-name]-source-test-id="...-source-[element-index]"`
- `data-[element-name]-destination-test-id="...-destination-[element-index]"`

## Required test coverage (Happy Flow scenarios)
The automation must implement **all** scenarios listed in `LBP - Test cases (Automation).pdf`:

### Login (3)
1. Verify navigation to login page via account link
2. Verify user can create account with valid credentials
3. Verify user can login with valid credentials

### Homepage (27)
1. Verify logo is displayed
2. Verify announcement bar navigation
3. Verify megamenu product navigation
4. Verify About Us navigation
5. Verify Know Your Ingredients navigation
6. Verify Beauty Archives navigation
7. Verify Contact Us navigation
8. Verify hero banner redirection
9. Verify collection tabs navigation
10. Verify product navigation from collection tab
11. Verify add to cart functionality from collection tab
12. Verify Shop by Concern section
13. Verify Discover Beauty Bill navigation
14. Verify In the Spotlight section and add to cart functionality
15. Verify What Sets Us Apart section
16. Verify Reels section display
17. Verify Customer Love section display
18. Verify Discover Our Story navigation
19. Verify Beauty Archives view all navigation
20. Verify Beauty Archives article navigation
21. Verify newsletter subscription
22. Verify footer product links
23. Verify footer concern links
24. Verify footer quick links
25. Verify footer legal links
26. Verify footer social media links
27. Verify caution notice display

### Product Listing Page / PLP (10)
1. Verify navigation from homepage to PLP
2. Verify applied filters display
3. Verify filtered products correctness
4. Verify clearing filters
5. Verify add to cart from PLP
6. Verify You May Also Like section
7. Verify Beauty Archives section
8. Verify View All redirection
9. Verify FAQs section
10. Verify Write to Us redirection

### Product Details Page / PDP (10)
1. Verify navigation from Search PLP to PDP
2. Verify PDP to PLP navigation links
3. Verify invalid pincode validation
4. Verify valid pincode check
5. Verify add to cart from PDP
6. Verify quantity increase
7. Verify quantity decrease
8. Verify reviews section display
9. Verify details section display
10. Verify You May Also Like section

### Cart (5)
1. Verify empty cart redirects to collections
2. Verify adding multiple products to cart
3. Verify total price calculation
4. Verify freebie product addition
5. Verify checkout navigation

## Subagent responsibilities (what your subagent must do)
When the subagent is added to a Shopify store project repo, it must do **both** of the following, without skipping any scenario.

### Responsibility 1: Generate all happy-flow test cases (HP, PLP, PDP, Cart)
The subagent must:

- Create `pages/` once (if missing)
- Create `tests/` once (if missing)
- Create/overwrite and fully implement:
  - `pages/homepage.js`, `pages/plp.js`, `pages/pdp.js`, `pages/cart.js`
  - `tests/homepage.spec.js`, `tests/plp.spec.js`, `tests/pdp.spec.js`, `tests/cart.spec.js`
- Implement every scenario listed in “Required test coverage” above, mapping each scenario to:
  - one or more POM locators in the relevant `pages/*.js`
  - one Playwright `test(...)` (or a small group of tests) in the relevant `tests/*.spec.js`

### Responsibility 2: Instrument the Shopify theme with `data-*-test-id` selectors
To avoid flaky tests and missing elements, the subagent must:

1. Read the theme templates JSON to determine which sections are actually used:
   - `templates/index.json`
   - `templates/collection.json`
   - `templates/product.json`
   - `templates/cart.json` (or cart drawer equivalents, depending on the theme)
2. For every section used in those templates, locate the corresponding section files (commonly in `sections/`) and add the correct `data-*-test-id` attributes to the elements required by the test cases.
3. Ensure selectors are **only data attributes** (no class-based selectors) and follow the naming convention in “Selector naming convention”.

#### How to detect used sections from templates (example)
In Shopify JSON templates, the “used sections” are typically in the top-level `sections` object. The agent should read these files and gather the unique `type` values.

```js
// Pseudocode / example
import fs from 'node:fs';
import path from 'node:path';

function collectSectionTypes(templateJson) {
  const sections = templateJson?.sections ?? {};
  return Object.values(sections)
    .map((s) => s?.type)
    .filter(Boolean);
}

const templates = ['index', 'collection', 'product', 'cart'];
const allTypes = new Set();

for (const name of templates) {
  const p = path.join('templates', `${name}.json`);
  if (!fs.existsSync(p)) continue;
  const json = JSON.parse(fs.readFileSync(p, 'utf8'));
  collectSectionTypes(json).forEach((t) => allTypes.add(t));
}

console.log('Section types to instrument:', [...allTypes]);
```

#### Notes on cart behavior
Some Shopify themes use a **cart drawer** rather than a dedicated cart page. The agent must detect which is present and instrument/select accordingly.

## Operational guidance (for agent execution)
- Prefer deterministic navigation:
  - Use stable links/buttons with `data-*-test-id`.
  - Assert URL and key UI elements after navigation.
- Centralize “test data”:
  - If credentials are needed, support environment variables or a config file pattern in the target repo.
- Keep tests readable and page-focused:
  - Homepage tests in `homepage.spec.js`, etc.

### Environment + baseURL examples
In a Shopify project repo, tests should not hardcode domains. Prefer Playwright’s `baseURL` and environment variables.

```js
// playwright.config.js (example pattern for a target Shopify repo)
use: {
  baseURL: process.env.BASE_URL || 'https://your-store.myshopify.com',
}
```

```bash
# local run
BASE_URL="https://lovebeautyandplanet.in" npx playwright test
```

