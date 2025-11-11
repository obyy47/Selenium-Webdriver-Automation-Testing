import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver";
import firefox from "selenium-webdriver";
import assert, { strictEqual } from "assert";

describe("Regression Testing Website Saucedemo", () => {
  let driver;

  it("Login ke Web Saucedemo menggunakan firefox dan cek page title", async () => {
    // 1. Buka browser dan Login

    driver = await new Builder().forBrowser("firefox").build();
    await driver.get("https://www.saucedemo.com/");

    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver
      .findElement(By.xpath('//*[@id="password"]'))
      .sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    const title = await driver.getTitle();
    assert.strictEqual(title, "Swag Labs");

    // await driver.quit();
  });

  it("Sorting Name (Z to A)", async () => {
    // cari ulang dropdown baru setelah halaman berubah
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);
    await sortDropdown.click(); // klik biar aktif
    await sortDropdown.sendKeys("Name (Z to A)");
    await driver.sleep(1500);

    // verifikasi value-nya
    const activeSort = await driver
      .findElement(By.className("product_sort_container"))
      .getAttribute("value");
    assert.strictEqual(activeSort, "za");
  });

  it("Sorting Price (low to high)", async () => {
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);
    await sortDropdown.click();
    await sortDropdown.sendKeys("Price (low to high)");
    await driver.sleep(1500);

    const activeSort = await driver
      .findElement(By.className("product_sort_container"))
      .getAttribute("value");
    assert.strictEqual(activeSort, "lohi");
  });

  it("Sorting Price (high to low)", async () => {
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);
    await sortDropdown.click();
    await sortDropdown.sendKeys("Price (high to low)");
    await driver.sleep(1500);

    const activeSort = await driver
      .findElement(By.className("product_sort_container"))
      .getAttribute("value");
    assert.strictEqual(activeSort, "hilo");
  });

  it("Masukkan Sauce Labs Onesie kedalam Cart", async () => {
    const addToCart = await driver.findElement(
      By.id("add-to-cart-sauce-labs-onesie")
    );

    const isDisplayed = await addToCart.isDisplayed();
    assert.strictEqual(isDisplayed, true);

    await driver.findElement(By.id("add-to-cart-sauce-labs-onesie")).click();
  });

  it("Klik Cart", async () => {
    const cart = await driver.findElement(
      By.css('[data-test="shopping-cart-link"]')
    );

    const isDisplayed = await cart.isDisplayed();
    assert.strictEqual(isDisplayed, true);

    await driver
      .findElement(By.css('[data-test="shopping-cart-link"]'))
      .click();
  });

  it("Klik Checkout", async () => {
    const cartItemName = await driver
      .findElement(By.className("inventory_item_name"))
      .getText();

    assert.strictEqual(
      cartItemName,
      "Sauce Labs Onesie",
      "Produk di cart tidak sesuai"
    );

    const checkOut = await driver.findElement(By.css('[data-test="checkout"]'));
    const isDisplayed = await checkOut.isDisplayed();
    assert.strictEqual(isDisplayed, true);

    await driver.findElement(By.css('[data-test="checkout"]')).click();
  });

  it("Mengisi informasi data diri dan Klik Continue serta Finish", async () => {
    const firstNameField = await driver.findElement(
      By.xpath('//*[@id="first-name"]')
    );
    const isDisplayed = await firstNameField.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Field frist name tidak tampil!");
    await firstNameField.sendKeys("Robby");

    const firstNameValue = await firstNameField.getAttribute("value");
    assert.strictEqual(
      firstNameValue,
      "Robby",
      "Isi field first name tidak sesuai!"
    );

    await driver.sleep(1000);

    const lastNameField = await driver.findElement(By.id("last-name"));
    const isDisplayedLast = await lastNameField.isDisplayed();
    assert.strictEqual(isDisplayedLast, true, "Field last name tidak tampil!");
    await lastNameField.sendKeys("Adriansyah Fadillah");

    const lastNameValue = await lastNameField.getAttribute("value");
    assert.strictEqual(
      lastNameValue,
      "Adriansyah Fadillah",
      "Isi field last name tidak sesuai!"
    );

    await driver.sleep(1000);

    await driver.findElement(By.id("postal-code")).sendKeys("12345678"), 10000;
    await driver.sleep(1000);
    await driver.findElement(By.id("continue")).click();
    await driver.findElement(By.id("finish")).click();
  });

  it("Back Home", async () => {
    const thankYouText = await driver
      .findElement(By.className("complete-header"))
      .getText();
    assert.strictEqual(thankYouText, "Thank you for your order!");

    await driver.findElement(By.id("back-to-products")).click();
    await driver.sleep(1000);

    await driver.quit();
  });
});
