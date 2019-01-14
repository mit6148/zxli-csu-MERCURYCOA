// import node modules
const mongoose = require("mongoose");

// define a schema
const CommentPaperModelSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  author: String,
  abstract: String,
  views: Number,
  downlads: Number,
  parent: String,
  papernumber: String
});

// compile model from schema
module.exports = mongoose.model("CommentPaperModel", CommentPaperModelSchema);
