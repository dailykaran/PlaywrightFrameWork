import { test} from '../../customFixtures/salesforceFixtures'
import { expect } from '@playwright/test'
import { FakerData } from '../../utils/faker';
const content = JSON.parse(JSON.stringify(require('../../data/workplan.json')))

test.describe('Salesforce for creating a workplans', ()=>{

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`add a new workplan, Edit the name, delete the plan`, async({home, page, workplans})=> {

        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        await page.waitForLoadState('networkidle', {timeout: 5000});
        await home.handleSpinnerOnHomePage();

        await home.serachTask(content.WorkPlans);
        await workplans.getByRoleLink(content.WorkPlans);
        await page.waitForLoadState('networkidle');

        await workplans.getByRoleButton(content.workPlanDialog.new);

        await page.waitForTimeout(1000)
        await workplans.getByRoleTextbox(content.workPlanDialog.name, FakerData.getPersonFirstName());
        await page.waitForLoadState('load')
        await workplans.getByRoleTextbox(content.workPlanDialog.description, FakerData.getDescription());
        
        await workplans.getByRoleTextbox(content.workPlanDialog.executionorder, `${FakerData.getAmountNumber()}`);
        await page.waitForLoadState('load')
        await workplans.getByRoleCombobox(content.workPlanDialog.parentrecord);

        await page.waitForLoadState('load')
        await workplans.getByRoleParentRecord();
        await workplans.getbyroleTitleText(content.workPlanDialog.save); //

        await home.assertCommonToastMessage(content.toastMessageCreate);
        
        await page.waitForLoadState('networkidle');
        await workplans.getByRoleGroupFilterButton(content.edit.name, content.edit.information, content.edit.editName);
        
        //Edit the name box
        await workplans.getByRoleTextboxClear(content.workPlanDialog.name);
        await workplans.getByRoleTextbox(content.workPlanDialog.name, FakerData.getPersonFirstName());
        await workplans.saveEditedWorkName(content.workPlanDialog.save);
        
        //delete a plan
        await workplans.getByRoleButton(content.showMoreActions);
        await workplans.getByRoleMenuItem(content.deleteDialog.deleteButton);
        await workplans.getByRoleDialog(content.deleteDialog.name);
        await workplans.getByRoleButton(content.deleteDialog.deleteButton);

        await page.waitForLoadState('networkidle');
        await home.assertCommonToastMessage(content.toastMessageDelete);
        
    })

})