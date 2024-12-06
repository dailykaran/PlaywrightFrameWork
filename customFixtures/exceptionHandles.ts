import { test as exceptionHandles, expect } from "@playwright/test"

// export the extended `test` object
export const test = exceptionHandles.extend<{ page: void; failOnJSError: Boolean }>({
  failOnJSError: [true, { option: true }],
  page: async ({ page, failOnJSError }, use) => {
    const errors: Array<Error> = []

    page.addListener("pageerror", (error) => {
      errors.push(error)
    })

    await use(page)

    if (failOnJSError) {
      expect(errors).toHaveLength(0)
    }
  },
})

// export Playwright's `expect`
export { expect } from "@playwright/test"
