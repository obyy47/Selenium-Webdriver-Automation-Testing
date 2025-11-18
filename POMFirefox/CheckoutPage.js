// pages/CheckoutPage.js
import { By, until } from "selenium-webdriver";

export default class CheckoutPage {
  constructor(driver) {
    this.driver = driver;

    this.selectors = {
      firstNameInput: By.id("first-name"),
      lastNameInput: By.id("last-name"),
      postalCodeInput: By.id("postal-code"),
      continueButton: By.id("continue"),
      finishButton: By.id("finish"),
      thankYouMessage: By.className("complete-header"),
      backHomeButton: By.id("back-to-products"),
    };
  }

  async fillCustomerInformation(firstName, lastName, postalCode) {
    await this.driver
      .findElement(this.selectors.firstNameInput)
      .sendKeys(firstName);
    await this.driver
      .findElement(this.selectors.lastNameInput)
      .sendKeys(lastName);
    await this.driver
      .findElement(this.selectors.postalCodeInput)
      .sendKeys(postalCode);
  }

  async continueAndFinishOrder() {
    await this.driver.findElement(this.selectors.continueButton).click();
    await this.driver.findElement(this.selectors.finishButton).click();
  }

  async getThankYouMessage() {
    const message = await this.driver.wait(
      until.elementLocated(this.selectors.thankYouMessage),
      5000
    );
    return message.getText();
  }

  async backToProducts() {
    await this.driver.findElement(this.selectors.backHomeButton).click();
  }
}
