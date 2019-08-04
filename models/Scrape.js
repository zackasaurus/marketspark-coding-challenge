const mongoose = require('mongoose');

const ScrapeSchema = mongoose.Schema({
  _url: {
    type: String,
    required: true
  },
  _performance: {
    type: String,
    required: true
  },

  _html: {
    type: String,
    required: true
  },

  _date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scrape', ScrapeSchema);
