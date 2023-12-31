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
  const verified = authController.getverificationStatus();
  if (!currentUser || !verified) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

//routes
router.post('/user/register', (req, res) => {
  authController.addUser(req.body).then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: error });
  });
});

router.post('/user/login',(req, res) => {
  authController.logIn(req.body).then((response) => {
    res.status(200).json(response);
  })
  .catch((error) => {
    res.status(500).json({ error});
  });
});

router.get('/user/logout', isAuthenticated, (req, res) => {
  authController.logOut()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get('/user', isAuthenticated, (req, res) => {
  const user = authController.getUser();
  res.status(200).json(user);
});

router.patch('/user/edit', isAuthenticated, (req, res) => {
  authController.updateUser(req.query.displayName, req.query.photoURL)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.delete('/user/delete', isAuthenticated, (req, res) => {
  authController.deleteUser(req.body.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get('/user/verify', (req, res) => {
  authController.verifyUser()
    .then(verify => {
      res.status(200).json(verify);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user/reset-password', isAuthenticated, (req, res) => {
  authController.resetPassword(req.query.email)
    .then(resetPassword => {
      res.status(200).json(resetPassword);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.get('/user/verification-status', isAuthenticated, (req, res) => {
  const response = authController.getverificationStatus();
    res.status(200).json(response);
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

router.get('/download-book', isAuthenticated, (req, res) => {
  bookController.getBook(req.query).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/read-book', isAuthenticated, (req, res) => {
  bookController.readBook(req.query.remotePath).then((response)=>{
    res.status(200).json(response);
  }).catch((error)=>{
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
  bookDetails.getAllUserBooksInfo(req.query.userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/user/book', isAuthenticated, (req, res)=>{
  const {userId, bookId} = req.query;
  bookDetails.getBookInfo(userId, bookId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.put('/user/book/edit', isAuthenticated, (req, res)=>{
  const userId = req.body.userId;
  const bookId = req.body.bookId;
  const bookInfo = 
    typeof req.body.bookInfo === "string" ?
     JSON.parse(req.body.bookInfo) : req.body.bookInfo;
  bookDetails.editBookInfo(bookInfo, userId, bookId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.delete('/user/delete-all-books', isAuthenticated, (req, res)=>{
  bookController.deleteAllUserBooks(req.body.remoteFolder).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.get('/user/books/favorites', isAuthenticated, (req, res)=>{
  bookController.getFavorites(req.query.userId).then((response)=>{
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

router.post('/user/books/favorite/add', isAuthenticated, (req, res)=>{
  bookController.postFavorite(req.body.userId, req.body.favorites).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});

router.delete('/user/books/favorite/delete', isAuthenticated, (req, res)=>{
  bookController.deleteFavorite(req.body.userId, req.body.favId).
  then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(404).json({data: error});
  });
});


module.exports = router;
