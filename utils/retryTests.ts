import{ test as baseTest} from '@playwright/test'
import "./playwright_extension.d.ts"

export const test = baseTest.extend({

    page: async ({ page }, use, testInfo) => {
        page.delayedFill = async (iframeselector: string, selector: string, value: string) => {
            if (testInfo.retry) {
                await page.waitForTimeout(5000);
            }
            await page.frameLocator(iframeselector).locator(selector).fill(value);
        },
        page.clickAndDelay = async (selector: string) => {
            await page.click(selector);
            if (testInfo.retry) {
                await page.waitForTimeout(3000);
            }
        };
        await use(page);
    }

})

