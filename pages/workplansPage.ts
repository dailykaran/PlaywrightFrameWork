import {Page, BrowserContext, expect} from "@playwright/test"
import {playwright_locators} from "../utils/playwrightlocators"
import {playwright_Wrapper} from "../utils/playwright"

export class workplansPage extends playwright_locators {
    constructor(page: Page, browser: BrowserContext){
        super(page, browser)
    }

    async getByRoleLink(linkName: string){
        await this.getbyrole(linkName, 'link');
    }

    async getByRoleButton(buttonName: string){
        await this.getbyrole(buttonName, 'button');
    }

    async saveEditedWorkName(editSave: string){
        await this.page.locator(`.forceRecordEditActions button[title=${editSave}]`).click({force:true});
        await this.page.keyboard.press('Enter');
    }

    async getByRoleMenuItem(itemName: string){
        await this.getbyrole(itemName, 'menuitem');
    }

    async getByRoleDialog(dialogName: string){
        await this.getbyrole(dialogName, 'dialog');
    }

    async getByRoleTextbox(TextBoxName: string, TextBoxContent: string){
        await this.getbyroleFill('textbox', TextBoxName, TextBoxContent);
    }

    async addNamePlan(TextBoxContent: string){
        await this.page.fill('.forcePageBlockSectionRow div.uiInputText input', TextBoxContent);
    }
    async getByRoleCombobox(ComboBoxName: string){
        await this.getbyrole(ComboBoxName, 'combobox');
    }
    
    async getByRoleParentRecord(){
        await this.getbyroleNoElementName('div.listContent', 'CHG-000000001', 'option');
    }

    async getByRoleTextboxClear(textBoxName: string){
        await this.getbyroleClear('textbox', textBoxName);
    }

    async getByRoleGroupFilterButton(filterName: string, roletype1Text: string, roletype2Text: string){
        await this.getbyroleGroup('group', 'button', filterName, roletype1Text, roletype2Text);
    }

    async getByRoleText(TextButton: string){
        await this.getbyroleTitleText('Save');
    }

    async getbyroleNoElementName(locator: string, nametext: string, roletype?: any  ): Promise<void>{
            const selectItem = await this.page
                    .locator(`${locator}`)
                    .getByRole(roletype)
                    .locator(`div[title=${nametext}]`)
            await selectItem.click();    
    }
}

