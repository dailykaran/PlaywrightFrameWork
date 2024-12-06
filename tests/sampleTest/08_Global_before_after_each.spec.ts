import {expect} from '@playwright/test'
import { test } from '../../customFixtures/salesforceFixtures'


test.describe('before and after', ()=>{

test("example page loads1", async ({ page}) => {
  await page.goto(`data:text/html,<h1>Hello world!</h1>`)
  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible()

});

test.only("example of error", async ({ page }) => {
    await page.goto(
      `data:text/html,
        <h1>Hello World</h1>
        <script>throw new Error("Boooooh!")</script>
        <script>throw new Error("Boooooh again!")</script>`
    )
    await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible()

})

})
