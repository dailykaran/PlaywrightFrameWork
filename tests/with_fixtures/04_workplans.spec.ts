import { test} from '../../customFixtures/salesforceFixtures'
import { expect } from '@playwright/test'
import { Homepage } from '../../pages/HomePage'
import { FakerData } from '../../utils/faker';

test.describe('Salesforce for creating a workplans', ()=>{

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`add a new workplan, Edit the name, delete the plan`, async({home, page, workplans})=> {

        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        await page.waitForLoadState('networkidle')
        await home.handleSpinnerOnHomePage();

        await home.serachTask("work plans");
        await workplans.getByRoleLink("Work Plans");
        await page.waitForLoadState('networkidle');

        await workplans.getByRoleButton("New");

        await page.waitForTimeout(1000)
        await workplans.getByRoleTextbox("Name *", "TestUser53");
        await page.waitForLoadState('load')
        await workplans.getByRoleTextbox("Description", "I am adding a new user");
        
        await workplans.getByRoleTextbox("Execution Order", "45234");
        await page.waitForLoadState('load')
        await workplans.getByRoleCombobox("Parent Record *");

        await page.waitForLoadState('load')
        await workplans.getByRoleParentRecord();
        await workplans.getbyroleTitleText("Save"); //

        await home.assertCommonToastMessage('created.no');
        
        await page.waitForLoadState('networkidle');
        await workplans.getByRoleGroupFilterButton('Name', 'Information', 'Edit Name');
        
        //Edit the name box
        await workplans.getByRoleTextboxClear("Name *");
        await workplans.getByRoleTextbox("Name *", "NumberTestUser");
        await workplans.saveEditedWorkName("Save");
        
        //delete a plan
        await workplans.getByRoleButton('Show more actions');
        await workplans.getByRoleMenuItem('Delete');
        await workplans.getByRoleDialog('Delete Work Plan');
        await workplans.getByRoleButton('Delete');

        await page.waitForLoadState('networkidle');
        await home.assertCommonToastMessage('deleted.');
        
    })

})