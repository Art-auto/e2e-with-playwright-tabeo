import { test, expect } from '@playwright/test'
import { IconPackPage } from '../pages/iconPack'

test.beforeEach(async ({ page }) => {
  const iconPackPage = new IconPackPage(page)
  await iconPackPage.open()
})
test.describe('Application UI Icon Pack', () => {
  test('Sign-up using MagicLink', async ({ page }) => {
    const iconPackPage = new IconPackPage(page)
    
  })
})
