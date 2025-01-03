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

    async serachTask(text: string){
        await this.typeFill('one-app-launcher-search-bar input[type="search"]', 'searchBox', text);
    }
    
    async clickTaskLinkButton(text: string){
        await this.click(`one-app-launcher-tab-item a[href*=${text}]`, text, 'linkButton');
    }
      
    async assertCommonToastMessage(assertText: string){
        await this.assertToastMessage('span.toastMessage.forceActionsText', assertText)
        await this.page.getByRole('button', {name: 'Close', exact:true}).click();
    }

    async handleSpinnerOnHomePage(){
        const spinner = this.page.locator('.slds-spinner_container div.slds-spinner span');
        if(await spinner.isVisible()){
            await this.waitSpinnerAndClose();
            await this.page.reload();
            await this.page.waitForLoadState('networkidle');
            await this.clickAppLauncher();
            await this.clickViewAll();
        }else{
            console.log('Spinner icon does not appear.');
            
        }
    }
}