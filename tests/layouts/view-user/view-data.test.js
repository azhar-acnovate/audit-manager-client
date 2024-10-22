const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('User View Page - Automated Tests', function () {
  let driver;
  this.timeout(70000); 
  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  after(async function () {
    if (driver) {
      await sleep(60000);
      await driver.quit();
    }
  });

// Function to handle login and set role in localStorage
async function login() {
  await driver.get('http://localhost:3000/audit-manager/authentication/sign-in');
  await driver.manage().window().setRect({ width: 1050, height: 660 });

  const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
  await usernameField.sendKeys('admin');
  const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
  await passwordField.sendKeys('admin@123');

  const submitButton = await driver.wait(until.elementLocated(By.css('*[id="submitbtn"]')), 10000);
  await driver.wait(until.elementIsVisible(submitButton), 10000);
  await submitButton.click();
  await driver.wait(until.urlIs('http://localhost:3000/audit-manager/dashboard'), 20000);

  // After successful login, store user role (assuming "admin" is the role for now) in localStorage using executeScript
  await driver.executeScript(() => {
    localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
  });

  await driver.navigate().refresh();
}

  it('load the user view page successfully', async function () {
    await login();
    await driver.get('http://localhost:3000/audit-manager/master-data-management/user-data');

    const pageTitle = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'User View')]")), 10000);
    const titleText = (await pageTitle.getText()).trim().toLowerCase();

    console.log(`Actual page title: "${titleText}"`);
    assert.equal(titleText, 'user view', 'The page title should be "User View"');
  });
});
