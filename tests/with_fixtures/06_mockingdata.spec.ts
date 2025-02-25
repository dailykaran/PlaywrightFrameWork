import { expect, test } from "@playwright/test";

test.skip(`Network interception using Salesforce login`, async ({page}) => {
    await page.route("**/aura?preloadActions", async (route, request) =>{
        if(request.method()==='POST') {
            console.log(`Request URL: ${request.url()}`);
            console.log(`Request headers: `+ JSON.stringify(request.headers));
            const allheaders=await request.allHeaders();
            console.log(allheaders)
        } 
        else {
            route.continue();
        }
    })

    
    //Enter the Username, Password and click on the Login button.
    await page.goto("https://login.salesforce.com");
    await page.fill("#username", "dinakaran@company.sandbox");
    await page.fill("#password", "123@Testing");
    await page.click("#Login");
    const title = await page.title();
    console.log(`The title of the page is ${title}`);
    await expect(page).toHaveTitle("Home | Salesforce");
   
})


//This mocking script did not work as of now.
test("mocks a test call to API", async ({ page }) => {
    //const routePattern = '**/aura?r='
    //const routePattern = 'https://ecgroupinternational-dev-ed.develop.lightning.force.com/lightning/o/Lead/list?filterName=__Recent'
    const routePattern = 'https://ecgroupinternational-dev-ed.develop.lightning.force.com/services/data/v61.0/sobjects/Lead'
  
    await page.route(routePattern, 
        async route => {
      const jsonResponse = {
/*             "Title": "TestCloud",
            "Id": "00QdM00000B2BkrUA6",
            "DisambiguationField": "TestCloud57",
            "Name": "57TestUser",
            "sobjectType": "Lead" */
            "Salutation": "Mr",
            "LastName": "57TestUser",
            "Company": "TestCloud57"
      };
      // Fulfill the route with the JSON response
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(jsonResponse),});
    });
   
    await page.goto("https://login.salesforce.com");
    await page.fill("#username", 'dinakaran@company.sandbox');
    await page.fill("#password", '123@Testing');
    await page.click("#Login");
  
    // Wait for the Salesforce app launcher icon to be visible
    await page.waitForSelector('div.slds-icon-waffle', { timeout: 150000 });
    const eleAppLaunch = page.locator('div.slds-icon-waffle');
    await eleAppLaunch.click();
    await page.waitForLoadState('load');
  
    // Click the "View All" link
    const viewAll = page.locator('text=View All');
    await viewAll.click();
  
    // Search for the "Leads" option
    await page.fill('one-app-launcher-modal input.slds-input', 'Leads');
    await page.click('mark:text("Leads")');
    await page.waitForLoadState('load');
  
    // Wait for some time before checking for the text element
    await page.waitForTimeout(10000);
  
    // Check if the text element is visible on the page
    const textElement = page.locator('a[title="57TestUser"]');
    await expect(textElement).toBeVisible({ timeout: 20000 });
    if (await textElement.isVisible()) {
      await expect(textElement).toBeVisible({ timeout: 20000 });
    } else {
      console.log('Text element not found');
    }
  });
