import {expect} from '@playwright/test'
import { test } from '../customFixtures/salesforceFixtures'
//import{ LoginPage } from '../pages/LoginPage'

/* test(`Verify the login credentials`, async ({page, context})=>{
    const login = new LoginPage(page, context);
    await login.loginDo('dinakaran@company.sandbox', 'Testing@123');
}) */

test(`Verify the login credentials`, async ({login})=>{

    const title = await login.page.title();
    console.log(`Page title after login ${title}`);

    const url = await login.page.url();
    console.log(`URL after login: {url}`);
    expect(url).toContain('lightning/setup/SetupOneHome/home');

})
