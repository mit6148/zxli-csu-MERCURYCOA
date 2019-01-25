// import node modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a schema
const CommentPaperModelSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  author: String,
  title: String,
  likes: Number,
  views: Number,
  downloads: Number,
  paper_parent: { type: String, required: false },
  papernumber: { type: String, required: false },
  commentnumber: String,
  filePath: { type: String, required: false },
  fileName: { type: String, required: false },
  // file name for version
  // fileVerName: { type: String, required: false }
  date: {
    type: Date,
    default: Date.now
  }
});

// compile model from schema
module.exports = mongoose.model("CommentPaperModel", CommentPaperModelSchema);
