// import node modules
const mongoose = require("mongoose");

// define a schema
const PaperModelSchema = new mongoose.Schema({
  parent:  { type: String, required: false },
  author:  { type: String, required: false },
  abstract:  { type: String, required: false },
  subject:  { type: String, required: false }, // select list
  // method: String,
  // views: Number,
  downlads:  { type: Number, required: false },
  papernumber:  { type: String, required: false },
  filePath:  { type: String, required: false }
});

// compile model from schema
module.exports = mongoose.model("PaperModel", PaperModelSchema);
