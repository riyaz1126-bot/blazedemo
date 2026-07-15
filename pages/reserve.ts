import { Page, Locator, expect } from '@playwright/test';
import { PurchasePage } from './purchase';

export class ReservePage {

    readonly page: Page;
    readonly flightTable: Locator;
    readonly chooseFlightButtons: Locator;

    constructor(page: Page) {
        this.page = page;

        this.flightTable = page.locator('table');
        this.chooseFlightButtons = page.locator('input[type="submit"]'); // "Choose This Flight" buttons
    }

    async verifyReservePageLoaded() {
        await expect(this.flightTable).toBeVisible();
    }

    /**
     * Selects a flight by row index and waits for navigation
     * to the Purchase page.
     */
    async chooseFlight(rowIndex: number = 0): Promise<PurchasePage> {
        await Promise.all([
            this.page.waitForURL(/purchase/i),
            this.chooseFlightButtons.nth(rowIndex).click(),
        ]);

        return new PurchasePage(this.page);
    }
}