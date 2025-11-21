import fs from "fs";

export default class Screenshot {
  constructor(driver) {
    this.driver = driver;
  }

  async take(name) {
    const folder = "./ss_firefox";

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const image = await this.driver.takeScreenshot();
    fs.writeFileSync(`${folder}/${name}.png`, image, "base64");
  }
}
