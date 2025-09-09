import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly headerCart: Locator;
  readonly anyCartControl: Locator;
  readonly qtyField: Locator;
  readonly unitPriceCell: Locator;
  readonly lineTotalCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerCart = page.locator('a[href*="cart"], a[href*="basket"], a[href*="checkout"], [aria-label*="cart" i], [data-test*="cart" i]').first();
    this.anyCartControl = page.getByRole('link', { name: /cart|basket|checkout/i }).or(page.getByRole('button', { name: /cart|basket|checkout/i }));
    this.qtyField = page.locator('input[type="number"], input[name*="quantity" i], select[name*="quantity" i], select[id*="quantity" i]').first();
    this.unitPriceCell = page.locator('td:has-text("$"); td:has-text("€")').first();
    this.lineTotalCell = page.locator('td:has-text("$"); td:has-text("€")').last();
  }

  async open() {
    // Try clicking a visible cart/checkout control if present
    if (await this.anyCartControl.count()) {
      await this.anyCartControl.first().click();
    } else if (await this.headerCart.count()) {
      await this.headerCart.click();
    } else {
      // Fallback: navigate directly
      await this.page.goto('/cart');
    }

    // If no quantity field yet, try explicit routes
    if (!(await this.qtyField.isVisible().catch(() => false))) {
      await this.page.goto('/cart');
    }
    if (!(await this.qtyField.isVisible().catch(() => false))) {
      await this.page.goto('/checkout');
    }

    await expect(this.qtyField).toBeVisible({ timeout: 10000 });
  }

  async getPrices() {
    const unitText = await this.unitPriceCell.innerText().catch(async () => await this.page.locator('[data-test*=unit-price]').innerText());
    const totalText = await this.lineTotalCell.innerText().catch(async () => await this.page.locator('[data-test*=total]').innerText());
    const toNum = (s:string) => Number((s.match(/\d+[\.,]?\d*/)||['0'])[0].replace(',', '.'));
    return { unit: toNum(unitText), total: toNum(totalText) };
  }

  async setQuantity(qty: number) {
    // Works if it's an <input> or a <select>
    const tag = await this.qtyField.evaluate((el) => el.tagName.toLowerCase());
    if (tag === 'select') {
      await this.qtyField.selectOption(String(qty));
    } else {
      await this.qtyField.fill(String(qty));
      await this.qtyField.blur();
    }
    await this.page.waitForTimeout(800);
  }

  async expectQuantity(qty: number) {
    const tag = await this.qtyField.evaluate((el) => el.tagName.toLowerCase());
    if (tag === 'select') {
      await expect(this.qtyField).toHaveValue(String(qty));
    } else {
      await expect(this.qtyField).toHaveValue(String(qty));
    }
  }
}
