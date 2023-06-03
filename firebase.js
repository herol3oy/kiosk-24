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

module.exports = { firestore, app };
