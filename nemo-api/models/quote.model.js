const mongoose = require("mongoose");

const schema = mongoose.Schema({
  quote: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
  },
});

const quoteModel = mongoose.model("Quote", schema);
module.exports = quoteModel;
