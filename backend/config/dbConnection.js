const { initializeApp } = require('firebase/app');
const { getAuth } = require("firebase/auth");
const firebaseConfig = require("./firebaseConfig");

const dbConnection = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  if (app && auth) {
    console.log("Firebase connected");
  } else if (app && !auth) {
    console.log("Firebase auth not connected");
  } else {
    console.log("Firebase not connected");
  }
};

module.exports = dbConnection;
