import{ Page, BrowserContext} from '@playwright/test'
import {urlConstants} from "../constants/urlConstants"
import { playwright_Wrapper } from '../utils/playwright'

export class Homepage extends playwright_Wrapper{

    static homeURL = urlConstants.homeURL

    constructor(page: Page, context: BrowserContext){
        super(page, context);
        //this.init(); 
    }

    async navigateToHome(){
        await  this.loadApp(Homepage.homeURL);
    }

    async clickAppLauncher() {
        await this.click("//div[@class='slds-icon-waffle']", "App Launcher", "Toggle Button");
    }

    async clickViewAll(){
        await this.click("one-app-launcher-menu button", "View All", "Button");
    }

    async clickApp(){
        await this.click('one-app-launcher-app-tile a p', "ClickApp", "Link_button");
    }

    async clickSearchApps(SearchApps: string){
        await this.typeEnter('one-app-launcher-search-bar input[type="search"]', "SearchApps", SearchApps)
        await this.waitForLoadState('networkidle');
    }
    
    async waitForAppLancherDialog(){
        await this.waitForDialogAssert('one-app-launcher-modal h2', 'App Launcher', 6000);
    }

    async delayClickViewAll(){
        await this.delayedClick("one-app-launcher-menu button");
    }

    async digitalClickAppLauncher() {
        await this.click("one-app-launcher-header button[title='App Launcher']", "App Launcher", "Toggle Button");
    }

    async digitalClickViewAll(){
        await this.click("one-app-launcher-menu lightning-button button", "View All", "Button");
    }
       
}