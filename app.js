const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const postsRoute = require('./routes/api/examples/posts');
const personRoute = require('./routes/api/examples/person');
const workerRoute = require('./routes/api/worker');
const cors = require('cors');
const webpush = require('web-push');

// Env
require('dotenv/config');

// Middleware

// CORS
app.use(cors());

// JSON
app.use(express.json());

// Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Vapid Keys
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIV_KEY;

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: 'Push Test' });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

// API Route
app.use('/api/person', personRoute);

app.use('/api/posts', postsRoute);

app.use('/api/worker', workerRoute);

// Routes
// app.get('/', (req, res) => {
//   res.send('Test');
// });

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server had started on ${PORT}`));

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('connected to DB!')
);
