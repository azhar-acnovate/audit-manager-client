const { By, until } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

module.exports = async function(driver) {
  // Test: View Audit Page
  console.log('Navigating to View Audit page...');
  await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/audit-log-activities`);
  await driver.sleep(5000);

  try {
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Audit View')]")), 30000);
    console.log("Audit View title located.");
  } catch (error) {
    console.error("Error locating Audit View title:", error);
    throw new Error("Audit View title not found");
  }
};
