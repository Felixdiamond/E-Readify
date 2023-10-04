const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('views'));

app.get('/register', (req, res) => {
  console.log(req.body);
  res.render('register');
});

app.get('/login', (req, res) => {
  console.log(req.body);
  res.render('login');
});

app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});