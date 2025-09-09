import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  }

  async addToCart() {
    await this.addToCartBtn.click();
    // Some sites show a mini cart; ensure cart increased
    const toast = this.page.getByText(/added to cart|successfully added/i).first();
    if (await toast.count()) {
      await expect(toast).toBeVisible();
    }
  }
}
