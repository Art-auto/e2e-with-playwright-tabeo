import { test } from '@playwright/test'
import { IconPackPage } from '../pages/iconPack'
import { SignInModal } from '../pages/signInModal'
import { StripePage } from '../pages/stripe'
import Mailosaur from 'mailosaur'
import MailosaurConfig from '../fixtures/mailosaurConfig'

const mailosaurServerId = MailosaurConfig.serverId
const mailosaurServerDomain = MailosaurConfig.serverDomain
const mailosaurApiKey = MailosaurConfig.apiKey
const testEmail = `${new Date().getTime()}@${mailosaurServerDomain}`

test.beforeAll(async ({browser}) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const iconPackPage = new IconPackPage(page)
    const signInModal = new SignInModal(page)
    const mailosaur = new Mailosaur(mailosaurApiKey)
    // TODO make API request to get MagicLink generated
    // Another possible solution is to seed into database access token with long life time for testing
    await iconPackPage.open()
    await iconPackPage.clickSignup()
    await signInModal.verifyOpened()
    await signInModal.typeEmail(testEmail)
    await signInModal.clickSignInWihEmailButton()
    await signInModal.verifyEmailSent()
    const {text} = await mailosaur.messages.get(mailosaurServerId, {
      sentTo: testEmail
    })
    // ---------------------------------------------------
    await iconPackPage.openSignupLink(text.links[0].href)
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await context.storageState({ path: 'state.json' })
    await page.close()
})

test.describe('Application UI Icon Pack', () => {

  test('Pay now flow - succeeded transaction', async ({ browser, browserName }) => {
    test.skip(browserName === 'webkit', 'Need to solve a problem with navigation')
    const context = await browser.newContext({ storageState: 'state.json' })
    const page = await context.newPage()
    const iconPackPage = new IconPackPage(page)
    const stripePage = new StripePage(page)

    await iconPackPage.open()
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await iconPackPage.clickPayNowButton()
    await stripePage.completePayment()
    await iconPackPage.verifyPurchaseSuccess()
    await page.close()
  })
  test('Pay monthly flow - succeeded transaction', async ({ browser, browserName }) => {
    test.skip(browserName === 'webkit', 'Need to solve a problem with navigation')
    const context = await browser.newContext({ storageState: 'state.json' })
    const page = await context.newPage()
    const iconPackPage = new IconPackPage(page)
    const stripePage = new StripePage(page)

    await iconPackPage.open()
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await iconPackPage.clickPayMonthlyButton()
    await stripePage.completePayment()
    await iconPackPage.verifyPurchaseSuccess()
    await page.close()
  })
  test('Pay now flow - Failed transaction.', async ({ playwright, browserName }) => {
    test.skip(browserName === 'webkit', 'Need to solve a problem with navigation')
    const browser = await playwright[browserName].launch()
    const context = await browser.newContext({ storageState: 'state.json' })
    const page = await context.newPage()
    const iconPackPage = new IconPackPage(page)
    const stripePage = new StripePage(page)

    await iconPackPage.open()
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await iconPackPage.clickPayNowButton()
    await stripePage.failPayment()
    await stripePage.clickBackButton()
    await iconPackPage.verifyPaymentCancelled(testEmail)
    await browser.close()
  })
  test('Pay monthly flow - Failed transaction', async ({ playwright, browserName }) => {
    test.skip(browserName === 'webkit', 'Need to solve a problem with navigation')
    const browser = await playwright[browserName].launch()
    const context = await browser.newContext({ storageState: 'state.json' })
    const page = await context.newPage()
    const iconPackPage = new IconPackPage(page)
    const stripePage = new StripePage(page)

    await iconPackPage.open()
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await iconPackPage.clickPayMonthlyButton()
    await stripePage.failPayment()
    await stripePage.clickBackButton()
    await iconPackPage.verifyPaymentCancelled(testEmail)
    await browser.close()
  })
  test('Returning users - Pay monthly flow', async ({ browser, browserName }) => {
    test.skip(browserName === 'webkit', 'Need to solve a problem with navigation')
    const context = await browser.newContext({ storageState: 'state.json' })
    const page = await context.newPage()
    const iconPackPage = new IconPackPage(page)
    const stripePage = new StripePage(page)

    await iconPackPage.open()
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await iconPackPage.clickPayMonthlyButton()
    await stripePage.verifyOpened()
    await stripePage.clickBackButton()
    await iconPackPage.verifyPaymentCancelled(testEmail)
    await page.close()
  })
})
