const fs = require("fs").promises;
const { chromium } = require("playwright");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
// import { firestore } from "@/firebase";
// const firestore = require("../firebase");
// import { addDoc, collection } from "firebase/firestore";
const { addDoc, collection } = require("firebase/firestore");


const { initializeApp, getApp, getApps } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: "AIzaSyB6Im57IflrQaEmXOMXJp4XHoHRA8kg3Pk",
  authDomain: "kiosk24-a956a.firebaseapp.com",
  projectId: "kiosk24-a956a",
  storageBucket: "kiosk24-a956a.appspot.com",
  messagingSenderId: "982117450538",
  appId: "1:982117450538:web:8f90b48014a1691add1453",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const firestore = getFirestore(app);

// module.exports = { firestore, app };



const URLS = [
  "https://wyborcza.pl",
  "https://radiofarda.com",
  "https://theguardian.com",
];

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

  await addDoc(collection(firestore, "kiosk-15-screenshots"), archive);


  await fs.writeFile(
    `./public/${date.toISOString()}.json`,
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
