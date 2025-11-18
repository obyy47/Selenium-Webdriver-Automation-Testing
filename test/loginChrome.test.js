import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

import LoginPage from "../POMChrome/LoginPage.js";
import ProductsPage from "../POMChrome/ProductsPage.js";
import CartPage from "../POMChrome/CartPage.js";
import CheckoutPage from "../POMChrome/CheckoutPage.js";

import assert from "assert";

describe("Regression Test Saucedemo dengan POM", () => {
  let driver;
  let loginPage, productsPage, cartPage, checkoutPage;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();

    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("1. Login", async () => {
    await loginPage.open(); // buka web & tunggu username muncul
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("2. Sorting A to Z", async () => {
    await productsPage.waitUntilLoaded();
    const value = await productsPage.sortAtoZ();
    assert.strictEqual(value, "az");
  });

  it("3. Sorting Z to A", async () => {
    const value = await productsPage.sortZtoA();
    assert.strictEqual(value, "za");
  });

  it("4. Sorting Low to High", async () => {
    const value = await productsPage.sortLowToHigh();
    assert.strictEqual(value, "lohi");
  });

  it("5. Sorting High to Low", async () => {
    const value = await productsPage.sortHighToLow();
    assert.strictEqual(value, "hilo");
  });

  it("6. Add 3 products to cart", async () => {
    await productsPage.fleeceJacketBtn();
    await productsPage.boltTshirtBtn();
    await productsPage.bikeLightBtn();
  });

  it("7. Open cart & verify items", async () => {
    await productsPage.openCart();

    const names = await cartPage.getAllItemNames();

    assert.ok(
      names.includes("Sauce Labs Fleece Jacket"),
      "Fleece Jacket tidak ditemukan!"
    );
    assert.ok(
      names.includes("Sauce Labs Bolt T-Shirt"),
      "Bolt T-Shirt tidak ditemukan!"
    );
    assert.ok(
      names.includes("Sauce Labs Bike Light"),
      "Bike Light tidak ditemukan!"
    );
  });

  it("8. Click Checkout", async () => {
    await cartPage.clickCO();
  });

  it("9. Fill checkout form & finish", async () => {
    await checkoutPage.fillCustInformation("Robby", "Adriansyah", "040702");
    await checkoutPage.continueAndFinishOrder();
  });

  it("10. Verify Thank You message", async () => {
    const msg = await checkoutPage.getThankYouMessage();
    assert.strictEqual(msg, "Thank you for your order!");
  });

  it("11. Back to products", async () => {
    await checkoutPage.backToProducts();
  });
});
