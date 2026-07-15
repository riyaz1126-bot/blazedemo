import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { homePageData } from '../testdata/homedata.data';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
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
    await expect(page.getByRole('link', { name: 'destination of the week! The Beach!' })).toBeVisible();
});


test('Verify reserve page is loading the cities selected', async ({ page }) => {
    
    await homePage.searchFlights(homePageData.departureCity, homePageData.destinationCity);
    await expect(page).toHaveURL('/reserve.php');
    const headingText = `Flights from ${homePageData.departureCity} to ${homePageData.destinationCity}:`;
    await expect(page.getByText(headingText)).toBeVisible();
});
