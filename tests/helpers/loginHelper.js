// tests/helpers/loginHelper.js
const { By, until } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../layouts/all-test/testCaseConfig');

// Login function
async function login(driver) {
  console.log('Navigating to the login page...');
  await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`);

  // Maximize the browser window
  await driver.manage().window().maximize();

  // Locate the submit button
  const submitButton = await driver.wait(until.elementLocated(By.css('*[id="submitbtn"]')), 10000);

  // Entering invalid credentials
  console.log('1-----> Entering invalid credentials...');
  const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
  const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);

  // await usernameField.sendKeys('adminWrong'); // Wrong username
  // await passwordField.sendKeys('admin@123'); // Wrong password
  // await submitButton.click();

  // // Wait for error response
  // console.log('Invalid credentials submitted, waiting for error message...');
  // await driver.sleep(5000); // Adjust sleep if UI feedback takes longer
  // console.log('Error displayed. Clearing fields...');

  // // Clear the fields
  // await usernameField.clear();
  // await passwordField.clear();

  // Entering valid credentials
  console.log('2-----> Entering valid credentials...');
  await usernameField.sendKeys('admin'); // Correct username
  await passwordField.sendKeys('admin@123'); // Correct password
  await submitButton.click();

  // Wait for successful login by checking the URL
  console.log('Waiting for successful login...');
  await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/dashboard`), 20000);
  console.log('Login successful.');
  await driver.sleep(5000);
}

// Logout function
async function logout(driver) {
  console.log('Logging out...');
  const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
  await logoutButton.click();

  // Wait for successful logout
  console.log('Waiting for logout...');
  await driver.wait(until.urlIs(`${TEST_CASE_BASE_URL}/audit-manager/authentication/sign-in`), 20000);
  console.log('Logout successful.');
}

// Export functions
module.exports = { login, logout };
