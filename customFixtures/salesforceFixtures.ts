import {LoginPage} from "../pages/LoginPage"
import {Homepage} from "../pages/HomePage"
import {dashboradPage} from "../pages/dashboard"
import {playwright_Wrapper} from "../utils/playwright"
import { test as baseTest } from "@playwright/test";

type salesforceFixtures = {
    login: LoginPage,
    home: Homepage,
    dashboard: dashboradPage
}

export const test = baseTest.extend<salesforceFixtures> ({

login: async({page, context}, use) =>{
    const login = new LoginPage(page, context);
    await login.loginDo('dinakaran@company.sandbox', 'Testing@123');
    await use(login);
},

home: async({page, context}, use) =>{
    const homePage = new Homepage(page, context)
    await use(homePage);


},

dashboard: async({page, context}, use) =>{
    const dashboard = new dashboradPage(page, context)
    await use(dashboard);
}


})