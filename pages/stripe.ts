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
  readonly cardForFailedPayment: string
  readonly month: number
  readonly yearInFuture: number
  readonly CVCNumber: number
  readonly cardInfoError: Locator
  readonly backButton: Locator

  constructor(page: Page) {
    this.page = page
    this.paymentHeader = page.locator('.PaymentHeader div')
    this.cardNumberInput = page.locator('id=cardNumber')
    this.cardNameInput = page.locator('id=billingName')
    this.cardExpirationDateInput = page.locator('id=cardExpiry')
    this.cardCVCInput = page.locator('id=cardCvc')
    this.payButton = page.locator('.SubmitButton')
    this.cardForSuccessPayment = process.env.CARD_NUMBER_FOR_SUCCESS_PAYMENT
    this.cardForFailedPayment = process.env.CARD_NUMBER_FOR_FAILED_PAYMENT
    this.month = generateRandomInteger(1, 12)
    this.yearInFuture = generateRandomInteger(25, 50)
    this.CVCNumber = generateRandomInteger(100, 999)
    this.cardInfoError = page.locator('div[id="cardNumber-fieldset"] .FieldError span')
    this.backButton = page.locator(`.Header-business a[href *= "${process.env.BASE_URL}"]`)
  }

  async verifyOpened() {
    await expect(this.page.url()).toContain('https://checkout.stripe.com/pay/')
    await expect(this.paymentHeader).toHaveText('Pay with card')
  }

  async verifyPaymentFailed() {
    await expect(this.cardInfoError).toBeVisible()
    await expect(this.cardInfoError).toHaveText('Your card has been declined.')
  }

  async clickPayButton() {
    await this.payButton.click({ timeout: 10 * 1000})
  }

  async clickBackButton() {
    this.page.on('dialog', async (dialog) => {
      console.log(dialog.message())
      await dialog.accept()
    })
    await this.backButton.click()
  }

  async typeCardNumber(cardNumber: string) {
    await this.cardNumberInput.fill(cardNumber)
    await expect(this.cardNumberInput).toHaveValue(cardNumber)
  }

  async typeCardExpirationDate(day: number | string, month: number) {
    if (day === 1) {
      day = '01'
    }
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

  async failPayment() {
    const securityModal = new SecurityModal(this.page)

    await this.verifyOpened()
    await this.typeCardNumber(this.cardForFailedPayment)
    await this.typeCardExpirationDate(this.month, this.yearInFuture)
    await this.typeCVCNumber(this.CVCNumber)
    await this.typeCardName('Fname Lname')
    await this.clickPayButton()
    await securityModal.completeAuthentication()
    await this.verifyPaymentFailed()
  }
}