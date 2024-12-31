import {Page, BrowserContext, expect} from "@playwright/test"
import {playwright_locators} from "../utils/playwrightlocators"

export class workplansPage extends playwright_locators{
    constructor(page: Page, browser: BrowserContext){
        super(page, browser)
    }

    async getByRoleLink(linkName: string){
        await this.getbyrole(linkName, 'link');
    }

    async getByRoleButton(buttonName: string){
        await this.getbyrole(buttonName, 'button');
    }

}