import { expect, type Locator, type Page } from '@playwright/test'

export class SignUpPage {
  readonly page: Page
  readonly signUpTitle: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly signUpButton: Locator
  readonly firstNameError: Locator
  readonly lastNameError: Locator
  readonly usernameError: Locator
  readonly passwordError: Locator
  readonly confirmPasswordError: Locator

  constructor(page: Page) {
    this.page = page
    this.signUpTitle = page.locator('[data-test = "signup-title"]')
    this.firstNameInput = page.locator('#firstName')
    this.lastNameInput = page.locator('#lastName')
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.confirmPasswordInput = page.locator('#confirmPassword')
    this.signUpButton = page.locator('[data-test = "signup-submit"]') // rewrite using getByTestId ???
    this.firstNameError = page.locator('#firstName-helper-text')
    this.lastNameError = page.locator('#lastName-helper-text')
    this.usernameError = page.locator('#username-helper-text')
    this.passwordError = page.locator('#password-helper-text')
    this.confirmPasswordError = page.locator('#confirmPassword-helper-text')
  }

  async verifyPageTitle(expectedText: string) {
    await expect(this.signUpTitle).toHaveText(expectedText)
  }

  async fillPasswordInput(passwordText: string) {
    await this.passwordInput.fill(passwordText)
  }

  async fillConfirmPasswordInput(passwordText: string) {
    await this.confirmPasswordInput.fill(passwordText)
  }

  async fillregistrtionData(registrationData) {
    await this.firstNameInput.fill(registrationData.firstName)
    await this.lastNameInput.fill(registrationData.lastName)
    await this.usernameInput.fill(registrationData.username)
    await this.fillPasswordInput(registrationData.password)
    await this.fillConfirmPasswordInput(registrationData.password)
  }

  async clickSignUpButton() {
    await this.signUpButton.click()
  }

  async clickFirstNameInput() {
    await this.firstNameInput.click()
  }

  async clickLastNameInput() {
    await this.lastNameInput.click()
  }

  async clickUsernameInput() {
    await this.usernameInput.click()
  }

  async clickPasswordInput() {
    await this.passwordInput.click()
  }

  async clickConfirmPasswordInput() {
    await this.confirmPasswordInput.click()
  }

  async verifyFirstNameError(expectedText: string) {
    await expect(this.firstNameError).toHaveText(expectedText)
  }

  async verifyLastNameError(expectedText: string) {
    await expect(this.lastNameError).toHaveText(expectedText)
  }

  async verifyUsernameError(expectedText: string) {
    await expect(this.usernameError).toHaveText(expectedText)
  }

  async verifyPasswordError(expectedText: string) {
    await expect(this.passwordError).toHaveText(expectedText)
  }

  async verifyConfirmPasswordError(expectedText: string) {
    await expect(this.confirmPasswordError).toHaveText(expectedText)
  }

  async verifySignUpButtonIsDisabled(isDisabled: boolean) {
    (isDisabled) ? expect(this.signUpButton).toBeDisabled() : expect(this.signUpButton).toBeEnabled()
  }
}

