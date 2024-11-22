import {test} from '@playwright/test'
import{ LoginPage } from '../pages/LoginPage'

test(`Verify the login credentials`, async ({page, context})=>{
    const login = new LoginPage(page, context);
    await login.loginDo('dinakaran@company.sandbox', 'Testing@123');
})

test.use({storageState: "AuthStorage/sales_login_storage.json"})
test('Verify the visible element in home page', async({page, context})=>{
    console.log('Testing the latest build.');
})

