import { test, expect } from '@playwright/test';
import fs  from 'fs';

test.describe('Movie Details Page - Content', () => {
  test(
    'verify static content and dynamic vote average',
    {
      tag: '@mocking',
    },
    
      async ({ page }) => {
        // Get the response and add to it as average votes is dynamic content
        test.step('try to the get duration of response', async()=> {
            const imageBuffer = fs.readFileSync('tests/Api/pw_movie_series/pwlogo.png');
        await page.route(
          '*/**/**718821?append_to_response=videos',
          async (route) => {
            const response = await route.fetch();
            const json = await response.json();
            json.vote_average = 9.02;
            json.poster_path = imageBuffer; 
  
            await route.fulfill({ response, json });
            console.log((await response.body()).byteLength);
            
            
          },
        );
      })
  
        await page.goto('http://localhost:3000/movie?id=718821&page=1');
        const movie = page.getByRole('main');
  
        await expect(movie.getByLabel('Rating Value')).toHaveText('9.02');

        const webImage = page.locator('div section.summary-wrapper div.gradient img');
        await expect(webImage).toBeVisible();
        await expect(webImage).toHaveAttribute('src', /\/w780/);
        await page.waitForTimeout(1000);
      },
    
    
  );
})
