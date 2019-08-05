const express = require('express');
const request = require('request');
const rp = require('request-promise');
const Scrape = require('../../models/Scrape');
const router = express.Router();
const mongoose = require('mongoose');
const queue = require('./job_queue');

// Get All Data
router.get('/all/', async (req, res) => {
  try {
    const scrape = await Scrape.find();
    await res.status(200).json(scrape);
  } catch {
    err => {
      res.status(500).json({
        error: err
      });
    };
  }
});
// Check Queue
router.get('/queue/', async (req, res) => {
  //   queue.push('abc');
  res.send(queue);
});

// Create Job
router.get('/', (req, res) => {
  // Add Job to Queue
  queue.push(req.query.href);
  // Wait till job gets executed once at the top of queue

  // Performance
  let startDate = Date.now();
  if (req.query.href) {
    const URL = req.query.href;
    //  Scrape HTML data
    const options = {
      url: URL,
      json: true
    };
    rp(options)
      .then(async data => {
        try {
          const scrape = new Scrape({
            _url: URL,
            _performance: `${(Date.now() - startDate) / 1000}s`,
            _html: data
          });
          const savedScrape = await scrape.save();
          res.status(201).json(savedScrape);
          res.end();
        } catch (err) {
          res.json({ message: err });
        }
      })
      .catch(err => {
        console.log('Error', err);
        res.send({ message: err });
      });
  } else {
    res.send({ message: 'Not a valid query param' });
  }
});

// Get Specific ID
router.get('/:id', async (req, res) => {
  try {
    const scrape = await Scrape.findById(req.params.id);
    if (scrape) {
      await res.status(200).json(scrape);
    } else {
      await res
        .status(404)
        .json({ message: 'No valid entry found for provided ID' });
    }
  } catch (err) {
    res.json({ error: err });
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

        res.write('Test');
        const scrape = new Scrape({
          _URL: URL,
          _HTML: HTML
        });
        const savedScrape = await scrape.save();
        res.json(savedScrape);
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
