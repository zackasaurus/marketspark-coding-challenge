const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.name) {
    res.send(`You have requested a person, ${req.query.name}`);
  } else {
    res.send('N/A');
  }
});

router.get('/:name', (req, res) => {
  res.send(`You have requested a person ${req.params.name}`);
});

module.exports = router;
