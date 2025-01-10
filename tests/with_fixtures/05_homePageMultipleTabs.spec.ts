import { test } from '../../customFixtures/salesforceFixtures'
import { expect } from '@playwright/test'
import {FakerData } from '../../utils/faker';


test.describe('Testcase for handle multiple tabs on the home page.', ()=>{

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test(`Handle the new tab on home page`, async ({home, page}, testinfo)=>{
        await home.navigateToHome();
        await page.waitForLoadState('load');
        
        //trail 1: page handle in homepage.ts's function
        await home.handleTab();
        expect(await page.url()).toContain('home');

        //trail 2: Return newtab promise in the spec. Here, handle and verify it
        const newTab = await home.handleWindowTab('button[title="Learn More"]');
        await newTab.locator('button[onclick="goAhead()"]').click();
        expect(await newTab.url()).toContain('cloud');
        console.log(" try to get the newTab content: "  + JSON.stringify(newTab));
        await newTab.close();
        await page.waitForTimeout(1000);
        
    })

    test.use({storageState: "AuthStorage/sales_login_storage.json"})
    test.only(`Handle and work on newTab, action a shadow elements, scrollIntoViewIfNeeded`, async ({home, page, workplans}, testinfo)=>{
        await home.navigateToHome();
        await page.waitForLoadState('load');

        //trail 2: Return newtab promise in the spec. Here, handle and verify it
        const newTab = await home.handleWindowTab('button[title="Learn More"]');
        await newTab.locator('button[onclick="goAhead()"]').click();
        expect(await newTab.url()).toContain('cloud');

        await newTab.waitForLoadState('load');
        const shadowRoot1 = await newTab.locator('hgf-c360contextnav')
        await shadowRoot1.locator('span.icon.arrow').click();
        const shadowRoot2 = await newTab.locator('hgf-c360contextmenugroup')
        await shadowRoot2.locator('ul li').nth(4).click();
        expect(await newTab.url()).toContain('customer-service-automation'); 
        
      /*await newTab.evaluate(()=>{
            window.scrollBy(0, 500);
        }) */
        await newTab.locator('section .nupfixed_cta .cta_container').nth(0).scrollIntoViewIfNeeded();
        await newTab.locator('pbc-button a.cta_button[href*="products"]').click();
        expect(await newTab.url()).toContain('all-products');
        await newTab.close();
        
        await workplans.getByRoleLink('Community');

        
    })
})