import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export async function performVisualTest(driver, folderName, imageName) {
  const folder = `visual/${folderName}`;

  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

  const baselinePath = `${folder}/${imageName}_baseline.png`;
  const currentPath = `${folder}/${imageName}_current.png`;
  const diffPath = `${folder}/${imageName}_diff.png`;

  // Take screenshot
  const ss = await driver.takeScreenshot();
  fs.writeFileSync(currentPath, Buffer.from(ss, "base64"));

  // Create baseline only once
  if (!fs.existsSync(baselinePath)) {
    fs.copyFileSync(currentPath, baselinePath);
    console.log(`Baseline created → ${baselinePath}`);
    return;
  }

  // Compare
  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  if (numDiffPixels > 0) {
    console.log(`⚠️ Difference: ${numDiffPixels} px`);
  } else {
    console.log(`✔ Visual match: ${imageName}`);
  }
}
