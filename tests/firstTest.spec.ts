import { test, expect } from '@playwright/test'
//import { first } from 'rxjs-compat/operator/first';

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

test('User facing locators', async ({page}) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByRole('button', { name: 'Sign in' }).first().click()

  // by Label
  await page.getByLabel('Email').first().click()

  // by Placeholder
  await page.getByPlaceholder('Jane Doe').click()

  // by Text
  await page.getByText('Using the Grid').click()

   // by TestId
  await page.getByTestId('SignIn').click()

  // by Title
  await page.getByTitle('IoT Dashboard').click() 
})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  // by button Sign in
  await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click()

  // by nth index child element
  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({ page }) => {
  await page.locator('nb-card').getByText('Using the Grid').click()
  await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click() 
  await page.locator('nb-card', { has: page.locator('#inputEmail1')}).getByRole('textbox', { name: 'Email' }).click()

  await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).click()
  await page.locator('nb-card').filter({ has: page.locator('.status-danger')}).getByRole('textbox', { name: 'Password' }).click()

  // find textbox Email insid nb-card that has checkbox and text 'Sign in' button
  await page.locator('nb-card')
            .filter({ has: page.locator('nb-checkbox') })
            .filter({ hasText: 'Sign in' })
            .getByRole('textbox', { name: 'Email' }).click()

  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click()
})

test('Reusing the locators', async ({ page }) => {
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })
  const passwordField = basicForm.getByRole('textbox', { name: 'Password' })
  const signInButton = basicForm.getByRole('button') 
   
  await emailField.fill('test@test.com')
  await passwordField.fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await signInButton.click()

  await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async ({ page }) => {
  // single text value
  const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  // all text values
  const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonsLabels).toContain('Option 1')

  // input value
  const emailField = basicForm.getByRole('textbox', { name: 'Email' })
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  //console.log(emailValue)
  expect(emailValue).toEqual('test@test.com')

  // placeholder attribute value
  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {
  const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')
  // General assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual('Submit')

  // Locator assertions
  await expect(basicFormButton).toHaveText('Submit')

  // Soft assertions
  await expect.soft(basicFormButton).toHaveText('Submit3')
  await basicFormButton.click()
})