import { By, until } from "selenium-webdriver";
import { Select } from "selenium-webdriver";

export default class ProductsPage {
  constructor(driver) {
    this.driver = driver;

    this.selectors = {
      sortDropdown: By.className("product_sort_container"),
      addOnesieButton: By.id("add-to-cart-sauce-labs-onesie"),
      cartLink: By.css('[data-test="shopping-cart-link"]'),
    };
  }

  async waitUntilLoaded() {
    const dropdown = await this.driver.wait(
      until.elementLocated(this.selectors.sortDropdown),
      10000
    );
    await this.driver.wait(until.elementIsVisible(dropdown), 5000);
  }

  async sortByVisibleText(text) {
    const sortDropdown = await this.driver.wait(
      until.elementLocated(this.selectors.sortDropdown),
      10000
    );
    await this.driver.wait(until.elementIsVisible(sortDropdown), 5000);

    const select = new Select(sortDropdown);
    await select.selectByVisibleText(text);

    await this.driver.sleep(1000);

    const refreshedDropdown = await this.driver.findElement(
      this.selectors.sortDropdown
    );

    return refreshedDropdown.getAttribute("value");
  }

  async sortAtoZ() {
    return this.sortByVisibleText("Name (A to Z)");
  }

  async sortZtoA() {
    return this.sortByVisibleText("Name (Z to A)");
  }

  async sortLowToHigh() {
    return this.sortByVisibleText("Price (low to high)");
  }

  async sortHighToLow() {
    return this.sortByVisibleText("Price (high to low)");
  }

  async addOnesieToCart() {
    const button = await this.driver.findElement(
      this.selectors.addOnesieButton
    );
    await button.click();
  }

  async openCart() {
    const cart = await this.driver.findElement(this.selectors.cartLink);
    await cart.click();
  }
}
