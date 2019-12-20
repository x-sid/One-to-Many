const mongoose = require("mongoose");

const Identifier = mongoose.model(
  "Identifier",
  new mongoose.Schema({
    cardcode: { type: String },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    }
  })
);

module.exports = Identifier;
