import { Page, Locator, expect } from '@playwright/test';

export class ConfirmationPage {

    readonly page: Page;
    readonly confirmationId: Locator;
    readonly status: Locator;
    readonly amount: Locator;

    constructor(page: Page) {
        this.page = page;

        this.confirmationId = page.locator('td').filter({ hasText: 'Id' }).locator('xpath=following-sibling::td');
        this.status = page.locator('td').filter({ hasText: 'Status' }).locator('xpath=following-sibling::td');
        this.amount = page.locator('td').filter({ hasText: 'Amount' }).locator('xpath=following-sibling::td');
    }


    async verifyConfirmationPage() {
    await expect(this.page).toHaveURL('/confirmation.php');
}

    async verifyStatus() {
        await expect(this.status).toContainText('PendingCapture');
    }

    async verifyConfirmationIdExists() {
        await expect(this.confirmationId).not.toBeEmpty();
    }

    async verifyAmountExists() {
        await expect(this.amount).not.toBeEmpty();
    }
}