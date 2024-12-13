import {LoginPage} from "../pages/LoginPage"
import {Homepage} from "../pages/HomePage"
import {dashboradPage} from "../pages/dashboard"
import {playwright_Wrapper} from "../utils/playwright"
import { mergeTests  } from "@playwright/test";
import { test as baseTestBeforeAfter } from "../customFixtures/utilsBeforeAfterEach"
import { test as exceptionHandles} from "./exceptionHandles"
import { LogoutPage } from "../pages/logoutPage";

type salesforceFixtures = {
    login: LoginPage,
    home: Homepage,
    dashboard: dashboradPage,
    logout: LogoutPage
}

export const test = mergeTests(baseTestBeforeAfter, exceptionHandles).extend<
    salesforceFixtures>({

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
},

logout: async({page, context}, use) => {
    const logout = new LogoutPage(page, context);
    await logout.logoutDo();
    await use(logout);
}
})



