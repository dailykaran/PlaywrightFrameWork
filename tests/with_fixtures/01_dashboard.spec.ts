import { test} from '../../customFixtures/salesforceFixtures'
import { Page, expect} from '@playwright/test'
import{ dashboradPage } from '../../pages/dashboard'
import { Homepage } from '../../pages/HomePage'
import { readJsonfile } from '../../dataUtilities/jsonUtils'
import {FakerData } from '../../utils/faker';

test.use({storageState: "AuthStorage/sales_login_storage.json"})
/* test(`Create a new dashboard`, async ({page, context})=>{
    
    const homePage = new Homepage(page, context)
    await homePage.navigateToHome();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*home/);
    await homePage.clickAppLauncher();
    await homePage.clickViewAll();

    const dashboard = new dashboradPage(page, context);
    dashboard.serachDashboard('dashboards');
    dashboard.clickDashboardLink();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*Dashboard/);

    await dashboard.openNewDashboard();
    await page.waitForLoadState('networkidle');
    await dashboard.dashboardDiscription();
    await dashboard.dashboardName();
    await dashboard.newDashBoardSubmit();

    await page.waitForLoadState('networkidle');
    await dashboard.dashboardDone();
}) */
let jsonData: any[];
test.describe('Salesforce for creating a new dasboard', ()=>{

    test.beforeAll( async()=>{
        const testInfo = test.info();

        testInfo.annotations.push(
            { type: 'author', description: 'TestUser'},
            {type: 'test-case', description: 'creating a new dashboard'}
        )
        jsonData = await readJsonfile('./data/dashboard.json');
    })

    test(`Create a new dashboard`, async ({home, dashboard}, testinfo)=>{

        testinfo.annotations.push({
            type: 'test-start',
            description: 'Starting saleforce dashboard test',
        })
    
        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        /* for(const dataDash of jsonData) {
            dashboard.serachDashboard(dataDash.searchDashboardData);
            dashboard.clickDashboardLink();
        
            await dashboard.openNewDashboard();
            await dashboard.dashboardDiscription(dataDash.dashboardDiscriptionData);
            await dashboard.dashboardName(dataDash.dashboardNameData);
            await dashboard.newDashBoardSubmit();
            await dashboard.dashboardClick();
            await dashboard.dashboardEdit('Rename TestCloud1');
            await dashboard.dashboardSave();
            await dashboard.assertToastMessageBar('Dashboard');

        } */

            dashboard.serachDashboard("marketing");
            dashboard.clickDashboardLink();
        
            await dashboard.openNewDashboard();
            await dashboard.dashboardDiscription(FakerData.getDescription());
            await dashboard.dashboardName(FakerData.getPersonFirstName());
            await dashboard.newDashBoardSubmit();
            await dashboard.dashboardClick();
            await dashboard.dashboardEdit(FakerData.getPersonFirstName());
            await dashboard.dashboardSave();
            await dashboard.assertToastMessageBar('Dashboard');
    })
})


