import { Page, Locator } from '@playwright/test';
import { ReservePage } from './reserve';
export class HomePage {

    readonly page: Page;

    readonly departureCity: Locator;
    readonly destinationCity: Locator;
    readonly findFlightsButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.departureCity = page.locator('select[name="fromPort"]');
        this.destinationCity = page.locator('select[name="toPort"]');
        this.findFlightsButton = page.locator('input.btn.btn-primary');
    }

    async open() {
        await this.page.goto('/');
    }

    async selectDepartureCity(city: string) {
        await this.departureCity.selectOption(city);
    }

    async selectDestinationCity(city: string) {
        await this.destinationCity.selectOption(city);
    }

async searchFlights(
        departureCity: string,
        destinationCity: string
    ): Promise<void> {

        await this.selectDepartureCity(departureCity);
        await this.selectDestinationCity(destinationCity);
        await this.findFlightsButton.click();
    }
}