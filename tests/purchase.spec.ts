import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home';
import { homePageData } from '../testdata/homedata.data';
import { purchasedata } from '../testdata/purchasedata.data';
import { ReservePage } from '../pages/reserve';
import { PurchasePage } from '../pages/purchase';
import { ConfirmationPage } from '../pages/confirmation';

let homePage: HomePage;
let reservePage: ReservePage;
let purchasePage: PurchasePage;
let confirmationPage: ConfirmationPage;
test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    reservePage = new ReservePage(page)
    purchasePage = new PurchasePage(page)
    confirmationPage = new ConfirmationPage(page)
    await homePage.open();
    await homePage.searchFlights(homePageData.departureCity, homePageData.destinationCity);
    await expect(page).toHaveURL('/reserve.php');
    await page.pause();
    await reservePage.chooseFlight();

});

test('Verify whether able to purchase flight', async ({ page }) => {

await purchasePage.Name.fill (purchasedata.Name);
await purchasePage.Address.fill (purchasedata.Address);
await purchasePage.City.fill(purchasedata.City);
await purchasePage.state.fill(purchasedata.State);
await purchasePage.zipcode.fill(purchasedata.Zipcode);
await purchasePage.creditcardtype.selectOption(purchasedata.Cardtype);
await purchasePage.creditcard.fill(purchasedata.Creditcardnumber);
await purchasePage.month.fill(purchasedata.Month);
await purchasePage.year.fill(purchasedata.Year);
const confirmationPage = await purchasePage.purchaseFlight();
await confirmationPage.verifyConfirmationPage();
});