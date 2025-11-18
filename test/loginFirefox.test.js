// tests/regression.spec.js
import { Builder } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox.js";
import assert from "assert";

import LoginPage from "../POMFirefox/LoginPage.js";
import ProductsPage from "../POMFirefox/ProductsPage.js";
import CartPage from "../POMFirefox/CartPage.js";
import CheckoutPage from "../POMFirefox/CheckoutPage.js";

describe("Saucedemo Regression Tests (POM + Clean Code)", function () {
  let driver;
  let loginPage, productsPage, cartPage, checkoutPage;

  before(async () => {
    driver = await new Builder().forBrowser("firefox").build();

    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    await productsPage.waitUntilLoaded();

    const title = await driver.getTitle();
    assert.strictEqual(title, "Swag Labs");
  });

  after(async () => {
    await driver.quit();
  });

  it("Sorting Name(A to Z)", async () => {
    const value = await productsPage.sortAtoZ();
    assert.strictEqual(value, "az");
  });

  it("Sorting Name (Z to A)", async () => {
    const value = await productsPage.sortZtoA();
    assert.strictEqual(value, "za");
  });

  it("Sorting Price (low to high)", async () => {
    const value = await productsPage.sortLowToHigh();
    assert.strictEqual(value, "lohi");
  });

  it("Sorting Price (high to low)", async () => {
    const value = await productsPage.sortHighToLow();
    assert.strictEqual(value, "hilo");
  });

  it("Add Onesie → Checkout Complete", async () => {
    await productsPage.addOnesieToCart();
    await productsPage.openCart();

    const productName = await cartPage.getCartItemName();
    assert.strictEqual(productName, "Sauce Labs Onesie");

    await cartPage.clickCheckout();

    await checkoutPage.fillCustomerInformation(
      "Robby",
      "Adriansyah Fadillah",
      "12345678"
    );
    await driver.sleep(1000);
    await checkoutPage.continueAndFinishOrder();

    const thankYou = await checkoutPage.getThankYouMessage();
    assert.strictEqual(thankYou, "Thank you for your order!");

    await checkoutPage.backToProducts();
  });
});
