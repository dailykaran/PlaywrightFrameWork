import {LoginPage} from "../pages/LoginPage"
import {Homepage} from "../pages/HomePage"
import {dashboradPage} from "../pages/dashboard"
import {digitalExperiencesPage} from "../pages/digitalExperiences"
import {playwright_Wrapper} from "../utils/playwright"
import { mergeTests  } from "@playwright/test";
import { test as baseTestBeforeAfter } from "../customFixtures/utilsBeforeAfterEach"
import { test as exceptionHandles} from "./exceptionHandles"
import {test as delayAction} from "../utils/retryDelay"
import { LogoutPage } from "../pages/logoutPage";

type salesforceFixtures = {
    login: LoginPage,
    home: Homepage,
    dashboard: dashboradPage,
    digitalexperiences: digitalExperiencesPage,
    logout: LogoutPage
}

export const test = mergeTests(baseTestBeforeAfter, exceptionHandles, delayAction).extend<
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

digitalexperiences: async({page, context}, use) =>{
    const digitalexperiences = new digitalExperiencesPage(page, context);
    await use(digitalexperiences);
},

logout: async({page, context}, use) => {
    const logout = new LogoutPage(page, context);
    await logout.logoutDo();
    await use(logout);
}
})



