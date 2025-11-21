import { Builder } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox.js";

import LoginPage from "../POMFirefox/LoginPage.js";
import ProductsPage from "../POMFirefox/ProductsPage.js";
import CartPage from "../POMFirefox/CartPage.js";
import CheckoutPage from "../POMFirefox/CheckoutPage.js";
import Screenshot from "../POMFirefox/Screenshot.js";

import { performVisualTest } from "../helpers/visualHelper.js";
import assert from "assert";

describe("Saucedemo Regression Tests firefox", function () {
  let driver;
  let loginPage, productsPage, cartPage, checkoutPage;
  let ss;

  before(async () => {
    driver = await new Builder().forBrowser("firefox").build();

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
    await performVisualTest(driver, "firefox", "01_Login");
  });

  after(async () => {
    await driver.quit();
  });

  it("Sorting Name(A to Z)", async () => {
    const value = await productsPage.sortAtoZ();
    assert.strictEqual(value, "az");

    await ss.take("02-A to Z");
    await performVisualTest(driver, "firefox", "02_AtoZ");
  });

  it("Sorting Name (Z to A)", async () => {
    const value = await productsPage.sortZtoA();
    assert.strictEqual(value, "za");

    await ss.take("03-Z to A");
    await performVisualTest(driver, "firefox", "03_ZtoA");
  });

  it("Sorting Price (low to high)", async () => {
    const value = await productsPage.sortLowToHigh();
    assert.strictEqual(value, "lohi");

    await ss.take("04-Low to High");
    await performVisualTest(driver, "firefox", "04_LowToHigh");
  });

  it("Sorting Price (high to low)", async () => {
    const value = await productsPage.sortHighToLow();
    assert.strictEqual(value, "hilo");

    await ss.take("05-High to Low");
    await performVisualTest(driver, "firefox", "05_HighToLow");
  });

  it("Add Onesie → Checkout Complete", async () => {
    await productsPage.addOnesieToCart();
    await productsPage.openCart();

    const productName = await cartPage.getCartItemName();
    assert.strictEqual(productName, "Sauce Labs Onesie");

    await ss.take("06-Add products");
    await performVisualTest(driver, "firefox", "06_AddProducts");

    await cartPage.clickCheckout();
    await performVisualTest(driver, "firefox", "07_Cart");

    await ss.take("07-Checkout");
    await performVisualTest(driver, "firefox", "08_Checkout");

    await checkoutPage.fillCustomerInformation(
      "Robby",
      "Adriansyah Fadillah",
      "12345678"
    );
    await driver.sleep(1000);

    await checkoutPage.continueAndFinishOrder();

    await ss.take("08-Fill Information");
    await performVisualTest(driver, "firefox", "09_InfoFilled");

    const thankYou = await checkoutPage.getThankYouMessage();
    assert.strictEqual(thankYou, "Thank you for your order!");

    await ss.take("09-Thank you message");
    await performVisualTest(driver, "firefox", "10_ThankYou");

    await checkoutPage.backToProducts();

    await ss.take("10-Back to product");
    await performVisualTest(driver, "firefox", "11_BackToProducts");
  });
});
