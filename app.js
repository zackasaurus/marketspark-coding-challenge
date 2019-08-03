const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postsRoute = require('./routes/api/posts');
const personRoute = require('./routes/api/person');
const workerRoute = require('./routes/api/worker');
const cors = require('cors');

// Env
require('dotenv/config');

// Middleware

// CORS
app.use(cors());
// JSON
app.use(express.json());

// API Route
app.use('/api/person', personRoute);

app.use('/api/posts', postsRoute);

app.use('/api/worker', workerRoute);

// Routes
app.get('/', (req, res) => {
  res.send('Test');
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server had started on ${PORT}`));

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
);
