import { expect, Locator, Page } from '@playwright/test'

export class IconPackPage {
  readonly page: Page
  readonly signupButton: Locator
  readonly emailSpan: Locator
  readonly payNowButton: Locator
  readonly purchaseTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.signupButton = page.locator('button', { hasText: 'Sign in' })
    this.emailSpan = page.locator('.text-gray-600')
    this.payNowButton = page.locator('button', { hasText: 'Pay £220'})
    this.purchaseTitle = page.locator('p', { hasText: 'Your purchase is ready to be downloaded.'})
  }

  async open() {
    await this.page.goto('/')
  }

  async openSignupLink(link: string) {
    await this.page.goto(link)
  }

  async clickSignup() {
    await this.signupButton.click()
  }

  async clickPayNowButton () {
    await Promise.all([
      this.page.waitForNavigation(),
      this.payNowButton.click()
    ])
  }

  async verifyUserLoggedIn(userEmail: string) {
    await expect(this.signupButton).not.toBeVisible()
    await expect(this.emailSpan).toHaveText(userEmail)
  }

  async verifyPurchaseSuccess() {
    await this.page.waitForURL(/\/success\//)
    await expect(this.purchaseTitle).toBeVisible()
  }
}