import { test } from '@playwright/test'
import { IconPackPage } from '../pages/iconPack'
import { SignInModal } from '../pages/signInModal'
import { StripePage } from '../pages/stripe'
import Mailosaur from 'mailosaur'
import MailosaurConfig from '../fixtures/mailosaurConfig'
import generateRandomInteger from '../utils/generateRandomNumber'
import { SecurityModal } from '../pages/stripeSecurityModal'

const mailosaurServerId = MailosaurConfig.serverId
const mailosaurServerDomain = MailosaurConfig.serverDomain
const mailosaurApiKey = MailosaurConfig.apiKey
const testEmail = `${new Date().getTime()}@${mailosaurServerDomain}`

const cardForSuccessPayment = process.env.CARD_NUMBER_FOR_SUCCESS_PAYMENT
const month = generateRandomInteger(1, 12)
const yearInFuture = generateRandomInteger(25, 50)
const CVCNumber = generateRandomInteger(100, 999)

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
});

test.describe('Application UI Icon Pack', () => {

  test('Pay now flow - succeeded transaction', async ({ browser, browserName }) => {
    test.skip(browserName === 'webkit', 'Need to solve a problem with navigation')
    const context = await browser.newContext({ storageState: 'state.json' })
    const page = await context.newPage()
    const iconPackPage = new IconPackPage(page)
    const stripePage = new StripePage(page)
    const securityModal = new SecurityModal(page)

    await iconPackPage.open()
    await iconPackPage.verifyUserLoggedIn(testEmail)
    await iconPackPage.clickPayNowButton()
    await stripePage.verifyOpened()
    await stripePage.typeCardNumber(cardForSuccessPayment)
    await stripePage.typeCardExpirationDate(month, yearInFuture)
    await stripePage.typeCVCNumber(CVCNumber)
    await stripePage.typeCardName('Fname Lname')
    await stripePage.clickPayButton()
    await securityModal.completeAuthentication()
    await iconPackPage.verifyPurchaseSuccess()
  })
})
