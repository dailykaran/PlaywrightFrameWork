import { test as baseTestBeforeAfter } from "@playwright/test";

export const test = baseTestBeforeAfter.extend<{
  exceptionLogger: void;
  timeLogger: void;
}>({
  page: async ({ page }, use) => {
    await use(page);
  },
  timeLogger: [
    async ({}, use, testInfo,) => {
      const getDate = () => new Date().toISOString();
      // before test
      test.info().annotations.push({
        type: "Start",
        description: (`${getDate()}` + " " + testInfo.title + " : " + testInfo.status)
      });
      await use();

      // after test
      test.info().annotations.push({
        type: "End",
        description: (`${getDate()}` + " " + testInfo.title + " : " + testInfo.status)
      });
    },
    { auto: true },
  ],
  exceptionLogger: [
    async ({ page }, use) => {
      // before test
      const errors: Error[] = [];
      page.on("pageerror", (error) => errors.push(error));

      await use();
      // after test
      if (errors.length > 0) {
        await test.info().attach("frontend-exceptions", {
          body: errors
            .map((error) => `${error.message}\n${error.stack}`)
            .join("\n-----\n"),
        });
       throw new Error("Something went wrong in JS land" + errors.toString());
      }
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";

