class CheckoutPage {
    constructor (page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.postalCodeInput = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.finishButton = page.locator('[data-test="finish"]')


    }
    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async continueToOverview() {
        await this.continueButton.click();

    }

    async verifyOverviewPage() {
        await this.page.waitForURL(/checkout-step-two/);
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

}

module.exports = { CheckoutPage };