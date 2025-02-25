import {test, expect} from '@playwright/test'
import { Homepage } from "../../pages/HomePage"


test.use({storageState: "AuthStorage/sales_login_storage.json"})
test('Verify the visible element in home page', async({page, context}, testInfo)=>{

    const homePage = new Homepage(page, context)
    await homePage.navigateToHome();
    //await homePage.loadApp("https://ecgroupinternational-dev-ed.develop.lightning.force.com/lightning/page/home");
    await expect(page).toHaveURL(/.*home/);

    //Matching inside a locator
    await page.waitForLoadState('load');
    await homePage.clickAppLauncher();
    await homePage.clickViewAll();
    await homePage.waitForAppLancherDialog();
    await homePage.clickSearchApps('Marketing');
    await homePage.clickApp();
    await expect(page.locator('one-appnav h1')).toContainText('Marketing');
})

