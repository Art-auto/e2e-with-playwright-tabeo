import { expect, Locator, Page } from '@playwright/test'

export class IconPackPage {
  readonly page: Page
  readonly signupButton: Locator
  readonly emailSpan: Locator
  readonly payNowButton: Locator
  readonly payMonthlyButton: Locator
  readonly purchaseTitle: Locator
  readonly baseUrl: string

  constructor(page: Page) {
    this.page = page
    this.signupButton = page.locator('button', { hasText: 'Sign in' })
    this.emailSpan = page.locator('.text-gray-600')
    this.payNowButton = page.locator('button', { hasText: 'Pay £220'})
    this.payMonthlyButton = page.locator('button', { hasText: 'Pay £20/mo'})
    this.purchaseTitle = page.locator('p', { hasText: 'Your purchase is ready to be downloaded.'})
    this.baseUrl = process.env.BASE_URL
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
    await this.payNowButton.click()
    await this.page.waitForURL(/checkout\.stripe\.com\/pay\//)
  }

  async clickPayMonthlyButton () {
    await this.payMonthlyButton.click()
    await this.page.waitForURL(/checkout\.stripe\.com\/pay\//)
  }

  async verifyUserLoggedIn(userEmail: string) {
    await expect(this.signupButton).not.toBeVisible()
    await expect(this.emailSpan).toHaveText(userEmail)
  }

  async verifyPaymentCancelled(userEmail: string) {
    await this.verifyUserLoggedIn(userEmail)
    await this.page.waitForURL(`${this.baseUrl}?canceled=true`)
    await expect(this.purchaseTitle).not.toBeVisible()
  }

  async verifyPurchaseSuccess() {
    await this.page.waitForURL(/\/success\//)
    await expect(this.purchaseTitle).toBeVisible()
  }
}