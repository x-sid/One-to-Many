const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    gender: { type: String }
  })
);

module.exports = Customer;
