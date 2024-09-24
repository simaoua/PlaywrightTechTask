import { expect, type Locator, type Page } from '@playwright/test'

export class AuthenticationPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly signInButton: Locator
  readonly signUpLink: Locator
  readonly usernameError: Locator
  readonly passwordError: Locator
  readonly signInError: Locator
  readonly rememberCheckbox: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.signInButton = page.locator('[data-test="signin-submit"]')
    this.signUpLink = page.locator('[data-test="signup"]')
    this.usernameError = page.locator('#username-helper-text')
    this.passwordError = page.locator('#password-helper-text')
    this.signInError = page.locator('[data-test="signin-error"]')
    this.rememberCheckbox = page.locator('input[name="remember"]')
  }

  async fillUsernameInput(textToFill: string) {
    await this.usernameInput.fill(textToFill)
  }

  async clickUsernameInput() {
    await this.usernameInput.click()
  }

  async fillPasswordInput(textToFill: string) {
    await this.passwordInput.fill(textToFill)
  }

  async clickPasswordInput() {
    await this.passwordInput.click()
  }

  async clickSignInButton() {
    await this.signInButton.click()
  }

  async clickRememberCheckbox() {
    await this.rememberCheckbox.click()
  }

  async loginToTheApp(login: string, password: string, clickCheckbox = false) {
    await this.fillUsernameInput(login)
    await this.fillPasswordInput(password)
    if (clickCheckbox) { 
      this.clickRememberCheckbox()
    }
    await this.clickSignInButton()
  }

  async clickSignUpLink() {
    await this.signUpLink.click()
  }

  async verifyUsernameErrorText(expectedText: string) {
    await expect(this.usernameError).toHaveText(expectedText)
  }

  async verifyPasswordErrorText(expectedText: string) {
    await expect(this.passwordError).toHaveText(expectedText)
  }

  async verifySignInButtonIsDisabled(isDisabled: boolean) {
    (isDisabled) ? expect(this.signInButton).toBeDisabled() : expect(this.signInButton).toBeEnabled()
  }

  async verifySignInError(expectedText: string) {
    await expect(this.signInError).toHaveText(expectedText)
  }



}

