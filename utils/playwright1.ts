import { Page, test, BrowserContext, expect, Locator} from '@playwright/test'

export abstract class PlaywrightWrapper{
    readonly page: Page;
    readonly context: BrowserContext;
    protected newWindow: Page | null = null;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async handleNewTab(Element1: string, Element2: string, new_Window_URL: string): Promise<Page>{
        return await test.step(`Window is opened`, async () => {            
                    const windowNew = this.context.waitForEvent("page");
                    await this.page.locator(Element1).click(),
                    await this.page.waitForTimeout(1000);

                    const newWindow = await windowNew;
                    await newWindow.locator(Element2).click();
                    const newWindowTitle = await newWindow.title();
                    console.log(`${newWindowTitle}`);
                    await expect(newWindow).toHaveURL(newWindow.url());
                    await expect(newWindow).toHaveURL(/.*cloud/);
                    console.log(new_Window_URL);
                    await newWindow.close();
                    return newWindow;
        });
    }

}

export class Homepage extends PlaywrightWrapper{
    async mobilePublisher(): Promise<Page> {
        return await this.handleNewTab('button[title="Learn More"]', 'button[onclick="goAhead()"]', "cloud");
    }
}


export class wrapper{

    readonly page: Page;
    readonly context: BrowserContext;
    protected newWindow: Page | null = null;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async handleNewTab(Element1: string, Element2: string, new_Window_URL: string): Promise<Page>{
        return await test.step(`Window is opened`, async () => {            
                    const windowNew = this.context.waitForEvent("page");
                    await this.page.locator(Element1).click(),
                    await this.page.waitForTimeout(1000);

                    const newWindow = await windowNew;
                    await newWindow.locator(Element2).click();
                    const newWindowTitle = await newWindow.title();
                    await this.page.waitForLoadState("networkidle");
                    console.log(`${newWindowTitle}`);
                    await expect(newWindow).toHaveURL(newWindow.url());
                    //await expect(newWindow).toHaveURL(/.*cloud/);
                    await this.page.waitForLoadState("networkidle");
                    console.log(new_Window_URL);
                    console.log(await newWindow.title());
                    await newWindow.close();
                    return newWindow;
        });
    }

}
