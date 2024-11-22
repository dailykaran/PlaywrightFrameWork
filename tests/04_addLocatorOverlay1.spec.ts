import { Page, Locator, chromium, test, expect } from "@playwright/test";


test("Nvidia page for overlay handles using addlocator", async({page}) => {

    await page.goto('https://www.nvidia.com/en-in/');
    await page.waitForLoadState('networkidle');
    // Setup the handler.
    const locatorDialog = page.locator('#onetrust-button-group-parent');
    await page.addLocatorHandler(locatorDialog, async () => {
    await page.getByRole('button', { name: 'Accept All' }).click();
    }, { noWaitAfter: true, times: 2});
    await page.locator('.menu-button-link.menu-level-1').nth(1).click();
    await page.waitForTimeout(1000);

})

