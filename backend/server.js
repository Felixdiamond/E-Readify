const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require('./config/dbConnection');

dotenv.config();
const server = express();

dbConnection();

app.use(express.json());

app.use("/api/user", require("./routes/userRoute"));

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});