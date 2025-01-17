import {Page, BrowserContext, expect} from "@playwright/test"
import {playwright_Wrapper} from "../utils/playwright"

export class opportunityPage extends playwright_Wrapper{
    constructor(page: Page, browser: BrowserContext){
        super(page, browser)
    }

    async show4MoreActionButton(){
        await this.click('tr:nth-child(1) div.forceVirtualActionMarker a', 'show4MoreAction', 'linkButton');
    }

    async opportunityEdit(){
        await this.click('div.forceActionLink[title="Edit"], Edit', 'button', 'editButton');
    }
    
    async opportunityEditDialog(){
        await  this.waitForElementVisible('div.actionBody records-base-record-form', 'edit', 9000);
    }

    async searchAccounts(){
        await this.click('lightning-base-combobox input[placeholder="Search Accounts..."]', 'SearchAccounts', 'input');
    }

    async selectAccounts() {
        await this.page.waitForSelector('div[id^="dropdown-element"] ul li:nth-child(2)', {timeout: 3000});
        await this.click('div[id^="dropdown-element"] ul li:nth-child(2)', 'RecentAccount', 'comboBox');
    }

    async opportunityDropdownSelect(selectItem: string) {
        await this.comboBoxList('lightning-base-combobox-item span.slds-truncate', selectItem); //e.g. selectItem as "Completed, Yet to begin and In progress"
    }

    async opportunityDialogInputBox(type: string, InputItem: string) {
        await this.page.waitForSelector(`lightning-primitive-input-simple div input[name^=${type}]`, {timeout: 3000});
        await this.typeFill(`lightning-primitive-input-simple div input[name^=${type}]`, type, InputItem);
    }

    async opportunityDialogActionButtons(actionButton: string) {
        await this.click(`runtime_platform_actions-action-renderer[title=${actionButton}] button`, actionButton, 'button');
    }

    async opportunityDropdownClick(dropDownName: string) {
        await this.click(`lightning-base-combobox button[aria-label^=${dropDownName}]`, dropDownName, 'button');
    }
}