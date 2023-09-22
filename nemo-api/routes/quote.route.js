const express = require("express");
const quoteModel = require("../models/quote.model.js");

const quoteRouter = express.Router();

quoteRouter.get("/", async (req, res) => {
  try {
    const quotes = await quoteModel.find({});
    res.status(200).json({ totalQuote: quotes.length, quotes: quotes });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

quoteRouter.post("/", async (req, res) => {
  try {
    const quote = await quoteModel.create(req.body);
    res.status(201).json({ success: true, data: quote });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

quoteRouter.get("/:id", async (req, res) => {
  try {
    const quote = await quoteModel.findById(req.params.id);
    if (!quote) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json(quote);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

quoteRouter.put("/:id", async (req, res) => {
  try {
    const quote = await quoteModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quote) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json(quote);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

quoteRouter.delete("/:id", async (req, res) => {
  try {
    const deletedQuote = await quoteModel.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = quoteRouter;
