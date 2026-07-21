import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test.describe('suite1', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Charts', {exact: true}).click()
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('the first test', async ({ page }) => {
    await page.getByText('Form Layouts').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('navigate to datepicker', async ({ page }) => {
    await page.getByText('Datepicker').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
})

test.describe('suite1', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('the first test1', async ({ page }) => {
    await page.getByText('Form Layouts').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
  test('navigate to datepicker1', async ({ page }) => {
    await page.getByText('Datepicker').click();
    //await page.pause(); // Pauses the test execution and opens the Playwright Inspector for debugging.
  })
})