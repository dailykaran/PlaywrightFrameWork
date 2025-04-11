import {Page, BrowserContext, test, expect} from "@playwright/test"
import {playwright_Wrapper} from "../utils/playwright"
import { urlConstants } from "../constants/urlConstants"

export class LogoutPage extends playwright_Wrapper {
    static pageURL = urlConstants.homeURL;


    constructor(page: Page, context: BrowserContext){
        super(page, context);
    }

    async logoutDo(){
        await this.page.goto(LogoutPage.pageURL);
        
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle(/.*Home | salesforce/);
        await this.click('button.slds-global-actions__avatar', 'avatarIcon', 'button');
        await this.click('a.logout', 'avatarIcon', 'button');
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle(/.*Login | salesforce/);
    }
} 