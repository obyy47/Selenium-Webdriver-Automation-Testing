import { By, until } from "selenium-webdriver";

export default class CartPage {
  constructor(driver) {
    this.driver = driver;

    this.selectors = {
      cartItemName: By.className("inventory_item_name"),
      checkoutBtn: By.css('[data-test="checkout"]'),
    };
  }

  async getAllItemNames() {
    const items = await this.driver.findElements(
      By.className("inventory_item_name")
    );
    const names = [];

    for (const item of items) {
      names.push(await item.getText());
    }

    return names;
  }

  async clickCO() {
    const checkoutBtn = await this.driver.findElement(
      this.selectors.checkoutBtn
    );
    await checkoutBtn.click();
  }
}
