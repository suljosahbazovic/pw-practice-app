import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase{
    // readonly page: Page
    // readonly fromLayoutsManuItem: Locator
    // readonly datePickerMenuItem: Locator
    // readonly smartTableMenuItem: Locator
    // readonly toastrMenuItem: Locator
    // readonly tooltipMenuItem: Locator

    constructor(page: Page){
        super(page)
        // this.page = page
        // this.fromLayoutsManuItem = page.getByText('Form Layouts')
        // this.datePickerMenuItem = page.getByText('Datepicker')
        // this.smartTableMenuItem = page.getByText('Smart Table')
        // this.toastrMenuItem = page.getByText('Toastr')
        // this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
        //await this.fromLayoutsManuItem.click()
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')        
        await this.page.getByText('Datepicker').click()
        //await this.datePickerMenuItem.click()        
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data') 
        await this.page.getByText('Smart Table').click()
        //await this.smartTableMenuItem.click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays') 
        await this.page.getByText('Toastr').click()
        //await this.toastrMenuItem.click()        
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays') 
        await this.page.getByText('Tooltip').click()
        //await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem (groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == 'false'){
            await groupMenuItem.click()
        }
    }
}