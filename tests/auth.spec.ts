import { test} from '@playwright/test'
import { AuthenticationPage } from '../pages/authenticationPage'
import { SignUpPage } from '../pages/signUpPage'
import { MainPage } from '../pages/mainPage'
import { HelpersFunctions } from '../helpers/helpersFunctions'

let newUserInfo
let pixelDiff = 650 // new user with random username is created, so every test there will be difference on the screenshot

test.beforeEach(async ({ request, page }) => {
  const Helpers = new HelpersFunctions(page)
  newUserInfo = {
    firstName: 'Firsttt' + Helpers.randomLetters(3),
    lastName: 'Lasttt' + Helpers.randomLetters(3),
    username: 'username' + Helpers.randomLetters(5),
    password: '111111',
    confirmPassword: '111111'
  }
  const homePageUrl = '/'

  // Create new user
  await Helpers.createNewUser(request, newUserInfo)
  await Helpers.openPage(page, homePageUrl)
});

test.describe('Authentication playwright tests', () => {
  test('should redirect unauthenticated user to signin page', async ({ page }) => {
    const Helpers = new HelpersFunctions(page)
    const personalPage = '/personal'
    const screenshot1 = '1_1.png'
    const partOfUrl = '/signin'

    // Verify the redirect to sign in page
    await Helpers.openPage(page, personalPage)
    await Helpers.verifyUrlContains(page, partOfUrl)
    await Helpers.verifyScreenshot(page, screenshot1)
  })

  test('should redirect to the home page after login', async ({ page }) => {
    const AuthenticationP = new AuthenticationPage(page)
    const Helpers = new HelpersFunctions(page)
    const homePageUrl = '/'

    // Log in with a user
    await AuthenticationP.loginToTheApp(newUserInfo.username, newUserInfo.password)

    // Verify the url
    await Helpers.verifyUrlContains(page, homePageUrl)
  })

  test('should remember a user for 30 days after login', async ({ page }) => {
    const AuthenticationP = new AuthenticationPage(page)
    const Helpers = new HelpersFunctions(page)
    const MainP = new MainPage(page)
    const homePageUrl = '/'
    const signInPageUrl = '/signin'
    const theFirstScreenshot = '3_1.png'
    const bankingInformation = {
      bankName: 'The Best Bank',
      routingNumber: '123456789',
      accountNumber: '987654321'
    }

    // Log in with a user
    await AuthenticationP.loginToTheApp(newUserInfo.username, newUserInfo.password)

    // Verify the url and cookies
    await Helpers.verifyUrlContains(page, homePageUrl)
    await Helpers.verifyExpiresCookieIsPresent(page)

    // Pass onboarding
    await MainP.passOnboarding(bankingInformation)

    // Log out
    MainP.logoutUser(page)
    await Helpers.verifyUrlContains(page, signInPageUrl)
    await Helpers.verifyScreenshot(page, theFirstScreenshot)
  })

  test('should allow a visitor to sign-up, login, and logout', async ({ page }) => {
    const AuthenticationP = new AuthenticationPage(page)
    const SignUpP = new SignUpPage(page)
    const MainP = new MainPage(page)
    const Helpers = new HelpersFunctions(page)
    const userInfo = {
      firstName: 'Bob',
      lastName: 'Ross',
      username: `PainterJoy90${Helpers.randomLetters(3)}`,
      password: 's3cret',
    }
    const bankingInformation = {
      bankName: 'The Best Bank',
      routingNumber: '123456789',
      accountNumber: '987654321'
    }
    const finishedWindowTexts = {
      expectedTitleText: 'Finished',
      expectedContentText: 'You\'re all set!We\'re excited to have you aboard the Real World App!'
    }
    const expectedTitle = 'Sign Up'
    const theFirstScreenshot = '4_1.png'
    const theSecondScreenshot = '4_2.png'
    const theThirdScreenshot = '4_3.png'
    const theFourthScreenshot = '4_4.png'
    const theFifthScreenshot = '4_5.png'
    const theSixthScreenshot = '4_6.png'
    const theSeventhScreenshot = '4_7.png'
    const signInUrl = '/signin'
  
    // Sign-up User
    await AuthenticationP.clickSignUpLink()
    await AuthenticationP.clickSignUpLink() // twice ???
    await SignUpP.verifyPageTitle(expectedTitle)
    await Helpers.verifyScreenshot(page, theFirstScreenshot)
    await SignUpP.fillregistrtionData(userInfo)
    await Helpers.verifyScreenshot(page, theSecondScreenshot, pixelDiff)
    await SignUpP.clickSignUpButton()
  
    // Login User
    await AuthenticationP.loginToTheApp(userInfo.username, userInfo.password)
  
    // Onboarding
    await MainP.verifyDialofWindowIsVisible()
    await MainP.verifyIfSkeletonListExists(false)
    await MainP.verifyIfNavTopNotificationCountExists(true)
    await Helpers.verifyScreenshot(page, theThirdScreenshot, pixelDiff)
    await MainP.clickNextButton()
    await MainP.verifyCreateBankAccountWindowTitle('Create Bank Account')
    await MainP.fillBankingInfo(bankingInformation)
    await Helpers.verifyScreenshot(page, theFourthScreenshot, pixelDiff)
    await MainP.clickSaveButton()
    await MainP.verifyFinishedWindowTexts(finishedWindowTexts)
    await Helpers.verifyScreenshot(page, theFifthScreenshot, pixelDiff)
    await MainP.clickDoneButton()
    await MainP.verifyTransactionListIsVisible()
    await Helpers.verifyScreenshot(page, theSixthScreenshot, pixelDiff)
    
    // Logout User
    MainP.logoutUser(page)
    await Helpers.verifyUrlContains(page, signInUrl)
    await Helpers.verifyScreenshot(page, theSeventhScreenshot, pixelDiff)
  })

  test('should display login errors', async ({ page }) => {
    const AuthenticationP = new AuthenticationPage(page)
    const Helpers = new HelpersFunctions(page)
    const usernameErrorText = 'Username is required'
    const passwordErrorText = 'Password must contain at least 4 characters'
    const shortPassowrd = '123'
    const theFirstScreenshot = '5_1.png'
    const theSecondScreenshot = '5_2.png'
    const theThirdScreenshot = '5_3.png'
   
    // Verify errors
    await AuthenticationP.clickUsernameInput()
    await AuthenticationP.clickPasswordInput()
    await AuthenticationP.verifyUsernameErrorText(usernameErrorText)
    await Helpers.verifyScreenshot(page, theFirstScreenshot)
    await AuthenticationP.fillPasswordInput(shortPassowrd)
    await AuthenticationP.clickUsernameInput()
    await AuthenticationP.verifyPasswordErrorText(passwordErrorText)
    await Helpers.verifyScreenshot(page, theSecondScreenshot)
    await AuthenticationP.verifySignInButtonIsDisabled(true)
    await Helpers.verifyScreenshot(page, theThirdScreenshot)
  })

  test('should display signup errors', async ({ page }) => {
    const SignUpP = new SignUpPage(page)
    const Helpers = new HelpersFunctions(page)
    const firstNameError = 'First Name is required'
    const lastNameError = 'Last Name is required'
    const usernameError = 'Username is required'
    const passwordError = 'Enter your password'
    const passwordValue1 = 'QwErTy123!'
    const passwordValue2 = 'QwErTy123'
    const confirmPasswordError1 = 'Confirm your password'
    const confirmPasswordError2 = 'Password does not match'
    const theFirstScreenshot = '6_1.png'
    const theSecondScreenshot = '6_2.png'
    const signUpPageUrl = '/signup'

    // Verify Sign Up errors
    await Helpers.openPage(page, signUpPageUrl)
    await SignUpP.clickFirstNameInput()
    await SignUpP.clickLastNameInput()
    await SignUpP.verifyFirstNameError(firstNameError)
    await SignUpP.clickUsernameInput()
    await SignUpP.verifyLastNameError(lastNameError)
    await SignUpP.clickPasswordInput()
    await SignUpP.verifyUsernameError(usernameError)
    await SignUpP.clickConfirmPasswordInput()
    await SignUpP.verifyPasswordError(passwordError)
    await SignUpP.clickPasswordInput()
    await SignUpP.verifyConfirmPasswordError(confirmPasswordError1)
    await SignUpP.fillPasswordInput(passwordValue1)
    await SignUpP.fillConfirmPasswordInput(passwordValue2)
    await SignUpP.verifyConfirmPasswordError(confirmPasswordError2)
    await Helpers.verifyScreenshot(page, theFirstScreenshot)
    await SignUpP.verifySignUpButtonIsDisabled(true)
    await Helpers.verifyScreenshot(page, theSecondScreenshot)
  })

  test('should error for an invalid user', async ({ page }) => {
    const AuthenticationP = new AuthenticationPage(page)
    const Helpers = new HelpersFunctions(page)
    const invalidName = 'invalidUserName'
    const invalidPassowrd = 'invalidPa$$word'
    const signInErrorText = 'Username or password is invalid'
    const theFirstScreenshot = '7_1.png'

    // Log in to the app
    await AuthenticationP.loginToTheApp(invalidName, invalidPassowrd)

    // Verify sign in error
    await AuthenticationP.verifySignInError(signInErrorText)
    await Helpers.verifyScreenshot(page, theFirstScreenshot)
  })

  test('should error for an invalid password for existing user', async ({ page }) => {
    const AuthenticationP = new AuthenticationPage(page)
    const Helpers = new HelpersFunctions(page)
    const validName = newUserInfo.username
    const invalidPassowrd = 'invalidPa$$word'
    const signInErrorText = 'Username or password is invalid'
    const theFirstScreenshot = '8_1.png'

    // Verify error for existing username and invalid password
    await AuthenticationP.loginToTheApp(validName, invalidPassowrd)
    await AuthenticationP.verifySignInError(signInErrorText)
    await Helpers.verifyScreenshot(page, theFirstScreenshot)
  })
})
