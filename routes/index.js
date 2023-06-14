const Book = require("../models/Books");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(`${process.env.MONGO_DB_API_KEY}`);

/* GET home page. */
router.get("/", async function (req, res, next) {
  const books = await Book.find();
  res.render("index", { books: books });
});
// display form
router.get("/new", function (req, res, next) {
  res.render("new");
});
// add new book
router.post("/new", async function (req, res, next) {
  await Book.create(req.body);
  res.redirect("/");
});
// display selected book
router.get("/edit/:id", async function (req, res, next) {
  const book = await Book.find({ isbn: req.params.id });
  res.render("edit", { book: book[0] });
});
//edit book in list
router.post("/edit/:id", async function (req, res, next) {
  await Book.findOneAndUpdate({ isbn: req.params.id }, req.body);
  res.redirect("/");
});
//removes book from list
router.post("/delete/:id", async function (req, res, next) {
  await Book.deleteOne({ isbn: req.params.id });
  res.redirect("/");
});

module.exports = router;
