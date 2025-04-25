import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  timeout: 300 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  reporter: [
    // HTML reporter that automatically opens the report
    ['html', { open: 'on-failure' }],
    // JSON reporter that outputs results to a specific file
    ['json', { outputFile: 'reports/report.json' }],
    // Allure reporter for detailed test reports
    ['allure-playwright', {
      detail: true,
      outputFolder: "my-allure-results",
      suiteTitle: false,
    }],
    //custom Report from winston
    //['./reportWinstonConfig.ts'],
  ],

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    headless: true,

    video: "off",

    screenshot: "only-on-failure",

    storageState: "AuthStorage/sales_login_storage.json",

  },

  outputDir: './test-results',  
  /* Configure projects for major browsers */
  projects: [
    {name: 'setup', testMatch: /.*\.setup\.ts/, teardown: "teardown" },
    {name: 'teardown', testMatch: /.*\.teardown\.ts/},
   {
      name: 'Api',
      testMatch: ['tests/Api/*.spec.ts'],
      use: { 
        ...devices['Desktop chromium'],
        channel: "chromium",
        launchOptions: {
        //args: ["--start-maximized"]
          slowMo: 500
        },
        actionTimeout: 15000,
      },
      
      dependencies: ['setup'],
    },

    {
      name: 'with_fixtures',
      testMatch: ['tests/without_Fixtures/01_HomePage.spec.ts'],
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          //args: ["--start-maximized"],
          slowMo: 700
        },
      },
      dependencies: ['setup'],
    },

    {
      name: 'Playwrightmoviewebsite',
      testMatch: ['/tests/Api/interceptions/*.spec.ts'],
      use: { 
        ...devices['Desktop chrome'],
        channel: "chrome",
        launchOptions: {
          //args: ["--start-maximized"],
          slowMo: 500
        },
        actionTimeout: 15000,
      },
      //dependencies: ['setup'],
    },
  ]
/*     {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
