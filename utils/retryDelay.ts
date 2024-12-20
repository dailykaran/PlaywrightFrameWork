import{ test as delayAction} from '@playwright/test'
import "./playwright_extension.d.ts"

export const test = delayAction.extend<{page: void}>({

    page: async ({ page }: any, use: any, testInfo: { retry: any; }) => {
        page.delayedFill = async (iframeselector: string, selector: string, value: string) => {
            if (testInfo.retry) {
                await page.waitForTimeout(3000);
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
