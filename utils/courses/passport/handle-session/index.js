const express = require('express');
const session = require('express-session');

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'Keyboard cat',
  })
);

app.get('/', (req, res) => {
  req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
  res.status(200);
  res.json({
    hello: 'world',
    counter: req.session.counter,
  });
});

app.listen(3000, () => {
  console.log('listening localhost:3000');
});
