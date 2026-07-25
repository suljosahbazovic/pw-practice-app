import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase{
    //private readonly page: Page

    constructor (page: Page){
        super(page)
        //this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
        //await this.waitForNumberOfSeconds(2)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDateDay = date.getDate().toString()
        const expectedShortMonth = date.toLocaleString('En-US', {month: 'short'})
        const expectedLongMonth = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedShortMonth} ${expectedDateDay}, ${expectedYear}`

        //let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() ?? ''
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').first().textContent() ?? ''
        const expectedMonthAndYear = `${expectedLongMonth} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() ?? ''
        }        
        //await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDateDay, {exact: true}).click()

        const dayCell = this.page.locator('[class="day-cell ng-star-inserted"]')
        const rangeCell = this.page.locator('[class="range-cell day-cell ng-star-inserted"]')
        if(await dayCell.first().isVisible()){
            await dayCell.getByText(expectedDateDay, {exact: true}).click()
        } else {
            await rangeCell.getByText(expectedDateDay, {exact: true}).click()
        }

        return dateToAssert
    }
}