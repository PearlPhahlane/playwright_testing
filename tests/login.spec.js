const { test, expect } = require ('@playwright/test');

test ('homepage can load', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/i);
});
