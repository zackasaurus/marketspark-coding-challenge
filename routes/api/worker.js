const express = require('express');
const request = require('request');
const rp = require('request-promise');
const Scrape = require('../../models/Scrape');
const Post = require('../../models/Post');

const router = express.Router();
const mongoose = require('mongoose');

// Get Request -> get html from another website
router.get('/', (req, res) => {
  let startDate = Date.now();
  if (req.query.href) {
    const URL = req.query.href;
    const options = {
      url: URL,
      json: true
    };
    rp(options).then(data => {
      try {
        res.write(`Performance: ${(Date.now() - startDate) / 1000} seconds. `);
        const HTML = res.write(`Data: ${data}`);
        const scrape = new Scrape({
          URL: URL,
          HTML: HTML
        });
        res.end();
      } catch (err) {
        res.json({ message: err });
      }
    });
  } else {
    res.send('N/A');
  }
});

// Post Request

// POST localhost:3000
// Example
// {
//     "url" : "https://google.com"

// }

// POST REQUEST
router.post('/', (req, res) => {
  let startDate = Date.now();

  if (req.body.url) {
    const URL = req.body.url;
    console.log(URL);

    const options = {
      url: URL,
      json: true
    };
    rp(options).then(async data => {
      try {
        const Performance = `${(Date.now() - startDate) / 1000} seconds`;
        const HTML = `${data}`;
        // res.write('Test');
        res.write('Test');
        // res.write({ t: 'test' });
        // res.write.json({ t: 'test' });

        const scrape = new Scrape({
          _URL: URL,
          _HTML: HTML
        });
        const savedScrape = await scrape.save();
        // res.json(savedScrape);
        res.end();
      } catch (err) {
        res.json({ message: err });
      }
    });
  } else {
    res.send('N/A');
  }
});

module.exports = router;
