const fs = require("fs").promises;
const { chromium } = require("playwright");
const { addDoc, collection } = require("firebase/firestore");
const NEWS_AGENCY_URLS = require("./news-agency-urls");
const firestore = require("./firebase");
const cloudinary = require("./cloudinary");

const FOLDER_NAME = 'kiosk-24-pl-image-archives'

async function processTakingScreenshot(url) {
  const date = new Date(Date.now());
  const screenshotPath = `./${date.toISOString()}.jpeg`;

  await takeScreenshot(url, screenshotPath);

  const archive = await uploadToCloudinary(url, screenshotPath);

  writeScreenshotDatainFirestore(url, archive);
  await fs.unlink(screenshotPath);
}

const writeScreenshotDatainFirestore = async (url, archive) => {
  await addDoc(collection(firestore, new URL(url).hostname), archive);
};

const uploadToCloudinary = async (url, screenshotPath) => {
  const results = await cloudinary.uploader.upload(screenshotPath, {
    folder: FOLDER_NAME,
  });

  const archive = {
    url,
    id: results.asset_id,
    date: results.created_at,
    image: {
      url: results.secure_url,
      width: results.width,
      height: results.height,
    },
  };

  return archive;
};

const takeScreenshot = async (url, screenshotPath) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    type: "jpeg",
    quality: 85,
  });

  await browser.close();
};

const runScreenshotProcess = async () => {
  for (const url of Object.values(NEWS_AGENCY_URLS)) {
    console.log
    await processTakingScreenshot(url);
  }
};

runScreenshotProcess();
