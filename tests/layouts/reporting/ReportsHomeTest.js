const { By, until, Key } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

async function reportsHomeTest(driver) {
    console.log('Starting Report Overview Navigation Test...');
    // Step 1: Navigate to Dashboard
    console.log('Navigating to Dashboard page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/dashboard`);
    await driver.sleep(4000);

    // Step 2: Navigate to Report Overview page
    console.log('Navigating to Report Overview page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/reporting`);
    await driver.sleep(4000);

    // Step 3: Verify Report Overview title
    try {
        await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Report Overview')]")), 30000);
        console.log("Report Overview title located.");
    } catch (error) {
        console.error("Error locating Report Overview title:", error);
        throw new Error("Report Overview title not found");
    }

    // Step 4: Navigate to Create Report page
    console.log('Navigating to Create Report page...');
    await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/reporting/create`);
    await driver.sleep(4000);

    // Step 5: Fill in report details
    try {
        const reportNameField = await driver.wait(until.elementLocated(By.id('reportName')), 10000);
        console.log("Report Name field located.");
        // Enter "test report"
        await reportNameField.sendKeys('test report');
        console.log("Typed 'test report'.");
        await driver.sleep(2000);
        // Press Tab, then type 'p'
        await driver.actions().sendKeys(Key.TAB).sendKeys('p').perform();
        console.log("Pressed Tab and typed 'p'.");
        // Wait for 2 seconds after typing 'p'
        await driver.sleep(2000);
        // Press Down twice, then Enter
        await driver.actions()
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ARROW_DOWN)
            .sendKeys(Key.ENTER)
            .perform();
        await driver.sleep(2000);
        console.log("Pressed Down twice and Enter.");
    } catch (error) {
        console.error("Error entering report details:", error);
        throw new Error("Failed to fill in report details.");
    }

    // Step 6: Click the Save button
    try {
        const saveButton = await driver.wait(until.elementLocated(By.id('saveButton')), 10000);
        await saveButton.click();
        console.log("Clicked the Save button.");

        // Wait for 5 seconds after clicking Save
        await driver.sleep(4000);
    } catch (error) {
        console.error("Error clicking Save button:", error);
        throw new Error("Failed to click the Save button.");
    }
}
module.exports = reportsHomeTest;
