const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/index');

dotenv.config();

const server = express();
server.use(express.json());
server.use(router);

server.listen(process.env.PORT, ()=> {
  console.log(`server running on port ${process.env.PORT}`)
});
