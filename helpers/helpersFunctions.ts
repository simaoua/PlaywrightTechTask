import { expect, type Locator, type Page } from '@playwright/test'

export class HelpersFunctions {
  readonly page: Page
//   readonly onboardingDialogWindow: Locator


  constructor(page: Page) {
    this.page = page
  }

  async verifyScreenshot(page: Page, screenshot: string) {
    await expect(page).toHaveScreenshot(screenshot)
  }

  async verifyUrlContains(page: Page, partOfUrl: string) {
    await expect(page).toHaveURL(partOfUrl)
  }

  async verifyIsDesktopMode(page: Page) {
    return await page.$eval('header[class^="MuiPaper-root"]', el => el.classList.contains('NavBar-appBarShift'))
  }

  async verifyExpiresCookieIsPresent(page: Page) {
    let myCookies = await page.context().cookies()
    expect(myCookies[0].expires).toBeTruthy()
  }

  async createNewUser(request, newUserInfo) {
    const res = await request.post('http://localhost:3001/users',{
      data:{
        "firstName": newUserInfo.firstName,
        "lastName": newUserInfo.lastName,
        "username": newUserInfo.username,
        "password": newUserInfo.password,
        "confirmPassword": newUserInfo.confirmPassword
      }
    })
    expect(res.status()).toBe(201)
  }

  randomLetters(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async openPage(page: Page, url: string) {
    await page.goto(url)
  }
}

