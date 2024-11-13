const { By, until } = require('selenium-webdriver');

module.exports = async function(driver) {
  
  console.log('Navigating to User View page...');
  const masterDataManagement = await driver.wait(
    until.elementIsVisible(driver.findElement(By.xpath("//span[text()='Master Data Management']"))),
    10000
  );

  await driver.executeScript("arguments[0].click();", masterDataManagement);

  const userDataManagementLink = await driver.wait(
    until.elementIsVisible(driver.findElement(By.xpath("//span[text()='User Data Management']"))),
    10000
  );

  await driver.executeScript("arguments[0].click();", userDataManagementLink);

  // Adding a wait for the page to load
  await driver.sleep(5000);

  // Wait for the User View title to ensure we're on the right page
  try {
    await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'user data')]")), 5000);
    console.log("User View title located.");
  } catch (error) {
    console.error("Error locating User View title:", error);
    throw new Error("User View title not found");
  }
};
