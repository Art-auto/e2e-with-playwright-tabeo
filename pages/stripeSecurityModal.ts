import { Page } from '@playwright/test'

export class SecurityModal {
  readonly page: Page
  readonly frame1Locator: string
  readonly frame2Locator: string
  readonly frame3Locator: string
  readonly completeAuthenticationButton: string
  readonly failAuthenticationButton: string

  constructor(page: Page) {
    this.page = page
    this.frame1Locator = 'body>div>iframe[src *= "https://js.stripe.com/v3/authorize-with-url-inner-"]'
    this.frame2Locator = 'iframe[id=challengeFrame]'
    this.frame3Locator = '.FullscreenFrame'
    this.completeAuthenticationButton = 'id=test-source-authorize-3ds'
    this.failAuthenticationButton = 'id="test-source-fail-3ds"'
  }

  async handleFrames() {
    await this.page.waitForSelector(this.frame1Locator)
    const elementHandle = await this.page.$(this.frame1Locator)
    const frame = await elementHandle.contentFrame()
    await frame.waitForSelector(this.frame2Locator)

    const elementHandle2 = await frame.$(this.frame2Locator)
    const frame2 = await elementHandle2.contentFrame()
    await frame2.waitForSelector(this.frame3Locator)

    const elementHandle3 = await frame2.$(this.frame3Locator)
    const frame3 = await elementHandle3.contentFrame()
    return frame3
  }

  async completeAuthentication() {
    const frame = await this.handleFrames()
    await frame.waitForSelector(this.completeAuthenticationButton)
    await Promise.all([
      frame.waitForNavigation(),
      frame.locator(this.completeAuthenticationButton).click()
    ])
  }

  async failAuthentication() {
    const frame = await this.handleFrames()
    await frame.waitForSelector(this.failAuthenticationButton)
    await Promise.all([
      frame.waitForNavigation(),
      frame.locator(this.failAuthenticationButton).click()
    ])
  }
}
