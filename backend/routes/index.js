const express = require('express');
const authController = require('../controllers/firebase/firebaseAuthController');
const firebaseApp = require('../app');

const router = express.Router();
// const app = firebaseApp();

router.post("/register", authController.createUser);
router.post("/login", authController.logInUser);
router.post("/logout", authController.logOutUser);
router.get("/current-user", authController.getCurrentUser);
router.patch("/edit-user", authController.updateUser);
router.delete("/delete-user", authController.deleteUser);
router.get("/verification-status", authController.isVerified);
router.get("/verify", authController.verifyUser);
router.get("/reset-password", authController.resetPassword);

module.exports= router;