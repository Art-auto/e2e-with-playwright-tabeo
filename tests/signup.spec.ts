import { test } from '@playwright/test'
import { IconPackPage } from '../pages/iconPack'
import { SignInModal } from '../pages/signInModal'
import { GoogleAuth } from '../pages/googleAuth'
import Mailosaur from 'mailosaur'
import MailosaurConfig from '../fixtures/mailosaurConfig'

test.describe('Application UI Icon Pack', () => {
  const mailosaurServerId = MailosaurConfig.serverId
  const mailosaurServerDomain = MailosaurConfig.serverDomain
  const mailosaurApiKey = MailosaurConfig.apiKey

  test.beforeEach(async ({ page }) => {
    const iconPackPage = new IconPackPage(page)
    await iconPackPage.open()
  })
  test('Sign-up using MagicLink', async ({ page }) => {
    const iconPackPage = new IconPackPage(page)
    const signInModal = new SignInModal(page)
    const mailosaur = new Mailosaur(mailosaurApiKey)
    const testEmail = `${new Date().getTime()}@${mailosaurServerDomain}`

    await iconPackPage.clickSignup()
    await signInModal.verifyOpened()
    await signInModal.typeEmail(testEmail)
    await signInModal.clickSignInWihEmailButton()
    await signInModal.verifyEmailSent()
    const {text} = await mailosaur.messages.get(mailosaurServerId, {
      sentTo: testEmail
    })
    await iconPackPage.openSignupLink(text.links[0].href)
    await iconPackPage.verifyUserLoggedIn(testEmail)
  })
  test('Sign-up using Google Auth', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Still working on it')
    test.skip(browserName === 'chromium', 'Still working on it')

    const iconPackPage = new IconPackPage(page)
    const signInModal = new SignInModal(page)
    const googleAuth = new GoogleAuth(page)

    await iconPackPage.clickSignup()
    await signInModal.verifyOpened()
    await signInModal.clickSignInWihGoogleButton()
    await googleAuth.loginUsingGoogleAcc()
    await iconPackPage.verifyUserLoggedIn(process.env.GOOGLE_USER_ACCOUNT_NAME)
  })
})
