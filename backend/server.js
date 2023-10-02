const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const admin = require('./admin');
const router = require('./routes/index');

dotenv.config();

// const serviceAccount = require("./config/firebase-admin.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.DATABASE_URL
// });

const server = express();
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json());
server.use(router);

server.listen(process.env.PORT, ()=> {
  console.log(`server running on port ${process.env.PORT}`)
});

