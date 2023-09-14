const Admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = require("./config/firebase-admin.json");

const admin = Admin.initializeApp({
  credential: Admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
});

module.exports = admin;
