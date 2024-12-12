const { By, until, Key } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

module.exports = async function (driver) {
  try {
    // Step 1: Navigate to View Audit page
    console.log('Navigating to View Audit page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/scheduling-audit-report`);
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Scheduling Reports View')]")), 30000);
    console.log("Scheduling reports view located.");

    // Step 2: Navigate to the 'Create' page
    console.log('Navigating to the Create Scheduling Audit Report page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/scheduling-audit-report/create`);
    await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Search Audit Report']")), 30000);
    console.log("Search input field located.");

    // Step 3: Enter a search term into the input field
    const searchInput = await driver.findElement(By.xpath("//input[@placeholder='Search Audit Report']"));
    console.log('Entering search query...');
    await searchInput.sendKeys("All Product");

    // Wait for the dropdown options to appear (adjust this XPath as needed)
    console.log('Waiting for dropdown options to appear...');
    await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'All Product')]")), 10000);

    // Step 4: Perform key actions (Arrow Down + Enter)
    console.log("Selecting dropdown option...");
    await driver.actions()
      .sendKeys(Key.ARROW_DOWN)
      .sendKeys(Key.ENTER)
      .perform();

    // Wait briefly for navigation to complete
    await driver.wait(until.urlContains('/audit-manager/scheduling-audit-report/create'), 10000);

    // Step 5: Fill in the form with tabbing and entering inputs
    console.log("Tabbing and filling form inputs...");
    await driver.actions()
      .sendKeys(Key.TAB) // Move to the first input
      .sendKeys(Key.ARROW_DOWN) // Select dropdown
      .sendKeys(Key.ARROW_DOWN) // Select next dropdown item
      .sendKeys(Key.ENTER) // Confirm selection
      .sendKeys(Key.TAB) // Tab to the next field
      .sendKeys('12') // Enter 12
      .sendKeys(Key.TAB) // Tab to the next field
      .sendKeys('25') // Enter 15
      .sendKeys(Key.TAB) // Tab to the next field
      .sendKeys(Key.ARROW_DOWN) // Select dropdown
      .sendKeys(Key.ARROW_DOWN) // Select next dropdown item
      .sendKeys(Key.ENTER) // Confirm selection
      .sendKeys(Key.TAB) // Tab to the email field
      .sendKeys('himanshu.purohit@acnovate.com') // Enter email
      .perform();
    await driver.sleep(2000);
    console.log("Form completed successfully.");

    // Step 6: Click the Save button using By.id()
    console.log("Clicking the Save button...");
    const saveButton = await driver.findElement(By.id('saveScheduleButton'));
    await saveButton.click();
    console.log("Save button clicked successfully.");

    // Wait to ensure the action is complete
    await driver.wait(until.urlContains('/audit-manager/scheduling-audit-report'), 10000);
    console.log("Report successfully saved.");
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/scheduling-audit-report`);
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Scheduling Reports View')]")), 30000);
    console.log("Scheduling reports view located.");
    await driver.sleep(4000);
  } catch (error) {
    console.error("An error occurred during the test run:", error);
  }
};
