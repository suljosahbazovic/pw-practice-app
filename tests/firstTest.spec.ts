import { test } from '@playwright/test'
import { first } from 'rxjs-compat/operator/first';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
})

test('Locator syntax', async ({ page }) => {
  // by Tag Name
  await page.locator('input').first().click()

  // by Id
  page.locator('#inputEmail1')

  // by Class Name (Value)
  page.locator('.input-full-width')
  page.locator('.shape-rectangle')

  // by Attribute Name
  page.locator('[placeholder="Email"]')

  // by Class Value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  // by Combining Selectors
  page.locator('input[placeholder="Email"][nbinput]')

  // by XPath (NOT RECOMMENDED)
  page.locator('//*[@id="inputEmail1"]')

  // by Text (button, link, etc.)
  page.locator(':text("Using")')

  // by using exact text
  page.locator(':text-is("Using the Grid")')


})