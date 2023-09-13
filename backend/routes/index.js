const express = require('express');
const AuthController = require('../controllers/express/authController');
const firebaseApp = require('../app');

const router = express.Router();
const authController = new AuthController();
// const app = firebaseApp();

router.post('/register', async (req, res) => {
  const response = await authController.addUser(req.body.email, req.body.password);
  return res.json(response);
});
router.post('/login', async (req, res) => {
  const response = await authController.logIn(req.body.email, req.body.password);
  return res.json(response);
});
router.get('/logout', authController.logOut);
router.get('/current-user', (req, res) => {
  const user = authController.getUser();
  res.json(user);
});
router.patch('/edit-user', (req, res) => {
  const user = authController.updateUser(req.body.data);
  res.json(user);
});
router.delete('/delete-user', (req, res) => {
  const user = authController.deleteUser();
  res.json(user);
});
router.get('/verification-status', (req, res) => {
  const isVerified = authController.getverificationStatus();
  res.json(isVerified);
});
router.get('/verify', (req, res) => {
  const verify = authController.verifyUser();
  res.json(verify);
});
router.get('/reset-password', (req, res) => {
  const resetPassword = authController.resetPassword();
  res.json(resetPassword);
});

module.exports = router;
