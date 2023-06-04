const fs = require("fs").promises;
const { chromium } = require("playwright");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const { addDoc, collection } = require("firebase/firestore");
const { initializeApp, getApp, getApps } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const URLS = [
  "https://wyborcza.pl",
  "https://radiofarda.com",
  "https://theguardian.com",
];

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const firestore = getFirestore(app);

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
    id: results.asset_id,
    date: results.created_at,
    image: {
      url: results.secure_url,
      width: results.width,
      height: results.height,
    },
  };

  await addDoc(collection(firestore, new URL(url).hostname), archive);

  await fs.unlink(screenshotPath);
}

const runScreenshotProcess = async () => {
  for (const url of URLS) {
    await takeScreenshot(url);
  }
};

runScreenshotProcess();
