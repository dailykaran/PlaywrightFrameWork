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
            //console.log('display the role type: ' + typeof(roletype));
            await this.page.getByRole(roletype, { name: nametext}).click();            
        })
    }

    async getbyroleFill(roletype: any, TextBoxName: string, TextBoxContent: string): Promise<void>{
        test.step(`The ${TextBoxName} ${roletype} is fill`, async()=>{
            //console.log('display the role type: ' + typeof(roletype));
            await this.page.getByRole(roletype , {name: TextBoxName}).fill(TextBoxContent);            
        })
    }

    async getbyroleClear(roletype: any, TextBoxName: string){
        test.step(`The ${TextBoxName} is clear`, async()=>{
            await this.page.getByRole(roletype , {name: TextBoxName}).clear();
        })
    }

    async getbyroleGroup(roletype1: any, roletype2: any, filterName: string, roletype1Text: string, roletype2Text: string): Promise<void>{
        test.step(`The ${roletype1} ${roletype2} is group`, async()=>{
            await this.page.getByRole(roletype1, {"name": roletype1Text}).filter({hasText: filterName}).getByRole(roletype2, {name: roletype2Text}).click();
        })
    }

    async getbyroleTitleText(nametext: string){
        test.step(`The ${nametext} is click`, async()=>{            
            await this.page.getByTitle(nametext, {exact: true}).click({force:true});  
        })
    }

    async getbyroleLocatorButton(Locator: string, nametext: string){
        test.step(`The ${nametext} is click`, async()=>{            
            await this.page.locator(Locator).getByRole('button', {name: nametext, exact: true}).click({force:true});
        })
    }

}