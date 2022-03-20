import { Page } from '@playwright/test';

export class IconPackPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async open() {
    await this.page.goto('/')
  }

}