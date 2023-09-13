const express = require('express');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const router = require('./routes/index');

dotenv.config();

const serviceAccount = require("./config/firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const server = express();
server.use(express.json());
server.use(router);

server.listen(process.env.PORT, ()=> {
  console.log(`server running on port ${process.env.PORT}`)
});

