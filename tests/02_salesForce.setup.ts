import {expect} from '@playwright/test'
import { test as setup } from '../customFixtures/salesforceFixtures'


setup(`Verify the login credentials`, async ({login})=>{

    const title = await login.page.title();
    console.log(`Page title after login ${title}`);

    const url = await login.page.url();
    console.log(`URL after login: ${url}`);
    expect(url).toContain('lightning/setup/SetupOneHome/home');

})