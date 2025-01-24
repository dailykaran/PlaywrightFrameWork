import {expect} from '@playwright/test'
import { test } from '../../../customFixtures/salesforceFixtures'
import { createLogger, format, level, transports } from 'winston';

test.describe('before and after', ()=>{

test("example page loads1", async ({ page}) => {
  await page.goto(`data:text/html,<h1>Hello world!</h1>`)
  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible()

});

test("example of error", async ({ page }) => {
    await page.goto(
      `data:text/html,
        <h1>Hello World error</h1>
        <script>throw new Error("Boooooh!")</script>
        <script>throw new Error("Boooooh again!")</script>`
    )
    await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible()

})

test('example of rejection error', async ({page}) => {
  await page.goto(`data:text/html, 
    <h1>Hello World rejection </h1>
    <script>new Promise(function(resolve, reject){setTimeout(function(){reject('or reject');}, 1000);});</script>`)
  await page.waitForTimeout(3000);
})

test.only('example of throw error', async ({page}) => {
  try{
    await page.goto(`data:text/html, 
      <h1>Hello World throw error</h1>
      <script>new Promise(function(){setTimeout(function(){throw 'or throw';}, 1000);});</script>`)
    }
    catch(error){
      error('An error occurred', {
        message: error.message,
        stack: error.stack,
      });
    }
    //<Img src = x onerror = "javascript: window.onerror = alert; throw XSS">`
    await page.waitForTimeout(3000);
    function calculateSquareRoot(number: number): number {
      if (number < 0) {
        throw new Error("Cannot calculate the square root of a negative number.");
      }
      return Math.sqrt(number);
    }
    calculateSquareRoot(2)
    
})


})
