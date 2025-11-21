import fs from "fs";

export default class Screenshot {
  constructor(driver) {
    this.driver = driver;
  }

  async take(name) {
    const folder = "./ss_chrome"; // ← folder khusus untuk Chrome

    // bikin folder kalau belum ada
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const image = await this.driver.takeScreenshot();
    fs.writeFileSync(`${folder}/${name}.png`, image, "base64");
  }
}
