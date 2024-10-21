const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

describe('CreateOrUpdateUser Component - Automated Tests', function () {
  let driver;

  this.timeout(60000);

  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  async function login() {
    await driver.get("http://localhost:3000/audit-manager/authentication/sign-in");
    await driver.manage().window().setRect({ width: 1050, height: 660 });

    const usernameField = await driver.wait(until.elementLocated(By.id("username")), 10000);
    await usernameField.sendKeys("admin");
    await usernameField.sendKeys(Key.TAB);
    const passwordField = await driver.wait(until.elementLocated(By.id("password")), 10000);
    await passwordField.sendKeys("admin@123");
    const submitButton = await driver.wait(until.elementLocated(By.css('#submitbtn')), 10000);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/audit-manager/dashboard'), 20000);
  }

  async function navigateToCreateUser() {
    await driver.get("http://localhost:3000/audit-manager/master-data-management/user-data/create");
    await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Full Name']")), 10000);
  }

  async function createNewUser() {
    const fullNameInput = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Full Name']")), 10000);
    await fullNameInput.sendKeys("Himanshu Purohit");

    await fullNameInput.sendKeys(Key.TAB);

    const emailInput = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Email']")), 10000);
    await emailInput.sendKeys("himanshupurohit@example.com");

    await emailInput.sendKeys(Key.TAB);

    const usernameInput = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Username']")), 10000);
    await usernameInput.sendKeys("himanshu123");
    await usernameInput.sendKeys(Key.TAB);

    const actions = driver.actions({ bridge: true });
    await actions.sendKeys(Key.DOWN).perform();
    await actions.sendKeys(Key.ENTER).perform();

    await actions.sendKeys(Key.TAB).perform();
    await actions.sendKeys(Key.ENTER).perform();

    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'User created successfully')]")), 20000);
  }

  it('login and create a new user', async function () {
    await login();
    await navigateToCreateUser();
    await createNewUser();
  });
});
