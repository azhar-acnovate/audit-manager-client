const { Builder, By, until } = require('selenium-webdriver');

describe('User View Navigation Test', function () {
  let driver;
  this.timeout(120000); // Increase to 120 seconds

  before(async function () {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

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

    // Wait for successful login
    await driver.wait(until.urlIs('http://localhost:3000/audit-manager/dashboard'), 20000);

    // Store user role in localStorage
    await driver.executeScript(() => {
      localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
    });
  }

  // Logout Function
  async function logout() {
    console.log('Logging out...');
    const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
    await logoutButton.click();

    // Wait for successful logout
    console.log('Waiting for logout...');
    await driver.wait(until.urlIs('http://localhost:3000/audit-manager/authentication/sign-in'), 20000);
  }

  // Navigate to User View Page
  it('login', async function () {
    await login();
    console.log('Navigating to User View page...');
    await driver.get("http://localhost:3000/audit-manager/master-data-management/user-data");

    // Adding a wait for the page to load
    await driver.sleep(5000);

    // Wait for the User View title to ensure we're on the right page
    try {
      await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'User Data')]")), 30000);
      console.log("User View title located.");
    } catch (error) {
      console.error("Error locating User View title:", error);
      throw new Error("User View title not found");
    }
  });
});

