import {test, expect, chromium} from "@playwright/test"
//import { Homepage } from "../utils/playwright1"
import { wrapper } from "../../utils/playwright1"

test('Handling the concurrent method on sales force page', async({page, context}) => {

    await page.goto("https://login.salesforce.com/");
    await page.locator("#username_container input.input.username").fill("dinakaran@company.sandbox");
    await page.locator("input.input.password").fill("Testing@123");
    await page.locator("input.button#Login").click();
    await page.waitForLoadState();

    /* //Click on the "Learn More” button under Mobile Publisher 
    const [windowNew] = await Promise.all([
        context.waitForEvent("page"),
        //await page.locator('button[title="Learn More"]').highlight(),
        await page.locator('button[title="Learn More"]').click(),
        await page.waitForTimeout(3000)
    ])

    //Capture the title of the new window that opens 
    const learnTitle = await windowNew.title();
    console.log(`${learnTitle}`);
    await expect(windowNew).toHaveURL(/.*HelpAndTrainingDoor/);

    // - Click the ‘Confirm’ button on the page 
    await windowNew.locator('button[onclick="goAhead()"]').click();

    // Assert the title and url of the page 
    const newWindowTitle = await windowNew.title()
    console.log(`${newWindowTitle}`);
    await expect(windowNew).toHaveURL(/.*cloud/);
    await windowNew.close(); */
    
    /* const wrapperWindow = new Homepage(page, context);
    await wrapperWindow.mobilePublisher(); */
    //console.log(await page.title());

    const WindowWrap = new wrapper(page, context);
    await WindowWrap.handleNewTab('button[title="Learn More"]', 'button[onclick="goAhead()"]', "cloud");
    

})

