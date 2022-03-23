import { expect, Locator, Page } from '@playwright/test'
import generateRandomInteger from '../utils/generateRandomNumber'
import { SecurityModal } from './stripeSecurityModal'

export class StripePage {
  readonly page: Page
  readonly paymentHeader: Locator
  readonly cardNumberInput: Locator
  readonly cardExpirationDateInput: Locator
  readonly cardCVCInput: Locator
  readonly cardNameInput: Locator
  readonly payButton: Locator
  readonly cardForSuccessPayment: string
  readonly month: number
  readonly yearInFuture: number
  readonly CVCNumber: number

  constructor(page: Page) {
    this.page = page
    this.paymentHeader = page.locator('.PaymentHeader div')
    this.cardNumberInput = page.locator('id=cardNumber')
    this.cardNameInput = page.locator('id=billingName')
    this.cardExpirationDateInput = page.locator('id=cardExpiry')
    this.cardCVCInput = page.locator('id=cardCvc')
    this.payButton = page.locator('.SubmitButton')
    this.cardForSuccessPayment = process.env.CARD_NUMBER_FOR_SUCCESS_PAYMENT
    this.month = generateRandomInteger(1, 12)
    this.yearInFuture = generateRandomInteger(25, 50)
    this.CVCNumber = generateRandomInteger(100, 999)
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

  async completePayment() {
    const securityModal = new SecurityModal(this.page)

    await this.verifyOpened()
    await this.typeCardNumber(this.cardForSuccessPayment)
    await this.typeCardExpirationDate(this.month, this.yearInFuture)
    await this.typeCVCNumber(this.CVCNumber)
    await this.typeCardName('Fname Lname')
    await this.clickPayButton()
    await securityModal.completeAuthentication()
  }
}