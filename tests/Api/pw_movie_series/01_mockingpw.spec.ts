
import { test, expect } from '@playwright/test';

test.describe('Movie Details Page - Content', () => {
  test(
    'verify static content and dynamic vote average',
    {
      tag: '@mocking',
    },
    
      async ({ page }) => {
        // Get the response and add to it as average votes is dynamic content
        test.step('try to the get duration of response', async()=> {
        await page.route(
          '*/**/**718821?append_to_response=videos',
          async (route) => {
            const response = await route.fetch();
            const json = await response.json();
            //mock the average votes as this will normally change
            json.vote_average = 7.02;
            json.title= "Testing the movie...";
            json.overview = "Started the Testing "
  
            await route.fulfill({ response, json });
            console.log((await response.body()).byteLength);
            
            
          },
        );
      })
  
        await page.goto('http://localhost:3000/movie?id=718821&page=1');
        const movie = page.getByRole('main');
  
        await expect(movie.getByLabel('Rating Value')).toHaveText('7.02');
        //console.log(duration)
        //await page.waitForTimeout(5000);
      },
    
    
  );

  test(
    'link to website works',
    {
      tag: '@mocking',
    },
    async ({ page }) => {
      await page.context().route('http://localhost:3000/movie?id=939243&page=1', (route) =>
        route.fulfill({
          body: '<html><body><h1>Twisters movie website</h1></body></html>',
        }),
      );

      await page.goto('http://localhost:3000/movie?id=939243&page=1');
      await expect(page.url()).toContain("939243");
    },
  );

  test(
    'link to IMDB works',
    {
      tag: '@mocking',
    },
    async ({ page }) => {
      await page.context().route('http://localhost:3000/movie?id=939243&page=1', (route) =>
        route.fulfill({
          body: '<body><div><h1><p>IMDB website Testing</p></h1></div></body>',
        }),
      );

      await page.goto('http://localhost:3000/movie?id=939243&page=1');
      await expect(page).toHaveURL(/939243/);
    },
  );

});
