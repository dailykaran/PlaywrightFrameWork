import { test, expect } from '@playwright/test';

//https://github.com/debs-obrien/playwright-api-mocking/blob/main/tests/api-mocking.spec.ts
// Learned a image mocking from above URL

test(
    'Mock the fruit and image in the https://debs-obrien.github.io/playwright-api-mocking/',
    {
      tag: '@mocking',
    },
      async ({ page }) => {
        test.step('try to the image mock from response', async()=> {

            await page.route(
              'https://raw.githubusercontent.com/debs-obrien/playwright-api-mocking/main/fruit.json',
              async (route) => {
                const response = await route.fetch();
                const json = await response.json();
                for (const fruit of json) {
                    if (fruit.id = 66){
                        fruit.stars = 5;
                        fruit.name = "PlayWright";
                        fruit.img =  "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/Nl5u05O.png"; //image accepted from online and not in local folder path.
                        //console.log(fruit);
                    }
                  }
      
                await route.fulfill({ response, json });
                //console.log((await response.json()));                
              },
            ); 
      })
  
        await page.goto('https://debs-obrien.github.io/playwright-api-mocking/');
        await page.waitForLoadState('load');

        await expect(page.getByRole('heading', { name: 'PlayWright' })).toBeVisible();
        await expect(page.locator('div img')).toHaveAttribute('src', /\/Nl5u05O/);
        await page.waitForTimeout(1000);
      },
    
    
  );

