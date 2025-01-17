import { test} from '../../customFixtures/salesforceFixtures'
import { Page, expect} from '@playwright/test'
import { readJsonfile } from '../../dataUtilities/jsonUtils'
import {FakerData } from '../../utils/faker';
const dashboardData = require('../../data/dashboard.json')


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
    
        await dashboard.serachDashboard(dashboardData.navigateToTabTask);
        await dashboard.clickAppLink(dashboardData.navigateToTabTask);
        //await dashboard.navigateToTabTask("Dashboard");
        await dashboard.assertNewDashboardPage(dashboardData.navigateToTabTask);

        await dashboard.openNewDashboard(dashboardData.openNewDashboard);
        await dashboard.assertNewDashboardDialog();
        await dashboard.dashboardDiscription(FakerData.getDescription());
        await dashboard.dashboardName(FakerData.getPersonFirstName());
        await dashboard.newDashBoardSubmit();
        await dashboard.dashboardClick();

        await dashboard.dashboardDelayedEdit(FakerData.getPersonFirstName());
        await dashboard.dashboardSave();
        await dashboard.assertToastMessageBar(dashboardData.navigateToTabTask); 
    })
})


