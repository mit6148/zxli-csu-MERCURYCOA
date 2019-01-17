// import node modules
const mongoose = require("mongoose");

// define a schema
const CommentPaperModelSchema = new mongoose.Schema({
  author: String,
  views: Number,
  downlads: Number,
  parent_user_id: String,
  parent_paper_fileName: String,
  // parent_paper_id: String,
  commentnumber: String
});

// compile model from schema
module.exports = mongoose.model("CommentPaperModel", CommentPaperModelSchema);
