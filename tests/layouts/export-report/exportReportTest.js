const { Builder, By, until, Key } = require('selenium-webdriver');

describe('Export Audit Report Navigation Test', function () {
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
    await driver.manage().window().setRect({ width: 1250, height: 660 });

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

  // Navigate to Export Audit Report Page and perform keyboard interactions
  it('login and navigate', async function () {
    await login();
    console.log('Navigating to Export Audit Report page...');

    // Set the browser window size to 90% of screen resolution
    await driver.executeScript(() => {
      const width = window.screen.width * 0.8;
      const height = window.screen.height * 0.8;
      window.resizeTo(width, height);
    });

    // Navigate to the Export Audit Report page
    await driver.get("http://localhost:3000/audit-manager/export-audit-report");

    // Adding a wait for the page to load
    await driver.sleep(5000);

    // Wait for the Export Audit Report page to load
    try {
      await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Steps to export Audits:')]")), 30000);
      console.log("Export Audit Report page located.");
    } catch (error) {
      console.error("Error locating Export Audit Report page:", error);
      throw new Error("Export Audit Report page not found");
    }

    // Click the "Select List" button
    const selectListButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Click to Select List(s)')]")), 10000);
    await selectListButton.click();
    console.log("Clicked 'Select List' button.");

    // Simulate pressing Tab and Space keys for selection
    const actions = driver.actions({ async: true });

    // Press Tab, then Space, then Tab, then Space, and then click the "Use" button
    await actions
      .keyDown(Key.TAB)      // Press Tab key
      .keyUp(Key.TAB)        // Release Tab key
      .keyDown(Key.SPACE)    // Press Space key
      .keyUp(Key.SPACE)      // Release Space key
      .keyDown(Key.TAB)      // Press Tab key again
      .keyUp(Key.TAB)        // Release Tab key again
      .keyDown(Key.SPACE)    // Press Space key again
      .keyUp(Key.SPACE)      // Release Space key again
      .perform();

    await driver.sleep(2000);
    // Wait and click the "Use" button
    const useButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Use')]")), 10000);
    await useButton.click();
    console.log("Clicked 'Use' button.");

    // Wait and click the "Export Audits" button
    const exportAuditsButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Export Audits')]")), 10000);
    await exportAuditsButton.click();
    console.log("Clicked 'Export Audits' button.");
    await driver.sleep(5000);
  });
});