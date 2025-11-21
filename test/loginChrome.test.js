import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

import LoginPage from "../POMChrome/LoginPage.js";
import ProductsPage from "../POMChrome/ProductsPage.js";
import CartPage from "../POMChrome/CartPage.js";
import CheckoutPage from "../POMChrome/CheckoutPage.js";
import Screenshot from "../POMChrome/Screenshot.js";

import { performVisualTest } from "../helpers/visualHelper.js";
import assert from "assert";

describe("Saucedemo Regression Tests Chrome", function () {
  let driver;
  let loginPage, productsPage, cartPage, checkoutPage;
  let ss;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();

    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    ss = new Screenshot(driver);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    await productsPage.waitUntilLoaded();

    const title = await driver.getTitle();
    assert.strictEqual(title, "Swag Labs");

    await ss.take("01-Login");
    await performVisualTest(driver, "chrome", "01_Login");
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it("Sorting Name (A to Z)", async () => {
    const value = await productsPage.sortAtoZ();
    assert.strictEqual(value, "az");

    await ss.take("02-AtoZ");
    await performVisualTest(driver, "chrome", "02_AtoZ");
  });

  it("Sorting Name (Z to A)", async () => {
    const value = await productsPage.sortZtoA();
    assert.strictEqual(value, "za");

    await ss.take("03-ZtoA");
    await performVisualTest(driver, "chrome", "03_ZtoA");
  });

  it("Sorting Price (Low to High)", async () => {
    const value = await productsPage.sortLowToHigh();
    assert.strictEqual(value, "lohi");

    await ss.take("04-LowToHigh");
    await performVisualTest(driver, "chrome", "04_LowToHigh");
  });

  it("Sorting Price (High to Low)", async () => {
    const value = await productsPage.sortHighToLow();
    assert.strictEqual(value, "hilo");

    await ss.take("05-HighToLow");
    await performVisualTest(driver, "chrome", "05_HighToLow");
  });

  it("Add 3 products to cart", async () => {
    await productsPage.fleeceJacketBtn();
    await productsPage.boltTshirtBtn();
    await productsPage.bikeLightBtn();

    await ss.take("06-AddProducts");
    await performVisualTest(driver, "chrome", "06_AddProducts");
  });

  it("Open cart & verify items", async () => {
    await productsPage.openCart();

    const names = await cartPage.getAllItemNames();

    console.log("ITEMS IN CART:", names);

    assert.ok(names.includes("Sauce Labs Fleece Jacket"));
    assert.ok(names.includes("Sauce Labs Bolt T-Shirt"));
    assert.ok(names.includes("Sauce Labs Bike Light"));

    await ss.take("07-Cart");
    await performVisualTest(driver, "chrome", "07_Cart");
  });

  it("Click Checkout", async () => {
    await cartPage.clickCO();

    await ss.take("08-Checkout");
    await performVisualTest(driver, "chrome", "08_Checkout");
  });

  it("Fill checkout form & finish", async () => {
    await checkoutPage.fillCustInformation("Robby", "Adriansyah", "040702");

    await checkoutPage.continueAndFinishOrder();

    await ss.take("09-InfoFilled");
    await performVisualTest(driver, "chrome", "09_InfoFilled");
  });

  it("Verify Thank You message", async () => {
    const msg = await checkoutPage.getThankYouMessage();
    assert.strictEqual(msg, "Thank you for your order!");

    await ss.take("10-ThankYou");
    await performVisualTest(driver, "chrome", "10_ThankYou");
  });

  it("Back to products", async () => {
    await checkoutPage.backToProducts();

    await ss.take("11-BackToProducts");
    await performVisualTest(driver, "chrome", "11_BackToProducts");
  });
});
