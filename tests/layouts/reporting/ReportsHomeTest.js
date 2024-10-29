const { Builder, By, until, Key } = require('selenium-webdriver');

describe('Report Overview Navigation Test', function () {
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

    // Login Function
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
        await driver.sleep(5000);
    }

    // Logout Function
    async function logout() {
        console.log('Logging out...');
        const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
        await logoutButton.click();

        console.log('Waiting for logout...');
        await driver.wait(until.urlIs('http://localhost:3000/audit-manager/authentication/sign-in'), 20000);
    }

    it('navigate to Report Overview and create new report', async function () {
        await login();

        // Navigate to dashboard
        console.log('Navigating to Dashboard page...');
        await driver.get("http://localhost:3000/audit-manager/dashboard");
        await driver.sleep(3000);

        // Click on the Reporting page
        console.log('Navigating to Report Overview page...');
        await driver.get("http://localhost:3000/audit-manager/reporting");
        await driver.sleep(5000);

        // Verify Report Overview title
        try {
            await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Report Overview')]")), 30000);
            console.log("Report Overview title located.");
        } catch (error) {
            console.error("Error locating Report Overview title:", error);
            throw new Error("Report Overview title not found");
        }

        // Navigate to Report Create page
        console.log('Navigating to Create Report page...');
        await driver.get("http://localhost:3000/audit-manager/reporting/create");
        await driver.sleep(5000);

        // Select the report name field, enter "test report," press Tab, press Down twice, and then Enter
        const reportNameField = await driver.wait(until.elementLocated(By.id('reportName')), 10000);
        await reportNameField.sendKeys('test report', Key.TAB, Key.DOWN, Key.DOWN, Key.ENTER);

        console.log("Entered 'test report', navigated with Tab and Down keys, and pressed Enter.");
        
        // Press Tab five times and enter "himanshu"
        for (let i = 0; i < 5; i++) {
            await driver.actions().sendKeys(Key.TAB).perform();
        }
        await driver.actions().sendKeys('himanshu').perform();

        console.log("Entered 'himanshu' after five Tab presses.");

        // Click the Save button
        const saveButton = await driver.wait(until.elementLocated(By.id('saveButton')), 10000);
        await saveButton.click();
        console.log("Clicked the Save button.");

        await logout();
    });
});
