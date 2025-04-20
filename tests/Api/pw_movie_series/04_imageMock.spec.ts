import { test, expect } from '@playwright/test';
import fs  from 'fs';

test.describe('Movie Details Page - Content', () => {
  test(
    'verify that the mock a image, name and vote average',
    {
      tag: '@mocking',
    },
      async ({ page }) => {
        test.step('try to mock the vote, image and name', async()=> {
            await page.route(
              //'*/**/**tt21692408?append_to_response=videos', // this url does not work for mocking
              'https://movies-tmdb-mock.azurewebsites.net/3/movie/1022789?append_to_response=videos',
              async (route) => {
                const response = await route.fetch();
                const json = await response.json(); 
                console.log(json);
                  if (json.id == "1022789"){
                    json.title = 'A man called otto'
                    json.vote_average = 9.02;
                    //json.poster_path = 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/Nl5u05O.png'; // other domain image or local folder images does not allow to mock
                    //http://image.tmdb.org/t/p/w500/your_poster_path  
                    json.poster_path = 'https://image.tmdb.org/t/p/original/130H1gap9lFfiTF9iDrqNIkFvC9.jpg'
                  }
                await route.fulfill({ response, json });
                //console.log((await response.body()).byteLength);
              },
            ); 
      })
  
        await page.goto('http://localhost:3000/movie?id=1022789&page=1');
        await page.waitForLoadState('load');
        await page.waitForResponse('**/*.jpg');

        await expect(page.locator('main div h1')).toContainText('otto');
        await expect(page.locator('main div p').first()).toHaveText('9.02');

        const webImage = page.locator('div section.summary-wrapper div.gradient img');
        await expect(webImage).toBeVisible();
        await expect(webImage).toHaveAttribute('src', /\/130H1gap9lFfiTF9iDrqNIkFvC9/);
        await page.waitForTimeout(1000);
      },
    
    
  );
})
