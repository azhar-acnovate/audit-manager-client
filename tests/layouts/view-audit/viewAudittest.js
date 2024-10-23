const { Builder, By, until } = require('selenium-webdriver');

describe('User View Navigation Test', function () {
    let driver;
    this.timeout(120000); // Increase to 120 seconds

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

        // Wait for an additional 10 seconds after login
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

    // Navigate to User View Page
    it('login', async function () {
        await login();
        console.log('Navigating to User View page...');
        await driver.get("http://localhost:3000/audit-manager/audit-log-activities");

        // Adding a wait for the page to load
        await driver.sleep(5000); // Adjust time as necessary

        // Wait for the User View title to ensure we're on the right page
        try {
            await driver.wait(until.elementLocated(By.xpath("//h6[contains(text(), 'Audit View')]")), 30000); // Increased timeout
            console.log("Audit View title located.");
        } catch (error) {
            console.error("Error locating User View title:", error);
            throw new Error("Audit View title not found");
        }
        await logout();
    });
});

