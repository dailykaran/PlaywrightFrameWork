import { test} from '../../customFixtures/salesforceFixtures'
import { Page, expect } from '@playwright/test'
import { Homepage } from '../../pages/HomePage'
import { FakerData } from '../../utils/faker';

test.describe('Salesforce for creating a workplans', ()=>{

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`add workplans and TC created by `, async({home, page, workplans})=> {

        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        await page.waitForLoadState('networkidle')
        await home.serachTask("work plans");
        await workplans.getByRoleLink("Work Plans");
        await page.waitForLoadState('networkidle');
        
        await page.waitForTimeout(1000);
        await workplans.getByRoleButton("New");

        await page.waitForTimeout(2000);
    })

})