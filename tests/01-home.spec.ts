import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { homePageData } from '../testdata/homedata.data';
import { ReservePage } from '../pages/reserve';

let homePage: HomePage;
let reservePage: ReservePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    reservePage = new ReservePage(page);
    await homePage.open();
});

test('Verify Home Page loads successfully', async ({ page }) => {
await expect(page).toHaveTitle(/BlazeDemo/);
});

test('Verify Home Page contents are visisble', async ({ page }) => {
    await expect(homePage.departureCity).toBeVisible();
    await expect(homePage.destinationCity).toBeVisible();
    await expect(homePage.findFlightsButton).toBeVisible();
});

test('verify destination of the week page is loading properly', async ({ page }) => {
    await page.getByRole('link', { name: 'destination of the week! The Beach!' }).click();
    await expect(page.getByText('Destination of the week: Hawaii !')
    ).toBeVisible();
});

test('Verify reserve page is loading the cities selected', async ({ page }) => {
    await homePage.searchFlights(homePageData.departureCity,homePageData.destinationCity);
    await reservePage.expectCityNamesToBeVisible();
});
