const { test, expect } = require ('@playwright/test');
const { LoginPage } = require ('../pages/LoginPage');
const { DashboardPage } = require ('../pages/DashboardPage');
const { validUser, invalidUser } = require('../utils/testData');

test.describe('Login tests', () => {
    test('user can login with valid credentials', async ( {page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);

        await expect(page).toHaveURL(/inventory/);
    });

   test('user cannot login with invalid credentials', async ( { page}) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();
        await loginPage.login(invalidUser.username, invalidUser.password);

        await expect(loginPage.errorMessage).toBeVisible();        
    });

    //test if user can reach the dashboard page after login
    test('logged in user sees dashboard page', async ( { page } ) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await dashboardPage.verifyLoaded();

        await expect(page).toHaveURL(/inventory/);
    });

    //test to see if user can logout
    test('logged in user can logout', async ( { page } ) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password);
        await dashboardPage.verifyLoaded();
        await dashboardPage.logout();

        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })


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
