import {test, expect, Page, Locator} from "@playwright/test"


/* async function highlightElement(page:Page, element1:Locator, duration=3000){
	await page.evaluate((element2 ) => {
		element2.style.border = '3px solid red';
	}, await element1.elementHandle());
	await page.waitForTimeout(duration);
} */

test.beforeEach("Login in Salesforce", async({page})=> {
        await page.goto("https://login.salesforce.com");
        await expect(page).toHaveURL(/.*salesforce/);
        await expect(page).toHaveTitle(/.*Login | salesforce/);    
    
        await page.getByLabel("UserName").fill('dinakaran@company.sandbox');
        const password = page.getByLabel('Password');
        await password.fill('Testing@123');
    
        await page.locator('#Login').click();
        await expect(page).toHaveURL(/.*SetupOneHome/);
        await page.context().storageState({path:"AuthStorage/sales_login_storage.json"});
})

test("Sales Force Home page", async({page}) => {
    await page.waitForLoadState('networkidle');
    await page.goto("https://ecgroupinternational-dev-ed.develop.lightning.force.com/lightning/page/home");
    await expect(page).toHaveURL(/.*home/);

    //Matching inside a locator
    await page.waitForLoadState('networkidle');
    await page.locator('[data-id="Opportunity"]').click();
    await page.waitForLoadState('networkidle');
    await page.locator('.uiVirtualDataTable tr th a[href*="view"]').nth(1).click();
    await page.waitForLoadState('load');
    await page.locator('.forceRelatedListCardHeader .forceDeferredDropDownAction a').filter({hasText: "Products"}).click();
    await page.waitForTimeout(1000);
    await page.locator('.forceRelatedListCardHeader .forceDeferredDropDownAction a').filter({hasText: "Roles"}).click();
    await page.waitForTimeout(1000);

    await expect(page.locator('.forceRelatedListCardHeader .forceDeferredDropDownAction a').filter({ hasNotText: 'Roles' })).toHaveCount(5);
    await page.waitForTimeout(1000);

    //Matching only visible elements
    await console.log(await page.locator('lightning-button-menu button').locator('visible=true').count());

    //Matching only visible elements
    const elem = await page.locator('lightning-button-menu button').locator('visible=true').nth(1);
    await elem.highlight();
    await page.waitForTimeout(1000);
    //Filter by child/descendant
    await page
    .locator('lightning-button-group').locator('visible=true')
    .filter({ has: page.getByRole('button', { name: 'Email' }) }).highlight();
    await page.waitForTimeout(1000);

    // Matching two locators simultaneously
    await page.locator('lightning-button-group button').and(page.getByTitle('New Event')).highlight();
    await page.waitForTimeout(3000); 
})

test("Sales Force chatter page", async({page}) => {
    await page.waitForLoadState('networkidle');
    await page.goto("https://ecgroupinternational-dev-ed.develop.lightning.force.com/lightning/page/home");
    await expect(page).toHaveURL(/.*home/);

    //Matching inside a locator
    await page.waitForLoadState('networkidle');
    await page.locator('[data-id="Opportunity"]').click();
    await page.waitForLoadState('load');

    await page.locator('tr td.cellContainer .forceVirtualActionMarker.forceVirtualAction').nth(1).click();
    //Count items in a list
    await page.locator('ul.scrollable li').count();
    await expect(page.locator('ul.scrollable li')).toHaveCount(4);
    //Assert all text in a list
    await expect(page.locator('ul.scrollable li')).toHaveText(['Edit', 'Delete', 'Change Owner', 'Edit Labels']);
    await page.locator('tr td.cellContainer .forceVirtualActionMarker.forceVirtualAction').nth(1).press('Escape');

    await page.locator('tr td.cellContainer .forceVirtualActionMarker.forceVirtualAction').nth(2).click();
    //Get by text
    await page.locator('ul.scrollable li').locator('visible=true').nth(1).click();

    //await page.highlight('text=highlight', { color: 'red', outline: 'solid 2px blue', duration: 2000 });

    await page.locator('button[title="Close this window"]').click();
    await page.waitForTimeout(1000);

    //Filter by text
    await page.locator('tr td.cellContainer .forceVirtualActionMarker.forceVirtualAction').nth(3).click()
    await page.locator('ul.scrollable li').filter({hasText: 'Delete'}).highlight();

    //Rare use cases Do something with each element in the list
    await page.locator('tr td.cellContainer .forceVirtualActionMarker.forceVirtualAction').nth(4).click()
    for (const row of await page.locator('ul.scrollable li').locator('visible=true').all())
        console.log(await row.textContent());

    await page.waitForTimeout(3000);

})

test.only("sales force settings page: Handle website's error & Elements inside in the iframe", async({page}) => {
    /*
        Capture the website error using the "page.on()"
        declare the variable string(msg, type)
        write the "logs.push({msg: msg.text(), type: msg.type()})" 
        We can fail the test by  "expect(logs.length).toBe(0);"
    */

    const logs: { 
        msg: string; 
        type: string;
        }[] = []
    const errors: {
        exception: Error
        }[] = []
    /*page.on('console', (msg) =>{ 
        if(msg.type() == 'warning'){
            logs.push({ msg: msg.text(), type: msg.type()})
        }
    })*/
    page.on('console', (msg) => {
        logs.push({msg: msg.text(), type: msg.type()});
    });
    page.on('pageerror', (exception) => errors.push({exception: exception}))
    
    await page.waitForLoadState('networkidle')
    await page.goto("https://ecgroupinternational-dev-ed.develop.lightning.force.com/lightning/settings/personal/PersonalInformation/home", {waitUntil: "networkidle"});
    
    //expect(logs.length).toBe(0);
    //expect(errors.length).toBe(0)

    await expect(page).toHaveURL(/.*settings/);
    const frame = page.frameLocator('iframe');
    await frame.locator('label:has-text("Phone")').highlight();
    await page.waitForTimeout(3000);

    await frame.locator('tr td > input').locator('nth=8').fill('India');
    await frame.locator('tr td > input[name="PersonalInformationSetup:editPage:pageBlock:city"]').fill('Chennai');
    const city = await frame.locator('tr td > input').nth(9).getAttribute('value');
    console.log(city);
    
    console.log(logs);
    console.log(errors);
    await page.waitForTimeout(3000);
})

    
