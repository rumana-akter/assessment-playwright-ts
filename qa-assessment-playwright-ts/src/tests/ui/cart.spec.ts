import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('Add "Combination Pliers" and update quantity to 3', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.openProduct('Combination Pliers');

  const product = new ProductPage(page);
  await product.addToCart();

  const cart = new CartPage(page);
  await cart.open();

  // Verify product is present
  await expect(page.getByText(/Combination\s+Pliers/i)).toBeVisible();

  // Update quantity to 3
  await cart.setQuantity(3);
  await cart.expectQuantity(3);
});
