// tests/helpers/loginHelper.js

const { By, until } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../layouts/all-test/testCaseConfig');

// Login function
async function login(driver) {
  console.log('Navigating to the login page...');
  await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`);
  
  // Set the browser window to full screen
  await driver.manage().window().maximize();

  const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
  await usernameField.sendKeys('admin');
  const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
  await passwordField.sendKeys('admin@123');

  const submitButton = await driver.wait(until.elementLocated(By.css('*[id="submitbtn"]')), 10000);
  await driver.wait(until.elementIsVisible(submitButton), 10000);
  await submitButton.click();

  // Wait for successful login
  console.log('Waiting for successful login...');
  await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/dashboard`), 20000);
  await driver.sleep(8000);
  console.log('Login successful.');
}

// Logout function
async function logout(driver) {
  console.log('Logging out...');
  const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
  await logoutButton.click();

  console.log('Waiting for logout...');
  await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`), 20000);
  console.log('Logout successful.');
}

// Export functions
module.exports = { login, logout };
