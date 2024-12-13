import {expect} from '@playwright/test'
import { test as teardown } from '../customFixtures/salesforceFixtures'


teardown(`Verify the logout `, async ({logout})=>{

    const title = await logout.page.title();
    console.log(`Page title after logout ${title}`);

    const url = await logout.page.url();
    console.log(`URL after login: ${url}`);
    expect(url).toContain('ecgroupinternational');

})