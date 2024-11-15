const { By, until, Key } = require('selenium-webdriver');
const { default: TEST_CASE_BASE_URL } = require('../all-test/testCaseConfig');

async function exportReportTest(driver) {
  console.log('Navigating to Export Audit Report page...');

  // Set the browser window to full-screen mode
  await driver.manage().window().maximize();

  // Navigate to the Export Audit Report page
  await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/export-audit-report`);

  // Wait for the Export Audit Report page to load
  await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Steps to export Audits:')]")), 30000);
  console.log("Export Audit Report page located.");

  // Click the "Select List" button
  const selectListButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Click to Select List(s)')]")), 10000);
  await selectListButton.click();
  console.log("Clicked 'Select List' button.");

  // Simulate pressing Tab and Space keys for selection
  const actions = driver.actions({ async: true });
  await actions
    .sendKeys(Key.TAB, Key.TAB, Key.SPACE, Key.TAB, Key.SPACE, Key.TAB, Key.SPACE)
    .perform();

  await driver.sleep(6000);

  // Click the "Use" button
  const useButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Use')]")), 10000);
  await useButton.click();
  console.log("Clicked 'Use' button.");

  // Wait and click the "Export Audits" button
  const exportAuditsButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Export Audits')]")), 10000);
  await exportAuditsButton.click();
  console.log("Clicked 'Export Audits' button.");
  await driver.sleep(6000); // Sleep to ensure the export process completes
}

module.exports = exportReportTest;
