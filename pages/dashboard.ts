import {Page, BrowserContext, expect} from "@playwright/test"
import {playwright_Wrapper} from "../utils/playwright"

export class dashboradPage extends playwright_Wrapper{
    constructor(page: Page, browser: BrowserContext){
        super(page, browser)
    }

    async serachDashboard(text: string){
        await this.page.waitForLoadState('networkidle');
        await this.typeFill('one-app-launcher-search-bar input[type="search"]', 'searchBox', text);
    }
    
    async clickAppLink(name: string){
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(`one-app-launcher-tab-item a[href*=${name}]`, {timeout: 3000});
        await this.click(`one-app-launcher-tab-item a[href*=${name}]`, name, 'linkButton');
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToTabTask(name: string){
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(`one-app-nav-bar-item-root a[href*=${name}]`, {timeout: 3000});
        await this.click(`one-app-nav-bar-item-root a[href*=${name}]`, name, 'linkButton');
        await this.page.waitForLoadState('networkidle');
    }

    async openNewDashboard(NewDashboard: string){
        await this.page.getByRole('button', {name: NewDashboard}).click({force: true});
    }

    async dashboardName(dashboardName: string){
        const iframe = this.getIframe('iframe[title="dashboard"]');
        (await iframe).locator('#dashboardNameInput').fill(dashboardName);
    }

    async dashboardDiscription(dashboardDescription: string){
        await this.iframeFill('iframe[title="dashboard"]', dashboardDescription, '#dashboardDescriptionInput');
    }

    async newDashBoardSubmit(){
        await this.iframeClick('iframe[title="dashboard"]', '#submitBtn');
    }

    async dashboardClick(){
        await this.page.waitForLoadState('networkidle');
        await this.iframeClick('iframe[title="dashboard"]', 'div.editTitle');
    }

    async dashboardDone(){
        await this.iframeClick('iframe[title="dashboard"]', 'button.slds-button.doneEditing');
    }

    async dashboardEdit(editContent: string){
        await this.iframeFill('iframe[title="dashboard"]', editContent, 'input#edit-dashboard-title',);
        await this.page.waitForLoadState('networkidle');
    }
    async dashboardSave(){
        await this.iframeClick('iframe[title="dashboard"]', '.toolbarActions .actions >[role="group"] > button');
        await this.page.waitForLoadState('networkidle');
    }

    async assertToastMessageBar(message: string){
        const toastMsg = await this.getText('span.toastMessage.forceActionsText');
        await expect(toastMsg).toContain(message);
    }

    async dashboardDelayedEdit(editContent: string){
        await this.page.delayedFill('iframe[title="dashboard"]', 'input#edit-dashboard-title', editContent);
    }
}

