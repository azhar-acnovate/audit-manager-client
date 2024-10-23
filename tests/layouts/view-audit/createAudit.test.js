const { Builder, By, until, Key } = require('selenium-webdriver');

describe('Create Audit Object Interaction Test', function () {
    let driver;
    this.timeout(120000);

    before(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });

    async function login() {
        console.log('Navigating to the login page...');
        await driver.get('http://localhost:3000/audit-manager/authentication/sign-in');
        await driver.manage().window().setRect({ width: 1050, height: 660 });

        const usernameField = await driver.wait(until.elementLocated(By.id('username')), 10000);
        await usernameField.sendKeys('admin');
        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 10000);
        await passwordField.sendKeys('admin@123');

        const submitButton = await driver.wait(until.elementLocated(By.css('*[id="submitbtn"]')), 10000);
        await driver.wait(until.elementIsVisible(submitButton), 10000);
        await submitButton.click();

        console.log('Waiting for successful login...');
        await driver.wait(until.urlIs('http://localhost:3000/audit-manager/dashboard'), 20000);
        await driver.sleep(10000);
    }

    // Logout Function
    async function logout() {
        console.log('Logging out...');
        const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
        await logoutButton.click();

        // Wait for successful logout
        console.log('Waiting for logout...');
        await driver.wait(until.urlIs('http://localhost:3000/audit-manager/authentication/sign-in'), 20000);
    }

    // Test to navigate to the "Create" page and interact with elements
    it('navigate to the Create Audit Object page and fill form', async function () {
        await login();
        console.log('Navigating to Create Audit page...');
        await driver.get('http://localhost:3000/audit-manager/audit-log-activities/create');
        await driver.sleep(5000);

      // Wait for the Create page to ensure we're on the right page
      try {
        await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Add Audit Attribute Tracker')]")), 30000); // Increased timeout
        console.log("Create Audit page title located.");
    } catch (error) {
        console.error("Error locating Create Audit page title:", error);
        throw new Error("Create Audit page title not found");
    }

        // Step 1: Locate the Search Source Reference Box and click it
        console.log('Clicking on the Source Reference box...');
        const sourceReferenceBox = await driver.wait(until.elementLocated(By.css('.MuiAutocomplete-input')), 10000);
        await sourceReferenceBox.click();

        // Step 2: Press the down arrow key, then enter, then tab
        console.log('Pressing down arrow, enter, and tab to select an option...');
        await sourceReferenceBox.sendKeys(Key.ARROW_DOWN);
        await sourceReferenceBox.sendKeys(Key.ENTER);
        await sourceReferenceBox.sendKeys(Key.TAB);

        // Step 3: Locate the Event Type input box and enter "colorway-create"
        console.log('Entering "colorway-create" into the Event Type input field...');
        const eventTypeField = await driver.wait(until.elementLocated(By.css('input[placeholder="Event Type"]')), 10000);
        await eventTypeField.sendKeys('colorway-create');

        // Step 4: Click the Save button using its ID
        console.log('Clicking the Save button...');
        const saveButton = await driver.wait(until.elementLocated(By.id('savebtn')), 10000);
        await saveButton.click();

        // Optional: Wait for save action confirmation or redirection
        console.log('Waiting for confirmation or redirection after saving...');
        await driver.sleep(5000);
        
        // Step 5a: Click the Attribute Name box and enter "colorway name"
        console.log('Entering "colorway name" into the Attribute Name input field...');
        const attributeNameField = await driver.wait(until.elementLocated(By.css('input[placeholder="Attribute Name"]')), 10000);
        await attributeNameField.click();
        await attributeNameField.sendKeys('colorway-name');
        await attributeNameField.sendKeys(Key.TAB);

        // Step 5b: Enter "red" in the Old Value field
        console.log('Entering "red" into the Old Value input field...');
        const oldValueField = await driver.wait(until.elementLocated(By.css('input[placeholder="Old Value"]')), 10000);
        await oldValueField.sendKeys('green');
        await oldValueField.sendKeys(Key.TAB);

        // Step 5c: Enter "black" in the New Value field
        console.log('Entering "black" into the New Value input field...');
        const newValueField = await driver.wait(until.elementLocated(By.css('input[placeholder="New Value"]')), 10000);
        await newValueField.sendKeys('yellow');
        await newValueField.sendKeys(Key.TAB);

        // Step 5d: Enter User in the Changed By field
        console.log('Entering "himanshu" into the Changed By input field...');
        const changedByField = await driver.wait(until.elementLocated(By.css('input[placeholder="Changed By"]')), 10000);
        await changedByField.sendKeys('himanshu');
        
         // Step 6: Click the Add button
         console.log('Clicking the Add button...');
         const addButton = await driver.wait(until.elementLocated(By.id('addbtn')), 10000); // Assuming the Add button has ID 'addbtn'
         await addButton.click();
 
         console.log('Waiting after clicking Add button...');
         await driver.sleep(10000);
 
         // Step 7: Click the Update button
         console.log('Clicking the Update button...');
         const updateButton = await driver.wait(until.elementLocated(By.id('savebtn')), 10000); // The same button ID for Save/Update
         await updateButton.click();
 
         // Optional: Wait for update confirmation or redirection
         console.log('Waiting for confirmation or redirection after update...');
         await driver.sleep(5000);
 
         await logout();
    });
});
