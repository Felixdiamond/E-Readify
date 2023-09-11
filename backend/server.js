const express = require('express');
const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { firebaseConfig } = require('./firebaseConfig');

dotenv.config();
const server = express();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
