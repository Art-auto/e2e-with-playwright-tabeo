# e2e-with-playwright-tabeo

## How to run tests
- checkout to the branch `test-cases`
- add the `.env` file to the root of the directory using `.env.example` as a template
- run command `npm ci` to install dependencies
- run command `npm run test` to run tests

If you want to run tests in specific browser use one the following commands:

`npm run webkit`

`npm run chromium`

`npm run firefox`

## Task
1. Create a series of manual test cases that cover the sign-up (MagicLink and Google Auth) and payment flows (pay now, pay monthly) plus other edge cases such as failed payments, returning users etc. Make sure you give detailed instructions for each test case (preconditions, steps, expected results). You can use any format you want.

2. Write scripts that would automate the manual test cases that you see fit to be included in a regression test set using JavaScript/TypeScript.  

3. For payment purposes please use the test bank cards
4. Please complete the assessment within 7 days and push a repo with the document containing the manual test cases and the automation source code to GitHub. Make sure to write instructions on how your automated tests can be run (preferably using Docker).
