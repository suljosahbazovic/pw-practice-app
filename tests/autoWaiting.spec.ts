import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click();
})

test('should wait for the AJAX request to complete', async ({ page }) => {
    // Wait for the AJAX request to complete and the success message to appear
    //await expect(page.getByText('Data loaded with AJAX get request.')).toBeVisible();

    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //const text = await successButton.textContent()

    // await successButton.waitFor({ state: 'attached' });
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});
})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // wait for element
    //await page.waitForSelector('.bg-success')

    // wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    //await page.waitForTimeout(2000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({ page }) => {
    // test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})