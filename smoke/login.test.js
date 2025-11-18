import { Builder, By, until } from "selenium-webdriver";
import LoginPage from "../POMFirefox/LoginPage.js";
import assert from "assert";

describe("Smoke Test - Login & Logout (Chrome -> Firefox)", function () {
  let driver;
  let loginPage;

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  // LOGOUT FUNCTION
  async function logout(driver) {
    const menuBtn = await driver.findElement(By.id("react-burger-menu-btn"));
    await menuBtn.click();

    await driver.sleep(500);

    const logoutBtn = await driver.wait(
      until.elementLocated(By.id("logout_sidebar_link")),
      7000
    );

    await driver.executeScript("arguments[0].click();", logoutBtn);
    await driver.sleep(500);

    const usernameField = await driver.findElement(By.id("user-name"));
    assert.ok(await usernameField.isDisplayed(), "Logout gagal!");
  }

  // TEST 1 - Chrome
  it("Login & Logout di Chrome", async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    const menuBtn = await driver.wait(
      until.elementLocated(By.id("react-burger-menu-btn")),
      5000
    );
    assert.ok(await menuBtn.isDisplayed(), "Login gagal di Chrome");

    await logout(driver);
  });

  // TEST 2 - Firefox
  it("Login & Logout di Firefox", async function () {
    driver = await new Builder().forBrowser("firefox").build();
    loginPage = new LoginPage(driver);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    const menuBtn = await driver.wait(
      until.elementLocated(By.id("react-burger-menu-btn")),
      5000
    );
    assert.ok(await menuBtn.isDisplayed(), "Login gagal di Firefox");

    await logout(driver);
  });
});
