import { By, until } from "selenium-webdriver";
import { Select } from "selenium-webdriver";

export default class ProductsPage {
  constructor(driver) {
    this.driver = driver;

    this.selectors = {
      sortDropdown: By.className("product_sort_container"),
      fleeceJacketBtn: By.id("add-to-cart-sauce-labs-fleece-jacket"),
      boltTshirtBtn: By.id("add-to-cart-sauce-labs-bolt-t-shirt"),
      bikeLightBtn: By.id("add-to-cart-sauce-labs-bike-light"),
      klikCart: By.className("shopping_cart_link"),
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

  async fleeceJacketBtn() {
    const button = await this.driver.findElement(
      this.selectors.fleeceJacketBtn
    );
    await button.click();
    await this.driver.sleep(700);
  }

  async boltTshirtBtn() {
    const button = await this.driver.findElement(this.selectors.boltTshirtBtn);
    await button.click();
    await this.driver.sleep(700);
  }

  async bikeLightBtn() {
    const button = await this.driver.findElement(this.selectors.bikeLightBtn);
    await button.click();
    await this.driver.sleep(700);
  }

  async openCart() {
    const cart = await this.driver.findElement(this.selectors.klikCart);
    await cart.click();
  }
}
