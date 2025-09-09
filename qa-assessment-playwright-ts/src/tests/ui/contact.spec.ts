import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactPage } from '../../pages/ContactPage';

test('Contact form: validation on empty submit, then successful submission', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.openContact();

  const contact = new ContactPage(page);

  // Submit blank -> expect validation
  await contact.submitBlankAndAssertValidation();

  // Fill required fields
  await contact.firstName.fill('Rumana');
  await contact.lastName.fill('Akter');
  await contact.emailInput.fill('rumana.qa@example.com');

  // Pick first valid subject option
  await contact.subjectSelect.selectOption({ index: 1 });

  await contact.messageInput.fill('This is a UI test submission.');
  await contact.submitBtn.click();

  // Verify success message
  await contact.expectSuccess();
});
