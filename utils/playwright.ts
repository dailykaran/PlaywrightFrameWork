import {Page, test, expect, chromium, BrowserContext, Locator, Frame, FrameLocator} from '@playwright/test'

export abstract class playwright_Wrapper{
    readonly page: Page
    readonly context: BrowserContext

    constructor (page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;

    }

    async loadApp(url: string): Promise<void>{
        try{
            await test.step(`the URL ${url} loaded`, async()=>{
                await this.page.goto(url);
            })
        }catch(error){
            console.error("Error loading the page", error);
        }
    }

    async click(locator: string, name?: String, type?: string) : Promise<void>{
        test.step(`The ${name} ${type} is clicked`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached', timeout: 2000});
            await this.page.locator(locator).click();
        })
    }

    async forceClick(locator: string, name: string, type: string): Promise<void> {
        test.step(`the ${name} ${type} is forced click`, async()=>{
            await this.page.waitForSelector(locator, {state: 'visible'});
            await this.page.locator(locator).click({force: true});
        })
    }

    async typeEnter(locator: string, name: string, type: string):Promise<void> {
        test.step(`Textbox ${name} filled with ${type} application`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached'});
            await this.page.locator(locator).fill(type);
            await this.page.keyboard.press('Enter');
        })
    }

    async typeFill(locator: string, name: string, type: string):Promise<void> {
        test.step(`TextBox ${name} filled with ${type} application`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached'});
            await this.page.locator(locator).fill(type);
        })
    }

    async dynamicButtonClick(locator: string, name: string, type: string): Promise<void>{
        test.step(`the ${name} ${type} is dynamicElement clicked`, async()=>{
            try{
                await this.page.waitForSelector(locator, {state: 'attached', timeout: 60000});
                await this.page.locator(locator).click();
            }catch(error){
                console.error(`Failed to find or click on the selector ${locator}`, error);
                throw error;                
            }
        })
    }
    
    async assertElementVisible(locator: string, name: string) {
        await test.step(`Assert the element ${name} is visible`, async()=>{
            const element = this.page.locator(locator);
            await expect(element).toBeVisible();
        })
    }

    async assertContainText(locator: string, text: string, name: string){
        await test.step(`Assert the element ${name} contain text ${text}`, async()=>{
            const element = this.page.locator(locator);
            await expect(element).toContainText(text);
        })            
    }

    async assertElementCount(locator: string, expectedCount: number, name: string){
        await test.step(`Assert the element ${name} count is ${expectedCount}`, async()=>{
            const element = this.page.locator(locator);
            await expect(element).toHaveCount(expectedCount);
        })
    }

    async waitForElementVisible(locator: string, name: string, timeoutNumber: number ){
        await test.step(`${name} element needs to be visible`, async()=>{
            await this.page.locator(locator).waitFor({state: 'visible', timeout: timeoutNumber,});
        })
    }

    async waitForElementHidden(locator: string, name: string, timeoutNumber?: number){
        await test.step(`${name} element needs to be hide`, async()=>{
            const element = await this.page.locator(locator);
            await element.waitFor({state: 'hidden', timeout: timeoutNumber});
        })
    }

    async waitForElementTextAssert(locator: string, text: string, name: string, timeoutNumber: number){
        await test.step(`${name} element needs to be wait and assert the ${text}`, async()=>{
            const element = await this.page.locator(locator);
            await element.waitFor({state: 'attached', timeout: timeoutNumber});
            await expect(element).toContainText(text);
        })
    }

    async waitForDialogAssert(locator: string, text: string, timeoutNumber: number){
        await test.step(`${text} dialog is visible to appeared and assert the dialog`, async()=>{
            const element = await this.page.locator(locator).getByText(text, {exact: true});
            await element.waitFor({state: 'attached', timeout: timeoutNumber});
            await expect(element).toContainText(text);
        })

    }

    async getText(locator: string): Promise<string> {
        return await test.step(`Getting text from the ${locator}`, async()=>{            
            await this.page.waitForSelector(locator, {state: 'attached'});
            return await this.page.locator(locator).innerText();
        })
    }

    async getTitle(locator: string): Promise<string>{
        return await test.step(`Getting the element ${locator} `, async()=>{
            await this.page.waitForLoadState('networkidle');
            return await this.page.title();
        })
    }

    async getInput(locator: string): Promise<string>{
        return await test.step(`Getting ${locator}, from text`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached'})
            return await this.page.locator(locator).inputValue();
        })
    }

    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle'): Promise<void>{
        await test.step(`wait for an element`, async()=>{
            await this.page.waitForLoadState(state, {timeout: 6000});
        })
    }
    
    async getIframe(locator: string): Promise<FrameLocator>{
        return await test.step(`return iframe element`, async()=>{
            const iframe = this.page.frameLocator(locator);
            return iframe;
        })
    }

    async iframeFill(locator: string, fillText: string, fillTextBox: string): Promise<void>{
        await test.step(`getiframe and ${fillText} in the ${fillTextBox}`, async()=>{
            await this.page.frameLocator(locator).locator(fillTextBox).fill(fillText);
        })
    }

    async iframeClick(locator: string, fillbutton: string): Promise<void>{
        await test.step(`getiframe and click the ${fillbutton}`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached'});
            await this.page.frameLocator(locator).locator(fillbutton).click();
        })
    }

    async delayediFrameFill(iframeselector: string, selector: string, value: string): Promise<void>{
        await this.page.delayedFill(iframeselector, selector, value);
    }

    async delayedClick(selector: string): Promise<void>{
        await this.page.clickAndDelay(selector);
    }

    async comboBoxList(locator: string, selectItem: string):Promise<void>{
        await test.step(`Select a item from combo box ${selectItem}`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached'});
            await this.page.locator(locator, {hasText: selectItem}).click();
        })
    }

/*     async type(locator: string, name: string, type: string):Promise<void> {
        test.step(`Textbox ${name} filled with ${type} application`, async()=>{
            await this.page.waitForSelector(locator, {state: 'attached'});
            await this.page.locator(locator).fill(type);
        })
    } */

}
