const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  titleUrl: String,
  imageUrl: String,
  published: String,
  excerpt: String,
  popular: Boolean,
  trending: Boolean,
  body: String,
});

const newsModel = mongoose.model("News", schema);
module.exports = newsModel;
