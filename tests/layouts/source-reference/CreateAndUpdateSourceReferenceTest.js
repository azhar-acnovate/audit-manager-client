const { Builder, By, until } = require('selenium-webdriver');

describe('Source Reference Home Navigation Test', function () {
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

        // Wait for successful login
        console.log('Waiting for successful login...');
        await driver.wait(until.urlIs('http://localhost:3000/audit-manager/dashboard'), 20000);
        await driver.sleep(4000);
    }

    // Logout Function
    async function logout() {
        console.log('Logging out...');
        const logoutButton = await driver.wait(until.elementLocated(By.id('logout')), 10000);
        await logoutButton.click();

        console.log('Waiting for logout...');
        await driver.wait(until.urlIs('http://localhost:3000/audit-manager/authentication/sign-in'), 20000);
    }

    it('login, navigate, create source reference, and logout', async function () {
        await login();

        // Step 1: Navigate to Source Reference Home page
        console.log('Navigating to Source Reference Home page...');
        await driver.get("http://localhost:3000/audit-manager/master-data-management/source-reference");

        // Adding a wait for the page to load and locating the title
        try {
            await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Source Reference')]")), 30000); // Wait for title
            console.log("Source Reference Home title located.");
        } catch (error) {
            console.error("Error locating Source Reference Home title:", error);
            throw new Error("Source Reference Home title not found");
        }

        await driver.sleep(4000);

        // Step 2: Navigate to Dashboard page
        console.log('Navigating to Dashboard...');
        await driver.get("http://localhost:3000/audit-manager/dashboard");

        // Adding a wait to ensure dashboard is loaded
        await driver.wait(until.urlIs("http://localhost:3000/audit-manager/dashboard"), 10000);
        console.log("Dashboard loaded.");
        await driver.sleep(4000);

        console.log('Navigating to Source Reference Home page...');
        await driver.get("http://localhost:3000/audit-manager/master-data-management/source-reference");
        await driver.sleep(4000);

        // Step 3: Navigate to Source Reference Create page
        console.log('Navigating to Source Reference Create page...');
        await driver.get("http://localhost:3000/audit-manager/master-data-management/source-reference/create");
        await driver.sleep(5000);

        try {
            const sourceObjectNameField = await driver.wait(
                until.elementLocated(By.xpath("//input[@placeholder='Source Object Name']")),
                10000
            );
            await sourceObjectNameField.sendKeys('product');
            await sourceObjectNameField.sendKeys('\t');

            const sourceReferenceKeyField = await driver.wait(
                until.elementLocated(By.xpath("//input[@placeholder='Source Reference Key']")),
                10000
            );
            await sourceReferenceKeyField.sendKeys('4321');

            const saveButton = await driver.wait(until.elementLocated(By.id('saveButton')), 10000);
            await saveButton.click();

            console.log("Source Reference created successfully.");
            await driver.sleep(4000);

        } catch (error) {
            console.error("Error during the Source Reference creation process:", error);
            throw new Error("Failed to create Source Reference");
        }
        await logout();
    });
});