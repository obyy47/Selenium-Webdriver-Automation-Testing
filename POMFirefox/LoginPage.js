// pages/LoginPage.js
import { By, until } from "selenium-webdriver";

export default class LoginPage {
  constructor(driver, baseUrl = "https://www.saucedemo.com/") {
    this.driver = driver;
    this.baseUrl = baseUrl;

    this.selectors = {
      usernameInput: By.id("user-name"),
      passwordInput: By.id("password"),
      loginButton: By.id("login-button"),
    };
  }

  async open() {
    await this.driver.get(this.baseUrl);

    const usernameField = await this.driver.wait(
      until.elementLocated(this.selectors.usernameInput),
      5000
    );

    await this.driver.wait(until.elementIsVisible(usernameField), 3000);
  }

  async login(username, password) {
    await this.driver
      .findElement(this.selectors.usernameInput)
      .sendKeys(username);
    await this.driver
      .findElement(this.selectors.passwordInput)
      .sendKeys(password);

    await this.driver.findElement(this.selectors.loginButton).click();
  }
}
