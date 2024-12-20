import {Page, BrowserContext, expect} from "@playwright/test"
import {playwright_Wrapper} from "../utils/playwright"

export class digitalExperiencesPage extends playwright_Wrapper{
    static navigateToDigitalExperience() {
        throw new Error('Method not implemented.');
    }
    constructor(page: Page, browser: BrowserContext){
        super(page, browser)
    }

    async navigateToDigitalExperience(){
        await this.page.locator('.refreshSpinner .refreshSpinnerImg').waitFor({state: 'hidden', timeout: 30000});
        await this.page.waitForSelector('one-app-launcher-app-tile[data-name="Digital Experiences"]' ,{state: 'attached', timeout: 30000});
              
        await this.page.locator('one-app-launcher-app-tile[data-name="Digital Experiences"]').click();
    }

    async welcomeDigitalDialogClose(){
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('.modal-container button[title="Close this window"]').click({force:true});
    }

}