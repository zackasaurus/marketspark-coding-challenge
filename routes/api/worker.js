const express = require('express');
const request = require('request');
const rp = require('request-promise');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.href) {
    const URL = req.query.href;
    const options = {
      url: URL,
      json: true
    };
    rp(options).then(data => {
      //   res.write(
      //     // `<iframe> You have requested a URL, ${req.query.href} </iframe>`
      //   );
      try {
        res.write(` Data: ${data}`);
        res.end();
      } catch (err) {
        res.json({ message: err });
      }
    });
  } else {
    res.send('N/A');
  }
});

// router.get('/:name', (req, res) => {
//   res.send(`You have requested a person ${req.params.name}`);
// });

module.exports = router;
