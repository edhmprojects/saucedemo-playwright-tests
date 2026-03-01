import { test, expect } from '@playwright/test';

import {
  login,
  addItemFromDetails,
  addItemFromInventory,
  startCheckout,
  fillCheckoutForm,
  finishCheckout
} from '../helpers/saucedemo-helpers.js';

// Test 1: assert user can see the login page
test('user can see the login page', async ({ page }) => {
    await page.goto('https://saucedemo.com/');

    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();
});

// Test 2: assert user can log in with valid credentials
test('user can log in with valid credentials', async ({ page }) => {
    await login(page);
    await expect(page).toHaveURL(/inventory/);
});

// Test 3: asserting inventory page shows products heading
test('inventory page shows products heading', async ({ page }) => {
    await login(page);

    const title = page.locator('.title');
    await expect(title).toHaveText(/products/i);
});

// Test 4: asserting user can open a product details page
test('user can open a product details page', async ({ page }) => {
    await login(page);
    
    await page.locator('[data-test="item-4-title-link"]').click();
});

// Test 5: asserting product details page
test('product details page shows product title', async ({ page }) => {
    await login(page);

    await page.locator('[data-test="item-4-title-link"]').click();

    // assert product details page shows correct title
    const backpackTitle = page.locator('.inventory_details_name');
    await expect(backpackTitle).toHaveText(/sauce labs backpack/i);
});

// Test 6: User can add a product to the cart and see it in the cart
test('user can add product to cart and see product in cart', async ({ page }) => {
    await login(page);

    await addItemFromDetails(page, 'Sauce Labs Backpack');

    // assert product details page shows correct title
    const backpackTitle = page.locator('.inventory_details_name');
    await expect(backpackTitle).toHaveText(/sauce labs backpack/i);

    // assert cart badge shows 1 item
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // open the cart page
    await page.locator('[data-test=shopping-cart-link]').click();
    await page.locator('.cart_contents_container').waitFor();

    // assert backpack appears in the cart
    await expect(page.locator('.inventory_item_name')).toHaveText(/sauce labs backpack/i);

    // assert item price in cart
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
});

// Test 7: user can remove item from cart
test('user can remove an item from cart', async ({ page }) => {
    await login(page);
    await addItemFromDetails(page, 'Sauce Labs Backpack');

    // open the cart page
    await page.locator('[data-test=shopping-cart-link]').click();
    await page.locator('.cart_contents_container').waitFor();

    // remove item from cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // assert item has been removed from cart
    await expect(page.locator('text=Sauce Labs Backpack')).toHaveCount(0);
});

// Test 8: assert cart is empty
test('assert shopping cart is empty', async ({ page }) => {
    await login(page);
    await addItemFromDetails(page, 'Sauce Labs Backpack');

    // open the cart page
    await page.locator('[data-test=shopping-cart-link]').click();
    await page.locator('.cart_contents_container').waitFor();

    // remove item from cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // assert items in cart is '0'
    await expect(page.locator('.cart_item')).toHaveCount(0);
});

// Test 9: User can add two items to cart and see both items in the cart
test('user can add two items to cart and see both items in cart', async ({ page }) => {
    await login(page);

    await addItemFromInventory(page, 'add-to-cart-sauce-labs-fleece-jacket');
    await addItemFromInventory(page, 'add-to-cart-sauce-labs-bolt-t-shirt');

    // assert cart badge = 2
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // open cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('.cart_contents_container').waitFor();

    // assert both items appear in cart
    await expect(page.locator('.inventory_item_name')).toContainText([
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt'
    ]);

    // assert both item prices appear in cart
    await expect(page.locator('.inventory_item_price')).toContainText([
        '$49.99',
        '$15.99'
    ]);
});

// Test 10: assert cart sub-total
test('user can see subtotal of items in cart', async ({ page }) => {
    await login(page);

    await addItemFromInventory(page, 'add-to-cart-sauce-labs-fleece-jacket');
    await addItemFromInventory(page, 'add-to-cart-sauce-labs-bolt-t-shirt');

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // start checkout (opens cart + clicks checkout)
    await startCheckout(page);

    await fillCheckoutForm(page, 'E', 'C', 'DH1');

    await expect(page.locator('.summary_subtotal_label')).toContainText('$65.98');
});

// Test 11: user completes checkout process and sees order confirmation
test('user completes checkout and sees confirmation message', async ({ page }) => {
    await login(page);

    await addItemFromInventory(page, 'add-to-cart-sauce-labs-fleece-jacket');
    await addItemFromInventory(page, 'add-to-cart-sauce-labs-bolt-t-shirt');

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await startCheckout(page);

    await fillCheckoutForm(page, 'E', 'C', 'DH1');

    await finishCheckout(page);

    await expect(page.locator('[data-test="complete-header"]')).toHaveText(/thank you for your order/i);
});
