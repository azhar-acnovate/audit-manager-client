const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('login', function() {
  let driver;
  let vars;

  // Increase the timeout for the test suite to 60 seconds
  this.timeout(60000); // 60 seconds

  beforeEach(async function() {
    console.log("Initializing WebDriver...");
    
    // Specify the path to your ChromeDriver if necessary
    driver = new Builder().forBrowser('MicrosoftEdge').build();
    
    console.log("WebDriver initialized.");
    vars = {};
  });

  afterEach(async function() {
    if (driver) {
      console.log("Closing WebDriver...");
      await driver.quit();
      console.log("WebDriver closed.");
    }
  });

  it('login-logout', async function() {
    console.log("Navigating to login page...");
    await driver.get("http://localhost:3000/audit-manager/authentication/sign-in");
    
    await driver.manage().window().setRect({ width: 1050, height: 660 });
    console.log("Window resized.");
   
    await driver.findElement(By.id("username")).click();
    await driver.findElement(By.id("username")).sendKeys("admin");
    await driver.findElement(By.id("password")).sendKeys("admin@123");
    
    const buttonSelector = By.css('*[id="submitbtn"]');
    await driver.wait(until.elementLocated(buttonSelector), 10000);
    const button = await driver.wait(until.elementIsVisible(driver.findElement(buttonSelector)), 10000);
    await button.click();

    console.log("Login form submitted.");
  });
});
