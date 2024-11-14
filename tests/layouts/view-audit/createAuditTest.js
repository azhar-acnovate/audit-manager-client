const { By, until, Key } = require('selenium-webdriver');

module.exports = async function(driver) {
  // Test: View Audit Page
  console.log('Navigating to View Audit page...');
  await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/audit-log-activities`);

  try {
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Audit View')]")), 30000);
    console.log("Audit View title located.");
  } catch (error) {
    console.error("Error locating Audit View title:", error);
    throw new Error("Audit View title not found");
  }

  // Test: Navigate to Create Audit Object page and fill form
  console.log('Navigating to Create Audit page...');
  await driver.get(`${TEST_CASE_BASE_URL}/audit-manager/audit-log-activities/create`);

  try {
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Add Audit Attribute Tracker')]")), 30000);
    console.log("Create Audit page title located.");
  } catch (error) {
    console.error("Error locating Create Audit page title:", error);
    throw new Error("Create Audit page title not found");
  }

  // Fill in form details for creating the audit object
  const sourceReferenceBox = await driver.wait(until.elementLocated(By.css('.MuiAutocomplete-input')), 10000);
  await sourceReferenceBox.click();
  await sourceReferenceBox.sendKeys(Key.ARROW_DOWN, Key.ENTER, Key.TAB);

  const eventTypeField = await driver.wait(until.elementLocated(By.css('input[placeholder="Event Type"]')), 10000);
  await eventTypeField.sendKeys('colorway-create');

  const saveButton = await driver.wait(until.elementLocated(By.id('savebtn')), 10000);
  await saveButton.click();

  const attributeNameField = await driver.wait(until.elementLocated(By.css('input[placeholder="Attribute Name"]')), 10000);
  await attributeNameField.sendKeys('colorway-name', Key.TAB);

  const oldValueField = await driver.wait(until.elementLocated(By.css('input[placeholder="Old Value"]')), 10000);
  await oldValueField.sendKeys('green', Key.TAB);

  const newValueField = await driver.wait(until.elementLocated(By.css('input[placeholder="New Value"]')), 10000);
  await newValueField.sendKeys('yellow', Key.TAB);

  const changedByField = await driver.wait(until.elementLocated(By.css('input[placeholder="Changed By"]')), 10000);
  await changedByField.sendKeys('himanshu');

  const addButton = await driver.wait(until.elementLocated(By.id('addbtn')), 10000);
  await addButton.click();

  const updateButton = await driver.wait(until.elementLocated(By.id('savebtn')), 10000);
  await updateButton.click();

  console.log('Audit form submitted successfully.');
};