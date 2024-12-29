import { test, } from '../../../customFixtures/salesforceFixtures'
import {ConsoleMessage, expect, Page} from '@playwright/test'

test.describe('Salesforce for creating a new dasboard', ()=>{
    test.beforeAll( async()=>{
        const testInfo = test.info();
        testInfo.annotations.push(
            //{type: test.info().testId},
            {type: "Test suite title",  description: test.info().title},
        )
    })

    test.afterEach( async()=>{
        const testInfo = test.info();
        testInfo.annotations.push(
            {type:"Testcase Duration", description: `${testInfo.duration.valueOf()}`}
        )
    })
    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`Navigate to Digital home page`, async ({home, page, digitalexperiences}, testinfo)=>{

/*         page.on('console', (msg) => {
            if (msg.text().includes('Blocked'))
                console.log(`Blocked console lines: "${msg.text()}"`);
                expect(msg.text()).not.toContain('Blocked')
        }) */

        await home.navigateToHome();
        await page.waitForLoadState('networkidle');
        await home.digitalClickAppLauncher();
        await home.digitalClickViewAll();
        
        await digitalexperiences.navigateToDigitalExperience();
        await digitalexperiences.welcomeDigitalDialogClose();

    })
})
