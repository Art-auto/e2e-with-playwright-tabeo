import { expect, Locator, Page } from '@playwright/test'

export class IconPackPage {
  readonly page: Page
  readonly signupButton: Locator
  readonly emailSpan: Locator

  constructor(page: Page) {
    this.page = page
    this.signupButton = page.locator('button', { hasText: 'Sign in' })
    this.emailSpan = page.locator('.text-gray-600')
  }

  async open() {
    await this.page.goto('/')
  }

  async clickSignup() {
    await this.signupButton.click()
  }

  async openSignupLink(link: string) {
    await this.page.goto(link)
  }

  async verifyUserLoggedIn(userEmail: string) {
    await expect(this.signupButton).not.toBeVisible()
    await expect(this.emailSpan).toHaveText(userEmail)
  }
}