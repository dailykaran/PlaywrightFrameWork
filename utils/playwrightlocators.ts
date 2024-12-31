import {Page, test, expect,BrowserContext, Locator} from '@playwright/test'

export abstract class playwright_locators{
    readonly page: Page
    readonly context: BrowserContext

    constructor (page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
    }
    
    async getbyrole(nametext: string, roletype?: any  ): Promise<void>{
        test.step(`The ${nametext} ${roletype} is click`, async()=>{
            console.log('display the role type: ' + typeof(roletype));
            await this.page.getByRole(roletype , { name: nametext }).click();            
        })
    }


}