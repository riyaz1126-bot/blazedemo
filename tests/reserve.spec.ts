import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { homePageData } from '../testdata/homedata.data';
import { ReservePage } from '../pages/reserve';
import { PurchasePage } from '../pages/purchase';

let homePage: HomePage;
let reservePage: ReservePage;
let purchasePage: PurchasePage

test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    reservePage = new ReservePage(page);
    purchasePage = new PurchasePage(page);
    await homePage.open();
    await homePage.searchFlights(homePageData.departureCity, homePageData.destinationCity);
    await expect(page).toHaveURL('/reserve.php');
});

test('Verify contents in the reserve page is loading properly', async () => {

    await reservePage.verifyReservePageLoaded();

});

test('Verify whether able to select a flight', async () => {

    await reservePage.chooseFlight();
    await purchasePage.verifyPurchasePageLoaded();

});


