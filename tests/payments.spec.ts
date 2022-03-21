import { test } from '@playwright/test'
import { IconPackPage } from '../pages/iconPack'
import { SignInModal } from '../pages/signInModal'
import { GoogleAuth } from '../pages/googleAuth'
import Mailosaur from 'mailosaur'
import MailosaurConfig from '../fixtures/mailosaurConfig'

test.beforeEach(async ({ page }) => {
  const iconPackPage = new IconPackPage(page)
  await iconPackPage.open()
})
test.describe('Application UI Icon Pack', () => {
  const mailosaurServerId = MailosaurConfig.serverId
  const mailosaurServerDomain = MailosaurConfig.serverDomain
  const mailosaurApiKey = MailosaurConfig.apiKey

  test.skip('Pay now flow - succeeded transaction', async ({ page }) => {
    const iconPackPage = new IconPackPage(page)
  })
})
