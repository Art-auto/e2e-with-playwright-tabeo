import { expect, Locator, Page } from '@playwright/test'

export class SignInModal {
  readonly page: Page
  readonly modal: Locator
  readonly modalHeader: Locator
  readonly emailInput: Locator
  readonly signInWithEmailButton: Locator

  constructor(page: Page) {
    this.page = page
    this.modal = page.locator('[id=headlessui-portal-root]')
    this.modalHeader = this.modal.locator('h3')
    this.emailInput = this.modal.locator('input[id=email]')
    this.signInWithEmailButton = this.modal.locator('button', { hasText: 'Sign in with email' })
  }

  async verifyOpened() {
    await expect(this.modal).toHaveCount(1)
    await expect(this.modalHeader).toBeVisible()
    await expect(this.modalHeader).toHaveText('Sign in to your account')
  }

  async verifyEmailSent() {
    await expect(this.modalHeader).toHaveText('Check your email', {timeout: 15000})
  }

  async typeEmail(email) {
    await this.emailInput.type(email)
    await expect(this.emailInput).toHaveValue(email)
  }

  async clickSignInWihEmailButton() {
    await this.signInWithEmailButton.click()
  }

}