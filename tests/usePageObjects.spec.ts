import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'test', 'Option 2')
  await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckBox('Test Test', 'test@test.com', false)
  await pm.navigateTo().datepickerPage()
  await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(5)
  await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 10)
})