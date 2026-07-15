import { Page, Locator, expect } from '@playwright/test';
import { ConfirmationPage } from './confirmation';

export class PurchasePage {

    readonly page: Page;
    readonly purchaseForm: Locator;
    readonly Name: Locator;
    readonly Address: Locator;
    readonly City: Locator;
    readonly state: Locator;
    readonly zipcode: Locator;
    readonly creditcardtype: Locator;
    readonly creditcard: Locator;
    readonly month: Locator;
    readonly year: Locator;
    readonly purchaseFlightButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.purchaseForm = page.getByRole('heading', { name: 'Your flight from TLV to SFO has been reserved.' }); // adjust selector to match actual page
        this.Name = page.getByRole('textbox', { name: 'Name', exact: true });
        this.Address = page.getByRole('textbox', { name: 'Address' })
        this.City =page.getByRole('textbox', { name: 'City' })
        this.state = page.getByRole('textbox', { name: 'State' })
        this.zipcode = page.getByRole('textbox', { name: 'Zip Code' })
        this.creditcardtype = page.getByRole('combobox')
        this.creditcard = page.getByRole('textbox', { name: 'Credit Card Number' })
        this.month = page.getByRole('textbox', { name: 'Month' })
        this.year = page.getByRole('textbox', { name: 'Year' })
        this.purchaseFlightButton = page.locator('input.btn.btn-primary')
    }

    async verifyPurchasePageLoaded() {
        await expect(this.purchaseForm).toBeVisible();
    }

async purchaseFlight() {
    await this.purchaseFlightButton.click();
    return new ConfirmationPage(this.page);
}
}