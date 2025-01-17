import { test} from '../../customFixtures/salesforceFixtures'
import { Page, expect } from '@playwright/test'
import { Homepage } from '../../pages/HomePage'
import { FakerData } from '../../utils/faker';
import { getBearerToken } from "../../pages/api/01_get_bearer_tokens";
import { readJsonfile } from '../../dataUtilities/jsonUtils'
import { httpPost, httpPatch, httpDelete, httpGet} from "../../pages/api/02_api_actions";
const content = JSON.parse(JSON.stringify(require('../../data/opportunity.json')))

test.describe('Salesforce for creating a opportunity', ()=>{
    let token: any
    let instUrl:any;
    let id:any;
    let jsonData:any

    test.beforeAll( async()=>{
        const testInfo = test.info();
        testInfo.annotations.push(
            {type: test.info().testId},
            {type: "Test suite title",  description: test.info().title},
        )

        const responseJson = await getBearerToken();   
        token = responseJson.access_token;
        instUrl = responseJson.instance_url;

        jsonData = await readJsonfile('./data/apidatas.json');

        const opportunityURL = `${instUrl}/${jsonData.URL}/Opportunity`;               
        const opportunity = await httpPost(`${opportunityURL}`,
            {
                name : jsonData.name,
                stageName : jsonData.stageName,
                closeDate : jsonData.closeDate
            },
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            )
                const opportunity_response = await opportunity.json();
                id = await opportunity_response.id;
                //console.log("opportunity: " + JSON.stringify(opportunity));
                //console.log("opportunity_response: " + JSON.stringify(opportunity_response));
                //console.log("id: "+ JSON.stringify(id));
                expect(opportunity.ok()).toBeTruthy();
                expect(opportunity.status()).toBe(201);
    })

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`opportunity is update`, async({home, page, opportunity})=> {       
        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        await page.waitForLoadState('networkidle')
        await home.serachTask(content.opportunityLink);
        await home.clickTaskLinkButton(content.opportunityLink);
        await page.waitForLoadState('networkidle')
        
        await page.waitForTimeout(2000);
        await opportunity.show4MoreActionButton();
        await opportunity.opportunityEdit();
        await page.waitForTimeout(2000);
        await opportunity.opportunityEditDialog();
        
        //await opportunity.searchAccounts();
        //await opportunity.selectAccounts();        

        await opportunity.opportunityDialogInputBox(content.opportunityDialog.AmountName, content.opportunityDialog.AmountValue); 
        await opportunity.opportunityDialogInputBox(content.opportunityDialog.nextstep, content.opportunityDialog.childaccount);

        await opportunity.opportunityDropdownClick(content.opportunityDialog.Type);
        await opportunity.opportunityDropdownSelect(content.opportunityDialog.Customer);

        await opportunity.opportunityDropdownClick(content.opportunityDialog.Lead);
        await opportunity.opportunityDropdownSelect(content.opportunityDialog.Web);

        await page.waitForTimeout(1000);
        await opportunity.opportunityDropdownClick(content.opportunityDialog.Delivery);
        await opportunity.opportunityDropdownSelect(content.opportunityDialog.Inprogress);

        await opportunity.opportunityDialogInputBox(content.opportunityDialog.OrderNumber, content.opportunityDialog.Number);
        await opportunity.opportunityDialogInputBox(content.opportunityDialog.MainCompetitors, content.opportunityDialog.Testcloud);
        await opportunity.opportunityDialogInputBox(content.opportunityDialog.CurrentGenerators, content.opportunityDialog.Alpha);

        await opportunity.opportunityDialogInputBox(content.opportunityDialog.Tracking, content.opportunityDialog.Number);
        await opportunity.opportunityDialogActionButtons(content.Save);

    })
  
    test.afterAll(`Delete the opportunity when created earlier`, async ()=>{
        const OpportunityURL = `${instUrl}/${jsonData.URL}/Opportunity/${id}`;
                const leadDelete = await httpDelete(`${OpportunityURL}`,
                        {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                        },
                )
                //console.log(leadDelete);
                //console.log(leadDelete.status());
                expect(leadDelete.status()).toBe(204);
                expect(leadDelete.statusText()).toBe('No Content');
    })
})