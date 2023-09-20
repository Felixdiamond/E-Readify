const express = require('express');
const AuthController = require('../controllers/express/authController');
const BookController = require('../controllers/express/bookController');
const BookDetailsController = require('../controllers/firebase/bookDetailsController');
const firebaseApp = require('../app'); //initialize this so that there wont be errors

const router = express.Router();
const authController = new AuthController();
const bookController = new BookController();
const bookDetails = new BookDetailsController();
//user routes

// authentication middleware
const isAuthenticated = (req, res, next) => {
  const currentUser = authController.getUser();
  if (!currentUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

router.post('/user/register', (req, res) => {
  authController.addUser(req.body).then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: error });
  });
});

router.post('/user/login',(req, res) => {
  authController.logIn(req.body).then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: error});
  });
});

router.get('/user/logout', isAuthenticated, (req, res) => {
  authController.logOut()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user', isAuthenticated, (req, res) => {
  const user = authController.getUser();
  res.status(200).json(user);
});

router.patch('/user/edit', isAuthenticated, (req, res) => {
  authController.updateUser(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user/delete', isAuthenticated, (req, res) => {
  authController.deleteUser()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user/verify', isAuthenticated, (req, res) => {
  authController.verifyUser()
    .then(verify => {
      res.status(200).json(verify);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user/reset-password', isAuthenticated, (req, res) => {
  authController.resetPassword()
    .then(resetPassword => {
      res.status(200).json(resetPassword);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user/verification-status', isAuthenticated, (req, res) => {
  authController.getverificationStatus().then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(401).json({data: error });
  });
});

// book routes

router.post('/user/post-book', isAuthenticated, (req, res) => {
  const details = req.body.bookInfo;
  const userId = req.body.userId;
  bookController.postBook(details, userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/user/get-book', isAuthenticated, (req, res) => {
  bookController.getBook(req.body).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.delete('/user/delete-book', isAuthenticated, (req, res) => {
  const {bookId, userId, remotePath} = req.body;
  bookController.deleteBook(bookId, userId, remotePath).then((response)=>{
    res.json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/all-books', isAuthenticated, (req, res)=>{
  bookDetails.getAllBooksInfo().then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/user/all-books', isAuthenticated, (req, res)=>{
  bookDetails.getAllUserBooksInfo(req.body.userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/user/book', isAuthenticated, (req, res)=>{
  const {userId, bookId} = req.body;
  bookDetails.getBookInfo(userId, bookId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.put('/user/book/edit', isAuthenticated, (req, res)=>{
  const {bookInfo, userId, bookId} = req.body;
  bookDetails.editBookInfo(bookInfo, userId, bookId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/user/books/favorites', isAuthenticated, (req, res)=>{
  bookController.getFavorites(req.body.userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.put('/user/books/favorites/edit', isAuthenticated, (req, res)=>{
  const {userId, favId, favorites} = req.body;
  bookController.editFavorites(userId, favId, favorites).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.delete('/user/books/favorites/delete', isAuthenticated, (req, res)=>{
  bookController.deleteFavorites(req.body.userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error });
  });
});

module.exports = router;
