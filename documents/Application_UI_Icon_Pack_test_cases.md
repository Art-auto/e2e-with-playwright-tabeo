# Test cases

## 1. Sign-up using MagicLink.
```diff 
- High priority
```
**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser

**Steps**

1. Click the "Sign in" button.
2. Enter valid user email into the "Email address" input field on the "Sign in to your account" modal.
3. Click the "Sing in with email" button.
4. Reach the email inbox of the user email provided.

**Expected result**
 
- Email inbox contains an email with the Magic link.
- User is logged in into the app after clicking the Magic link.

---

## Email address field should be required
```diff 
+ Medium priority
```
**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser

**Steps**

1. Click the "Sign in" button.
2. Leave the "Email address" input empty and click the "Sing in with email" button.

**Expected result**
 
- Tooltip with the message "Please fill in this page" is shown close to the "Email address" input.
- User remains not logged in.

---

## Valid email should be used
```diff 
+ Medium priority
```
**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser

**Steps**

1. Click the "Sign in" button.
2. Enter not valid user email into the "Email address" input field on the "Sign in to your account" modal.
3. Click the "Sing in with email" button.

**Expected result**
 
- Tooltip with the message "Please enter an email address" is shown close to the "Email address" input.
- User remains not logged in.

---
## 2. Sign-up using Google Auth.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser

**Steps**

1. Click the "Sign in" button.
2. Click the "Sign in with Google" button on the "Sign in to your account" modal.
3. Verify user is redirected to the https://accounts.google.com page.
4. Enter valid google account credentials.

**Expected result**
- The user is authenticated in the Tabeo app.
---
## 3. Pay now flow - succeeded transaction.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser
- The user is logged in

**Steps**

1. Click the "Pay £220" button.
2. On the Stripe "Pay with card" page enter the valid Card information to have succeeded transaction.
3. Click the "Pay" button.
4. Complete the 3D Secure authentication.

**Expected result**
- Payment is succeeded.
- User is redirected to the "Your purchase is ready to be downloaded." page.

---

## 4. Pay monthly flow - succeeded transaction.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser
- The user is logged in

**Steps**

1. Click the "Pay £20/mo" button.
2. On the Stripe "Pay with card" page enter the valid Card information to have succeeded transaction.
3. Click the "Pay" button.
4. Complete the 3D Secure authentication.

**Expected result**
- Payment is succeeded.
- User is redirected to the "Your purchase is ready to be downloaded." page.

---

## 5. Pay now flow - Failed transaction.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser
- The user is logged in

**Steps**

1. Click the "Pay £220" button.
2. On the Stripe "Pay with card" page enter the Card information to have failed transaction.
3. Click the "Pay" button.
4. Complete the 3D Secure authentication.

**Expected result**
- An error is shown with the information that the card is declined.
---

## TODO. Pay monthly flow - Failed transaction.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser
- The user is logged in

**Steps**

1. Click the "Pay £20/mo" button.
2. On the Stripe "Pay with card" page enter the Card information to have failed transaction.
3. Click the "Pay" button.
4. Complete the 3D Secure authentication.

**Expected result**
- An error is shown with the information that the card is declined.
---
## 6. Returning users - Pay monthly flow.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser
- The user is logged in

**Steps**

1. Click the "Pay £20/mo" button.
2. On the Stripe "Pay with card" page click "Back" button.

**Expected result**
- User is redirected back to the [Application UI Icon Pack](https://qa-challenge-tabeo.vercel.app/?canceled=true) page.
- Payment is cancelled.
---
## TODO. Returning users - Pay now flow.
```diff 
- High priority
```

**Pre-conditions**
- [Application UI Icon Pack
Product information](https://qa-challenge-tabeo.vercel.app/) page is opened in a browser
- The user is logged in

**Steps**

1. Click the "Pay £220" button.
2. On the Stripe "Pay with card" page click "Back" button.

**Expected result**
- User is redirected back to the [Application UI Icon Pack](https://qa-challenge-tabeo.vercel.app/?canceled=true) page.
- Payment is cancelled.
