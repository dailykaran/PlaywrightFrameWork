import { test} from '../../customFixtures/salesforceFixtures'
import { Page, expect } from '@playwright/test'
import { Homepage } from '../../pages/HomePage'
import { FakerData } from '../../utils/faker';
import { getBearerToken } from "../../pages/api/01_get_bearer_tokens";
import { readJsonfile } from '../../dataUtilities/jsonUtils'
import { httpPost, httpPatch, httpDelete, httpGet} from "../../pages/api/02_api_actions";

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
        console.log("leadURL:  "+ opportunityURL);
                
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
                console.log("opportunity_response: " + JSON.stringify(opportunity_response));
                console.log("id: "+ JSON.stringify(id));
                expect(opportunity.ok()).toBeTruthy();
                expect(opportunity.status()).toBe(201);
    })

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`opportunity is update and delete`, async({home, page})=> {       
        await home.navigateToHome();
        await home.clickAppLauncher();
        await home.clickViewAll();
    
        await page.waitForLoadState('networkidle')
        await home.serachTask("Opportunit");
        await home.clickTaskLinkButton("Opportunit");
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(2000);
    })

})