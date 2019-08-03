const mongoose = require('mongoose');

const ScrapeSchema = mongoose.Schema({
  _URL: {
    type: String,
    required: true
  },

  _HTML: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scrape', ScrapeSchema);
