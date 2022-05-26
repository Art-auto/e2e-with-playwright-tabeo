import { Locator, Page } from '@playwright/test'

export class GoogleAuth {
  readonly page: Page
  readonly emailInput: Locator
  readonly nextButton: Locator
  readonly passwordInput: Locator
  readonly passwordNextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('input[type="email"]')
    this.nextButton = page.locator("#identifierNext")
    this.passwordInput = page.locator('input[type="password"]')
    this.passwordNextButton = page.locator("#passwordNext")
  }
  

  async loginUsingGoogleAcc() {
    await this.emailInput.fill(process.env.GOOGLE_USER_EMAIL)
    await this.nextButton.click()
  
    await this.passwordInput.fill(process.env.GOOGLE_PWD)
    await Promise.all([
      this.page.waitForNavigation(),
      this.passwordNextButton.click()
    ])
  }
}