import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactLink = page.getByRole('link', { name: /contact/i });
    this.searchBox = page.getByPlaceholder(/search/i);
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Practice Software Testing/i);
  }

  async openContact() {
    await this.contactLink.click();
  }

  async openProduct(productName: string) {
    // Use search to navigate to product details if available; otherwise click from listing
    const hasSearch = await this.searchBox.isVisible().catch(() => false);
    if (hasSearch) {
      await this.searchBox.fill(productName);
      await this.page.keyboard.press('Enter');
      await this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first().click();
    } else {
      await this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first().click();
    }
  }
}
