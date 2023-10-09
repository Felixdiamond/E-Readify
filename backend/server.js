const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const admin = require('./admin');
const router = require('./routes/index');
const cors = require('cors');

dotenv.config();

const server = express();
server.use(cors());
server.use(bodyParser.json({ limit: '100mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
server.use(express.json());
server.use(router);

server.listen(process.env.PORT, ()=> {
  console.log(`server running on port ${process.env.PORT}`)
});

