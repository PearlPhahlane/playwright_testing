const { test, expect } = require ('@playwright/test');
const { LoginPage } = require ('../pages/LoginPage');

test.describe('Login tests', () => {
    test('user can login with valid credentials', async ( {page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);
    });

    test('user cannot login with invalid credentials', async ( { page}) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();
        await loginPage.login('wrong_user', 'wrong password');

        await expect(loginPage.errorMessage).toBeVisible();
    });

});

/*test('user can login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); //go to login page


    await page.locator('[data-test="username"]').fill('standard_user') //enter username
    await page.locator('[data-test="password"]').fill('secret_sauce'); //enter password
    await page.locator('[data-test="login-button"]').click(); //click login button

    await expect(page).toHaveURL(/inventory/); //verify user lands on inventory page
});

test ('user cannot login with invalid credentials', async ( { page } ) =>  {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('wrong_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
})*/
