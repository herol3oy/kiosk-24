const fs = require("fs").promises;
const { chromium } = require("playwright");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

const URLS = ['https://wyborcza.pl', 'https://radiofarda.com', 'https://theguardian.com'];

dotenv.config();

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function takeScreenshot(url) {
  const date = new Date(Date.now());

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const screenshotPath = `./${date.toISOString()}.png`;

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  await browser.close();

  const results = await cloudinary.uploader.upload(screenshotPath, {
    folder: "kiosk-15-app-image-archive",
  });

  const archive = {
    url,
    date,
    image: {
      url: results.secure_url,
      width: results.width,
      height: results.height,
    },
  };

  await fs.mkdir("./archives/", { recursive: true });

  await fs.writeFile(
    `./archives/${date.toISOString()}.json`,
    JSON.stringify(archive, null, 2)
  );

  await fs.unlink(screenshotPath);
}

const runScreenshotProcess = async () => {
  for (const url of URLS) {
    await takeScreenshot(url);
  }
};

runScreenshotProcess();
