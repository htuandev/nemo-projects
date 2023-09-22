const express = require("express");
const newsModel = require("../models/news.model.js");

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
  try {
    const news = await newsModel.find();
    res.status(200).json({ totalNews: news.length, news });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

newsRouter.post("/", async (req, res) => {
  try {
    const news = await newsModel.create(req.body);

    res.status(201).json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

newsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (id.includes("-")) {
      const news = await newsModel.find({ titleUrl: id });
      if (!news) {
        return res.status(400).json({ success: false });
      }
      return res.status(200).json(news[0]);
    }

    const news = await newsModel.findById(id);
    if (!news) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json(news);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

newsRouter.put("/:id", async (req, res) => {
  try {
    const updateNews = req.body;

    const news = await newsModel.findByIdAndUpdate(updateNews._id, updateNews, {
      new: true,
    });

    res.status(200).json(news);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

newsRouter.delete("/:id", async (req, res) => {
  try {
    await newsModel.findByIdAndDelete(req.params.id);

    res.status(204).json(null);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

module.exports = newsRouter;
