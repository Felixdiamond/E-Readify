const express = require('express');
const AuthController = require('../controllers/express/authController');
const firebaseApp = require('../app');

const router = express.Router();
const authController = new AuthController();
// const app = firebaseApp();

router.post('/register', async (req, res) => {
  console.log(req.body);
  const response = await authController.addUser(req.body);
  return res.json(response);
});
router.post('/login', async (req, res) => {
  const response = await authController.logIn(req.body);
  return res.json(response);
});
router.get('/logout', (req, res) => {
  authController.logOut()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
router.get('/current-user', (req, res) => {
  const user = authController.getUser();
  res.json(user);
});

router.patch('/edit-user', (req, res) => {
  authController.updateUser(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/delete-user', (req, res) => {
  authController.deleteUser()
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/verify', (req, res) => {
  authController.verifyUser()
    .then(verify => {
      res.json(verify);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/reset-password', (req, res) => {
  authController.resetPassword()
    .then(resetPassword => {
      res.json(resetPassword);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/verification-status', (req, res) => {
  const isVerified = authController.getverificationStatus();
  res.json(isVerified);
});

module.exports = router;
