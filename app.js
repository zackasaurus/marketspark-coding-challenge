const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// Middleware
// app.use('/', () => {
//   console.log('Test');
// });

// Routes
app.get('/', (req, res) => {
  res.send('Test');
});

// Port
app.listen(3000);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
);
