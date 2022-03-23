import { expect, Locator, Page } from '@playwright/test'

export class StripePage {
  readonly page: Page
  readonly paymentHeader: Locator
  readonly cardNumberInput: Locator
  readonly cardExpirationDateInput: Locator
  readonly cardCVCInput: Locator
  readonly cardNameInput: Locator
  readonly payButton: Locator

  constructor(page: Page) {
    this.page = page
    this.paymentHeader = page.locator('.PaymentHeader div')
    this.cardNumberInput = page.locator('id=cardNumber')
    this.cardNameInput = page.locator('id=billingName')
    this.cardExpirationDateInput = page.locator('id=cardExpiry')
    this.cardCVCInput = page.locator('id=cardCvc')
    this.payButton = page.locator('.SubmitButton')
  }

  async verifyOpened() {
    await expect(this.page.url()).toContain('https://checkout.stripe.com/pay/')
    await expect(this.paymentHeader).toHaveText('Pay with card')
  }

  async clickPayButton() {
    await this.payButton.click()
  }

  async typeCardNumber(cardNumber: string) {
    await this.cardNumberInput.fill(cardNumber)
    await expect(this.cardNumberInput).toHaveValue(cardNumber)
  }

  async typeCardExpirationDate(day: number, month: number) {
    await this.cardExpirationDateInput.fill(`${day}${month}`)
  }

  async typeCVCNumber(cvc: number) {
    await this.cardCVCInput.fill(`${cvc}`)
    await expect(this.cardCVCInput).toHaveValue(`${cvc}`)
  }

  async typeCardName(name: string) {
    await this.cardNameInput.fill(name)
    await expect(this.cardNameInput).toHaveValue(name)
  }

}