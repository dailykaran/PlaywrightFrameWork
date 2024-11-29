import {Page, BrowserContext, test, expect} from "@playwright/test"
import {playwright_Wrapper} from "../utils/playwright"
import { urlConstants } from "../constants/urlConstants"

export class LoginPage extends playwright_Wrapper {
    static pageURL = urlConstants.baseURL;


    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }

    async loginDo(UserName: string, password: string){
        await this.loadApp(LoginPage.pageURL);
        await expect(this.page).toHaveURL(/.*salesforce/);
        await expect(this.page).toHaveTitle(/.*Login | salesforce/);    
    
        await this.page.getByLabel("UserName").fill(UserName);
        const password1 = this.page.getByLabel('Password');
        await password1.fill(password);
    
        //console.log(await this.page.locator('#Login').getAttribute('value'));
        await this.click('#Login', 'Log_In', 'InputButton');
        await expect(this.page).toHaveURL(/.*SetupOneHome/);
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle(/.*Home | salesforce/);
        await this.page.context().storageState({path:"AuthStorage/sales_login_storage.json"});        
    }

    

    
}

