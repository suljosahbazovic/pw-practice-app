import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe.only('suite1', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms', {exact: true}).click()
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('the first test', async ({ page }) => {
    await page.getByText('Form Layouts').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('navigate to datepicker page', async ({ page }) => {
    await page.getByText('Datepicker').click();
    await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
})

test.describe('suite2', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('the first test1', async ({ page }) => {
    await page.getByText('Form Layouts').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('navigate to datepicker page1', async ({ page }) => {
    await page.getByText('Datepicker').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
})