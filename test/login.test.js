import { Builder, By, until, Select } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import firefox from "selenium-webdriver/firefox.js";
import assert, { strictEqual } from "assert";

describe.only("Regression Testing Website Saucedemo menggunakan Firefox", () => {
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

describe("Regression Testing Website Saucedemo menggunakan Chrome", () => {
  let driver;

  after(async () => {
    if (driver) {
      console.log("Semua test selesai. Menutup browser...");
      await driver.quit();
    }
  });

  it("Login kedalam website Saucedemo", async () => {
    // const options = new chrome.Options();
    // options.addArguments("--headless");

    driver = await new Builder()
      .forBrowser("chrome")
      //   .setChromeOptions(options)
      .build();

    await driver.get("https://www.saucedemo.com/");

    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    const title = await driver.getTitle();
    assert.strictEqual(title, "Swag Labs");
  });

  it("Sorting Name(A to Z)", async () => {
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);

    const select = new Select(sortDropdown);
    await select.selectByVisibleText("Name (A to Z)");
    await driver.sleep(1000);

    const refreshedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );

    const activeSort = await refreshedDropdown.getAttribute("value");
    assert.strictEqual(activeSort, "az");
  });

  it("Sorting Name (Z to A)", async () => {
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);

    const select = new Select(sortDropdown);
    await select.selectByVisibleText("Name (Z to A)");
    await driver.sleep(1000);

    const refreshedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );

    // Verifikasi value baru
    const activeSort = await refreshedDropdown.getAttribute("value");
    assert.strictEqual(activeSort, "za");
  });

  it("Sorting Price (low to high)", async () => {
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);

    const select = new Select(sortDropdown);
    await select.selectByVisibleText("Price (low to high)");
    await driver.sleep(1000);

    const refreshedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );

    const activeSort = await refreshedDropdown.getAttribute("value");
    assert.strictEqual(activeSort, "lohi");
  });

  it("Sorting Price (high to low)", async () => {
    const sortDropdown = await driver.wait(
      until.elementLocated(By.className("product_sort_container")),
      10000
    );

    await driver.wait(until.elementIsVisible(sortDropdown), 5000);

    const select = new Select(sortDropdown);
    await select.selectByVisibleText("Price (high to low)");
    await driver.sleep(1000);

    const refreshedDropdown = await driver.findElement(
      By.className("product_sort_container")
    );

    const activeSort = await refreshedDropdown.getAttribute("value");
    assert.strictEqual(activeSort, "hilo");
  });

  it("Klik Add to Cart Fleece Jacket", async () => {
    const addToCart = await driver.findElement(
      By.id("add-to-cart-sauce-labs-fleece-jacket"),
      5000
    );

    const isDisplayed = await addToCart.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Fleece Jacket tidak muncul!");

    await driver
      .findElement(By.id("add-to-cart-sauce-labs-fleece-jacket"))
      .click();
  });

  it("Klik Add to Cart Bolt T-Shirt", async () => {
    const addToCart = await driver.findElement(
      By.id("add-to-cart-sauce-labs-bolt-t-shirt"),
      5000
    );
    const isDisplayed = await addToCart.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Bolt T-Shirt tidak muncul!");
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-bolt-t-shirt"))
      .click();
  });

  it("Klik Add to Cart Bike Light", async () => {
    const addToCart = await driver.findElement(
      By.id("add-to-cart-sauce-labs-bike-light"),
      5000
    );
    const isDisplayed = await addToCart.isDisplayed();
    assert.strictEqual(isDisplayed, true, "Bike Light tidak muncul!");
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-bike-light"))
      .click();
  });

  it("Klik Cart & Checkout", async () => {
    // KLIK CART
    const iconCart = await driver.findElement(
      By.css('[data-test="shopping-cart-link"]')
    );
    assert.strictEqual(await iconCart.isDisplayed(), true);
    await iconCart.click();

    // TUNGGU MASUK HALAMAN CART
    console.log("Menunggu masuk /cart.html...");
    await driver.wait(until.urlContains("/cart.html"), 30000);

    // CEK PRODUK
    const cartItems = await driver.findElements(
      By.className("inventory_item_name")
    );
    const names = [];

    for (const item of cartItems) {
      names.push(await item.getText());
    }

    // verifikasi urutan dan isinya
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

    // KLIK CHECKOUT PAKE ID
    const checkoutBtn = await driver.findElement(By.id("checkout"));
    assert.strictEqual(await checkoutBtn.isDisplayed(), true);
    await checkoutBtn.click();

    console.log("Checkout berhasil diklik!");
  });

  it("Isi data diri dan klik button Continue", async () => {
    // Isi dulu semuanya

    const firstName = await driver.findElement(By.id("first-name"));
    const isDisplayedFirst = await firstName.isDisplayed();
    assert.strictEqual(
      isDisplayedFirst,
      true,
      "Field Frist Name tidak tampil!"
    );
    await firstName.sendKeys("Robby");
    await driver.sleep(500);

    const lastName = await driver.findElement(By.id("last-name"));
    const isDisplayedLast = await lastName.isDisplayed();
    assert.strictEqual(isDisplayedLast, true, "Field Last Name tidak tampil!");
    await lastName.sendKeys("Adriansyah Fadillah");
    await driver.sleep(500);

    const postalCode = await driver.findElement(By.id("postal-code"));
    const isDisplayedCode = await postalCode.isDisplayed();
    assert.strictEqual(
      isDisplayedCode,
      true,
      "Field Postal Code tidak muncul!"
    );
    await postalCode.sendKeys("040702");
    await driver.sleep(500);

    // kasih assert apakah sudah sesuai dengan yang diisi

    const firstNameValue = await firstName.getAttribute("value");
    assert.strictEqual(firstNameValue, "Robby", "First Name salah!");
    await driver.sleep(500);

    const lastNameValue = await lastName.getAttribute("value");
    assert.strictEqual(
      lastNameValue,
      "Adriansyah Fadillah",
      "Last Name salah!"
    );
    await driver.sleep(500);

    const postalCodeValue = await postalCode.getAttribute("value");
    assert.strictEqual(postalCodeValue, "040702", "Postal Code salah!");
    await driver.sleep(500);

    await driver.findElement(By.id("continue")).click();
  });

  it("Cek Price Total apakah muncul sebelum Klik button Finish", async () => {
    const totalPrice = await driver.findElement(
      By.className("summary_info_label")
    );

    const isDisplayedTotal = await totalPrice.isDisplayed();
    assert.strictEqual(isDisplayedTotal, true, "Gaada jumlah total price nya!");
    await driver.sleep(1000);

    await driver.findElement(By.id("finish")).click();
  });

  it("Cek apakah muncul Complete Header sebelum Klik button Back Home", async () => {
    const completeHeader = await driver.findElement(
      By.className("complete-header")
    );

    const isDisplayedComplete = await completeHeader.isDisplayed();
    assert.strictEqual(
      isDisplayedComplete,
      true,
      "Tulisan Complete Header tidak muncul!"
    );

    await driver.findElement(By.id("back-to-products")).click();
  });
});
