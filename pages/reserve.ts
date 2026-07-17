import { Page, Locator, expect } from '@playwright/test';
import { PurchasePage } from './purchase';
import { homePageData } from '../testdata/homedata.data';
export class ReservePage {

    readonly page: Page;
    readonly flightTable: Locator;
    readonly chooseFlightButtons: Locator;
    readonly cityNameHeader: Locator;  
    constructor(page: Page) {
        this.page = page;

        this.flightTable = page.locator('table');
        this.chooseFlightButtons = page.locator('input[type="submit"]');
        this.cityNameHeader = this.cityNameHeader = page.getByRole('heading', {
  name: `Flights from ${homePageData.departureCity} to ${homePageData.destinationCity}:`
});
    }

    async verifyReservePageLoaded() {
        await expect(this.flightTable).toBeVisible();
    }

    async chooseFlight(rowIndex: number = 0): Promise<PurchasePage> {
        await Promise.all([
            this.page.waitForURL(/purchase/i),
            this.chooseFlightButtons.nth(rowIndex).click(),
        ]);

        return new PurchasePage(this.page);
    }
 async expectCityNamesToBeVisible() {
    await expect(this.cityNameHeader).toBeVisible();
}
}