// import node modules
const mongoose = require("mongoose");

// define a schema
const PaperModelSchema = new mongoose.Schema({
  parent: String,
  author: String,
  abstract: String,
  subject: String, // select list
  // method: String,
  views: {
    type: Number,
    default: 0
  },
  downlads: Number,
  papernumber: String
});

// compile model from schema
module.exports = mongoose.model("PaperModel", PaperModelSchema);
