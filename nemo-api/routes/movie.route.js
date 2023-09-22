const express = require("express");
const movieModel = require("../models/movie.model.js");

const movieRouter = express.Router();

movieRouter.get("/", async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json({ totalMovies: movies.length, movies });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

movieRouter.post("/", async (req, res) => {
  try {
    const movie = await movieModel.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

movieRouter.get("/:id", async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

movieRouter.put("/:id", async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

movieRouter.delete("/:id", async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

module.exports = movieRouter;
