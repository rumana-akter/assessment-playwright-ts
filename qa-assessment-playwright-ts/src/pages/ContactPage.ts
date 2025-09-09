import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly emailInput: Locator;
  readonly subjectSelect: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.subjectSelect = page.locator('select#subject,[data-test="subject"]');
    this.messageInput = page.locator('textarea,[data-test="message"]').first();
    this.submitBtn = page.getByRole('button', { name: /submit|send/i });
    this.successAlert = page.locator('.alert-success, .toast, .alert').or(page.getByText(/(thank you|thanks|success|message sent)/i));
  }

  async expectValidationErrors() {
    const anyError = this.page.getByText(/required|please enter|invalid|must be/i).first();
    await expect(anyError).toBeVisible();
  }

  async submitBlankAndAssertValidation() {
    await this.submitBtn.click();
    await this.expectValidationErrors();
  }

  async expectSuccess() {
    await expect(this.successAlert).toBeVisible();
  }
}
