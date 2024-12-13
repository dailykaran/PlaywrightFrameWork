import { chromium, test } from "@playwright/test";

test(`Test to verify the application behaviour in different locations`, async () =>{
    const browser = await chromium.launch();
    const context = await browser.newContext({
        geolocation: {                          // Get the geolocation number by right click menu and then get the latitude & longitude.
            latitude: 13.092168,
            longitude: 80.143115,
        },
        permissions: ['geolocation']
    })

    const page = await context.newPage();
    await page.goto("https://www.google.com/maps");
    await page.waitForLoadState('domcontentloaded');
    await page.click("#sVuEFc"); // click the "my location" icon button in the google maps.
    await page.waitForTimeout(10000);
})

