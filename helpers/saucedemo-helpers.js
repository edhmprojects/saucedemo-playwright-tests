/**
 * Logs in using standard user credentials.
 * Navigates to the login page, fills in username and password, and submits the form.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 */
export async function login(page) {
  await page.goto('https://saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
}

/**
 * Opens a product details page and adds the item to the cart.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string} itemName - Visible name of the product to open.
 */
export async function addItemFromDetails(page, itemName) {
  await page.locator('.inventory_list').waitFor();
  await page.getByText(itemName, { exact: false }).click();
  await page.locator('[data-test="add-to-cart"]').click();
}

/**
 * Adds an item to the cart directly from the inventory page.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string} dataTestId - The data-test attribute for the add-to-cart button.
 */
export async function addItemFromInventory(page, dataTestId) {
  await page.locator(`[data-test="${dataTestId}"]`).click();
}

/**
 * Opens the shopping cart and begins the checkout process.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 */
export async function startCheckout(page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
}

/**
 * Fills out the checkout form with user details.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 * @param {string} first - First name.
 * @param {string} last - Last name.
 * @param {string} postcode - Postal or ZIP code.
 */
export async function fillCheckoutForm(page, first, last, postcode) {
  await page.getByPlaceholder('First Name').fill(first);
  await page.getByPlaceholder('Last Name').fill(last);
  await page.getByPlaceholder('Zip/Postal Code').fill(postcode);
  await page.getByRole('button', { name: 'Continue' }).click();
}

/**
 * Completes the checkout process by clicking the Finish button.
 * @param {import('@playwright/test').Page} page - Playwright page object.
 */
export async function finishCheckout(page) {
  await page.getByRole('button', { name: 'Finish' }).click();
}
