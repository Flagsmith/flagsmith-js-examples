const express = require('express');
const path = require('path');
const { Flagsmith } = require('flagsmith-nodejs');

const app = express();
const PORT = process.env.PORT || 3000;

const environmentKey = process.env.FLAGSMITH_ENVIRONMENT_KEY;

const flagsmith = new Flagsmith({
    environmentKey: environmentKey,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    res.locals.flags = await flagsmith.getEnvironmentFlags();
  } catch (e) {
    res.locals.flags = null;
  }
  next();
});

app.get('/', (req, res) => {
  // In a real application you would use the flags here
  const products = [
    { id: 1, name: 'Widget', price: '$9.99' },
    { id: 2, name: 'Gadget', price: '$19.99' },
    { id: 3, name: 'Doohickey', price: '$4.99' },
  ];
  res.render('index', { products });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

