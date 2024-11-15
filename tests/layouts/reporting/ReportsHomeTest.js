const { By, until, Key } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

async function reportsHomeTest(driver) {
    console.log('Starting Report Overview Navigation Test...');

    // Step 1: Navigate to Dashboard
    console.log('Navigating to Dashboard page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/dashboard`);
    await driver.sleep(6000);

    // Step 2: Navigate to Report Overview page
    console.log('Navigating to Report Overview page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/reporting`);
    await driver.sleep(6000);

    // Step 3: Verify Report Overview title
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Report Overview')]")), 30000);
    console.log("Report Overview title located.");

    // Step 4: Navigate to Create Report page
    console.log('Navigating to Create Report page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/reporting/create`);
    await driver.sleep(6000);

    // Step 5: Fill in report details
    const reportNameField = await driver.wait(until.elementLocated(By.id('reportName')), 10000);
    await reportNameField.sendKeys('test report', Key.TAB, Key.DOWN, Key.DOWN, Key.ENTER);
    console.log("Entered 'test report', navigated with Tab and Down keys, and pressed Enter.");

    // Press Tab five times and enter "himanshu"
    for (let i = 0; i < 5; i++) {
        await driver.actions().sendKeys(Key.TAB).perform();
    }
    await driver.actions().sendKeys('himanshu').perform();
    console.log("Entered 'himanshu' after five Tab presses.");

    // Step 6: Click the Save button
    const saveButton = await driver.wait(until.elementLocated(By.id('saveButton')), 10000);
    await saveButton.click();
    console.log("Clicked the Save button.");
}

module.exports = reportsHomeTest;
