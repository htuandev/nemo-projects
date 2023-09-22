const express = require("express");
const { json, urlencoded } = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const movieRouter = require("./routes/movie.route.js");
const newsRouter = require("./routes/news.route.js");
const quoteRouter = require("./routes/quote.route.js");
const path = require("path");

const app = express();
dotenv.config();
app.use(json());
app.use(cors());
app.use(
  urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 8080;
const URI = process.env.MONGODB_URI;

mongoose
  .set("strictQuery", true)
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

app.get("/cinema", (req, res) => {
  const filePath = path.join(__dirname, "public", "nemo-cinema.jpg");
  res.sendFile(filePath);
});

app.get("/quotes", (req, res) => {
  const filePath = path.join(__dirname, "public", "nemo-quotes.jpg");
  res.sendFile(filePath);
});

app.get("/icon", (req, res) => {
  const filePath = path.join(__dirname, "public", "favicon.ico");
  res.sendFile(filePath);
});

app.get("/logo", (req, res) => {
  const filePath = path.join(__dirname, "public", "logo192.png");
  res.sendFile(filePath);
});

app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/quote", quoteRouter);

app.use((req, res) => {
  if (req.method !== "GET") {
    res.status(400).send("Bad Request");
  } else {
    res.redirect("/");
  }
});
