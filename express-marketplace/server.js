const express = require('express');
const path = require('path');
const { Flagsmith } = require('flagsmith-nodejs');

const app = express();
const PORT = process.env.PORT || 3000;

const flagsmith = new Flagsmith({
  environmentKey: process.env.FLAGSMITH_ENVIRONMENT_KEY,
});

let currentUser = null;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    if (currentUser) {
      res.locals.flags = await flagsmith.getIdentityFlags(currentUser);
    } else {
      res.locals.flags = await flagsmith.getEnvironmentFlags();
    }
  } catch (e) {
    res.locals.flags = null;
  }
  res.locals.currentUser = currentUser;
  next();
});

app.get('/', (req, res) => {
  // In a real application you would use the flags here
  const products = [
    { id: 1, name: 'Widget', price: '$9.99' },
    { id: 2, name: 'Gadget', price: '$19.99' },
    { id: 3, name: 'Doohickey', price: '$4.99' },
  ];
  res.render('index', { products, user: currentUser });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  currentUser = req.body.username || null;
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  currentUser = null;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
