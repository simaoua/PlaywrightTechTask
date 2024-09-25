import { expect, type Locator, type Page } from '@playwright/test'
import { HelpersFunctions } from '../helpers/helpersFunctions'

export class MainPage {
  readonly page: Page
  readonly onboardingDialogWindow: Locator
  readonly listSkeleton: Locator
  readonly navTopNotificationCount: Locator
  readonly nextButton: Locator
  readonly createBankAccountWindowTitle: Locator
  readonly bankName: Locator
  readonly routingNumber: Locator
  readonly accountNumber: Locator
  readonly saveButton: Locator
  readonly finishedWindowTitle: Locator
  readonly finishedWindowContent: Locator
  readonly doneButton: Locator
  readonly transactionList: Locator
  readonly sidenavToggle: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.onboardingDialogWindow = page.locator('[data-test = "user-onboarding-dialog"]')
    this.listSkeleton = page.locator('[data-test = "list-skeleton"]')
    this.navTopNotificationCount = page.locator('[data-test="nav-top-notifications-count"]')
    this.nextButton = page.locator('[data-test="user-onboarding-next"]')
    this.createBankAccountWindowTitle = page.locator('[data-test="user-onboarding-dialog-title"]')
    this.bankName = page.locator('#bankaccount-bankName-input')
    this.routingNumber = page.locator('#bankaccount-routingNumber-input')
    this.accountNumber = page.locator('#bankaccount-accountNumber-input')
    this.saveButton = page.locator('[data-test="bankaccount-submit"]')
    this.finishedWindowTitle = page.locator('[data-test="user-onboarding-dialog-title"]')
    this.finishedWindowContent = page.locator('[data-test="user-onboarding-dialog-content"]')
    this.doneButton = page.locator('[data-test="user-onboarding-next"]')
    this.transactionList = page.locator('[data-test="transaction-list"]')
    this.sidenavToggle = page.locator('[data-test="sidenav-toggle"]')
    this.logoutButton = page.locator('[data-test="sidenav-signout"]')
  }

  async verifyDialofWindowIsVisible() {
    await (expect(this.onboardingDialogWindow)).toBeVisible()
  }

  async verifyIfSkeletonListExists(isExist: boolean) {
    (isExist) ? await (expect(this.listSkeleton)).toHaveCount(1) : await (expect(this.listSkeleton)).toHaveCount(0)
  }

  async verifyIfNavTopNotificationCountExists(isExist: boolean) {
    (isExist) ? await (expect(this.navTopNotificationCount)).toHaveCount(1) : await (expect(this.navTopNotificationCount)).toHaveCount(0)
  }

  async clickNextButton() {
    await this.nextButton.click()
  }

  async verifyCreateBankAccountWindowTitle(expectedTitleText: string) {
    await (expect(this.createBankAccountWindowTitle)).toHaveText(expectedTitleText)
  }

  async fillBankingInfo(bankingInfo) {
    await this.bankName.fill(bankingInfo.bankName)
    await this.routingNumber.fill(bankingInfo.routingNumber)
    await this.accountNumber.fill(bankingInfo.accountNumber)
  }

  async clickSaveButton() {
    await this.saveButton.click()
  }

  async verifyFinishedWindowTexts(finishedWindowTexts) {
    await expect(this.finishedWindowTitle).toHaveText(finishedWindowTexts.expectedTitleText)
    await expect(this.finishedWindowContent).toHaveText(finishedWindowTexts.expectedContentText)
  }

  async clickDoneButton() {
    await this.doneButton.click()
  }

  async verifyTransactionListIsVisible() {
    await expect(this.transactionList).toBeVisible()
  }

  async verifyUrlContains(page: Page, partOfUrl: string) {
    await expect(page).toHaveURL(partOfUrl)
  }

  async logoutUser(page: Page) {
    const Helpers = new HelpersFunctions(page)
    if (!await Helpers.verifyIsDesktopMode(page)) {
      await this.sidenavToggle.click()
    }
    await this.logoutButton.click()
  }

  async passOnboarding(bankingInfo: object) {
    await this.clickNextButton()
    await this.fillBankingInfo(bankingInfo)
    await this.clickSaveButton()
    await this.clickDoneButton()
  }
}

