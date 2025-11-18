// pages/CartPage.js
import { By, until } from "selenium-webdriver";

export default class CartPage {
  constructor(driver) {
    this.driver = driver;

    this.selectors = {
      cartItemName: By.className("inventory_item_name"),
      checkoutButton: By.css('[data-test="checkout"]'),
    };
  }

  async getCartItemName() {
    const item = await this.driver.wait(
      until.elementLocated(this.selectors.cartItemName),
      5000
    );
    return item.getText();
  }

  async clickCheckout() {
    const checkoutButton = await this.driver.findElement(
      this.selectors.checkoutButton
    );
    await checkoutButton.click();
  }
}
