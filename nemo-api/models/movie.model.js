const mongoose = require("mongoose");

const schema = mongoose.Schema({
  tmdbID: String,
  cybersoftID: String,
});

const movieModel = mongoose.model("Movie", schema);
module.exports = movieModel;
