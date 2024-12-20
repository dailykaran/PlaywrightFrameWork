import { test} from '../../customFixtures/salesforceFixtures'
import { Page, expect} from '@playwright/test'
import{ dashboradPage } from '../../pages/dashboard'
import { Homepage } from '../../pages/HomePage'
import { readJsonfile } from '../../dataUtilities/jsonUtils'
import {FakerData } from '../../utils/faker';


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
    test(`Create a new dashboard`, async ({home, dashboard}, testinfo)=>{

        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        await dashboard.serachDashboard("dashboards");
        await dashboard.clickDashboardLink();
        
        await dashboard.openNewDashboard();
        await dashboard.dashboardDiscription(FakerData.getDescription());
        await dashboard.dashboardName(FakerData.getPersonFirstName());
        await dashboard.newDashBoardSubmit();
        await dashboard.dashboardClick();

        await dashboard.dashboardDelayedEdit(FakerData.getPersonFirstName());
        await dashboard.dashboardSave();
        await dashboard.assertToastMessageBar('Dashboards');
    })
})


