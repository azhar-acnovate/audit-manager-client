const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

async function createOrUpdateUserTest() {
  describe('CreateOrUpdateUser Component - Automated Tests', function () {
    let driver;
    this.timeout(60000);

    before(async function () {
      driver = await new Builder().forBrowser('MicrosoftEdge').build();
      await driver.manage().window().maximize(); // Maximizes the browser window
    });

    after(async function () {
      if (driver) {
        await driver.quit();
      }
    });

    // Login Function
    async function login() {
      await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`);
      await driver.sleep(3000);
      const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
      await usernameField.sendKeys('admin');
      const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
      await passwordField.sendKeys('admin@123');

      const submitButton = await driver.wait(until.elementLocated(By.css('*[id="submitbtn"]')), 10000);
      await driver.wait(until.elementIsVisible(submitButton), 10000);
      await submitButton.click();
      await driver.sleep(3000);

      // Wait for successful login
      await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/dashboard`), 20000);
      await driver.sleep(4000);

      // Store user role in localStorage
      await driver.executeScript(() => {
        localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
      });
    }

    // Navigate to Create User Page
    async function navigateToCreateUser() {
      await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/master-data-management/user-data/create`);
      await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Full Name']")), 10000);
    }

    // Create New User Function
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
      await actions.sendKeys(Key.DOWN).perform();  // Select role or any dropdown
      await actions.sendKeys(Key.ENTER).perform();

      await actions.sendKeys(Key.TAB).perform();
      await actions.sendKeys(Key.ENTER).perform(); // Click Create

      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Successfully Created User')]")), 20000);
      const successMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Successfully Created User')]"));
      assert.ok(successMessage, 'User creation was not successful.');
      await driver.sleep(5000);
    }

    // Navigate to Update User Page
    async function navigateToUpdateUser(userId) {
      await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/master-data-management/update/${userId}`);
      await driver.wait(until.elementLocated(By.id('email')), 10000);
    }

    // Edit Existing User Function
    async function editExistingUser() {
      const fullNameInput = await driver.wait(until.elementLocated(By.id('fullName')));
      const emailField = await driver.wait(until.elementLocated(By.id('email')), 10000);
      const userNameField = await driver.wait(until.elementLocated(By.id('userName')), 10000);

      // New values to set
      const newFullName =  'Purohit Himanshu';
      const newEmail = 'purohit@gmail.com';
      const newUserName = 'himanshu12';

      await fullNameInput.click();
      await driver.executeScript("arguments[0].value = '';", fullNameInput);
      await fullNameInput.sendKeys(newFullName, Key.TAB);

      await emailField.click();
      await driver.executeScript("arguments[0].value = '';", emailField);
      await emailField.sendKeys(newEmail, Key.TAB);

      await userNameField.click();
      await driver.executeScript("arguments[0].value = '';", userNameField);
      await userNameField.sendKeys(newUserName);

      const updateButton = await driver.wait(until.elementLocated(By.id('updatebtn')), 10000);
      await updateButton.click();
      await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Successfully Updated User')]")), 20000);
      const updateSuccessMessage = await driver.findElement(By.xpath("//*[contains(text(), 'Successfully Updated User')]"));
      assert.ok(updateSuccessMessage, 'User update was not successful.');
      await driver.sleep(5000);
    }

    // Test for Creating a New User
    it('login and create a new user', async function () {
      await login();
      await navigateToCreateUser();
      await createNewUser();
    });

    // Test for Editing an Existing User
    it('login and edit an existing user', async function () {
      await login();
      const userId = 'MTA='; // User ID for editing
      await navigateToUpdateUser(userId);
      await editExistingUser();
    });
  });
}

// Export the test so it can be used in runAllTest.js
module.exports = createOrUpdateUserTest;