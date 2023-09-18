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

router.post('/user/register', (req, res) => {
  authController.addUser(req.body).then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: error.message });
  });
});

router.post('/user/login',(req, res) => {
  console.log(req.body);
  authController.logIn(req.body).then(response => {
    res.status(200).json(response);
  })
  .catch(error => {
    res.status(500).json({ error: error.message });
  });
});

router.get('/user/logout', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  authController.logOut(currentUser.id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/user', (req, res) => {
  const user = authController.getUser();
  res.status(200).json(user);
});

router.patch('/user/edit', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  authController.updateUser(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/user/delete', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  authController.deleteUser()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/user/verify', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  authController.verifyUser()
    .then(verify => {
      res.status(200).json(verify);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/user/reset-password', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  authController.resetPassword()
    .then(resetPassword => {
      res.status(200).json(resetPassword);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/user/verification-status', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  authController.getverificationStatus().then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});

// book routes

router.post('/user/post-book', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  const details = req.body.bookInfo;
  const userId = req.body.userId;
  bookController.postBook(details, userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.json({data: error.data});
  });
});

router.get('/user/get-book', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  bookController.getBook(req.body).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});

router.delete('/user/delete-book', (req, res) => {
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  const {bookId, userId, remotePath} = req.body;
  bookController.deleteBook(bookId, userId, remotePath).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});

router.get('/all-books', (req, res)=>{
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  bookDetails.getAllBooksInfo().then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});

router.get('/user/all-books', (req, res)=>{
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  bookDetails.getAllUserBooksInfo(req.body.userId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});

router.get('/user/book', (req, res)=>{
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  const {userId, bookId} = req.body;
  bookDetails.getBookInfo(userId, bookId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});

router.patch('/user/book/edit', (req, res)=>{
  const currentUser = authController.getUser();
  if (!currentUser){
    res.status(401).json({error: 'Unauthorized'});
  }
  const {bookInfo, userId, bookId} = req.body;
  bookDetails.editBookInfo(bookInfo, userId, bookId).then((response)=>{
    res.status(200).json(response);
  }).catch((error) => {
    res.status(error.status).json({data: error.data});
  });
});


module.exports = router;
