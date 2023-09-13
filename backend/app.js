// const admin = require('firebase-admin');
// const adminCredential = require('./config/firebase-admin.json');

// admin.initializeApp({
//   credential: admin.credential.cert(adminCredential),
//   databaseURL: process.env.DATABASE_URL
// });

// module.exports = admin;

const {initializeApp} = require('firebase/app');
const dotenv = require('dotenv');

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

module.exports = app;
