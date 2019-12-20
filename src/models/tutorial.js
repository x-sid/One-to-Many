const mongoose = require("mongoose");

const tutorialSchema = mongoose.Schema({
  title: String,
  author: String,
  images: [],
  comments: [],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
