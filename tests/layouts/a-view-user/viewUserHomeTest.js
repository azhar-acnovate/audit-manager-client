const { Builder, By, until } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

describe('User View Navigation Test', function () {
  let driver;
  this.timeout(120000); // Increase to 120 seconds

  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
    await driver.manage().window().maximize(); // Maximize to fullscreen on start
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  async function login() {
    // Updated template literal syntax with backticks for URL
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`);
    await driver.manage().window().maximize();

    const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
    await usernameField.sendKeys('admin');
    const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
    await passwordField.sendKeys('admin@123');

    const submitButton = await driver.wait(until.elementLocated(By.css('*[id="submitbtn"]')), 10000);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // Updated template literal syntax for dashboard URL
    await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/dashboard`), 20000);
  }

  // Logout Function
  async function logout() {
    console.log('Logging out...');
    const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
    await logoutButton.click();

    // Updated template literal syntax for logout URL
    console.log('Waiting for logout...');
    await driver.sleep(5000);
    await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`), 20000);
  }

  // Test case 1: Login and hold at the dashboard for 4 seconds
  it('should login and stay on dashboard for 4 seconds', async function () {
    await login();
    console.log("Logged in and on dashboard.");
    await driver.sleep(4000);
    await logout();
  });

  // Test case 2: Re-login after 4 seconds and navigate to User View page
  it('should login again and navigate to User View page', async function () {
    await driver.sleep(4000);
    await login();
    console.log('Navigating to User View page...');

    const masterDataManagement = await driver.wait(
      until.elementIsVisible(driver.findElement(By.xpath("//span[text()='Master Data Management']"))),
      10000
    );

    await driver.executeScript("arguments[0].click();", masterDataManagement);

    const userDataManagementLink = await driver.wait(
      until.elementIsVisible(driver.findElement(By.xpath("//span[text()='User Data Management']"))),
      10000
    );

    await driver.executeScript("arguments[0].click();", userDataManagementLink);

    // Adding a wait for the page to load
    await driver.sleep(5000);

    // Wait for the User View title to ensure we're on the right page
    try {
      await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'user data')]")), 5000);
      console.log("User View title located.");
    } catch (error) {
      console.error("Error locating User View title:", error);
      throw new Error("User View title not found");
    }
  });
});
