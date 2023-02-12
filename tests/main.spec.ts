import { expect, test } from '@playwright/test';

test('Login page element properties', async ({ page }) => {
  await page.goto('https://app.cumul.io/home/login');

  await expect(page).toHaveTitle(/Login/);
  await expect(page).toHaveURL('https://app.cumul.io/home/login');
  await expect(page.locator("//input[@id='login-email']")).toBeEditable();
  await expect(page.locator("//input[@id='login-password']")).toBeEditable();
  await expect(
    page.locator("//a[contains(text(),'Sign up now!')]")
  ).toBeEnabled();
  await expect(
    page.locator("//a[contains(text(),'Forgot password?')]")
  ).toBeEnabled();
  page.close();
});

test('Login Functionality with email and password', async ({ page }) => {
  await page.goto('https://app.cumul.io/home/login');

  await page
    .locator("//input[@id='login-email']")
    .fill('priyabratadas.oec@gmail.com');
  await page.locator("//input[@id='login-password']").fill('Test123');
  await page.locator("//span[contains(text(),'Log in')]").click();
  await expect(
    page.locator(
      "//div[contains(text(),'The given login details are not valid.')]"
    )
  ).toHaveText('The given login details are not valid.');
  page.close();
});

test('Login Page Data storage tenancy change', async ({ page }) => {
  await page.goto('https://app.cumul.io/home/login');
  await page
    .locator(
      '//body/app-root[1]/app-login[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[2]/div[1]/div[1]/div[1]/img[1]'
    )
    .click();
  await page
    .locator(
      '//body/app-root[1]/app-login[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[2]/div[1]/div[1]/div[2]/li[2]/div[1]'
    )
    .click();
  await expect(page).toHaveURL('https://app.us.cumul.io/home/login');
  page.close();
});

test('Verify Forget password', async ({ page }) => {
  await page.goto('https://app.cumul.io/home/login');
  await page.locator("//a[contains(text(),'Forgot password?')]").click();
  await expect(
    page.locator("//h3[contains(text(),'Forgot password?')]")
  ).toHaveText('Forgot password?');
  await expect(page.locator("//input[@id='forgot-email']")).toBeEditable();
  await expect(
    page.locator("//span[contains(text(),'Request password reset')]")
  ).toBeDisabled();
  await page.locator("//input[@id='forgot-email']").fill('test@gmail.com');
  await expect(
    page.locator("//span[contains(text(),'Request password reset')]")
  ).toBeEnabled();
  await page.locator("//button[contains(text(),'Cancel')]").click();
  await expect(page.locator("//h3[contains(text(),'Welcome!')]")).toContainText(
    'Welcome!'
  );
  page.close();
});

test('Verify Sign Up page redirection', async ({ page }) => {
  await page.goto('https://app.cumul.io/home/login');
  await page.locator("//a[contains(text(),'Sign up now!')]").click();
  await expect(page).toHaveURL('https://app.cumul.io/signup');
  await expect(page).toHaveTitle(
    /Try Embedded Analytics | Free 10-day Cumul.io Trial/
  );
  page.close();
});
