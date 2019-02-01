// import node modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a schema
const CommentPaperModelSchema = new mongoose.Schema({
  comments: [
    {
      // type: Schema.Types.ObjectId,
      type: Object,
      ref: "CommentPaper"
    }
  ],
  versions: [
    {
      type: Object,
      ref: "CommentPaper"
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  author: String,
  title: String,
  abstract: { type: String, required: false },
  keywords: { type: String, required: false },
  subject: { type: String, required: false },
  method: { type: String, required: false },
  views: { type: Number, default: 0, required: false },
  likes: { type: Number, default: 0, required: false },
  downloads: { type: Number, default: 0, required: false },
  paper_parent: { type: String, required: false },
  papernumber: { type: String, required: false },
  filePath: { type: String, required: false },
  fileName: { type: String, required: false },
  date: {
    type: Date,
    default: Date.now
  }
});

// compile model from schema
module.exports = mongoose.model("CommentPaperModel", CommentPaperModelSchema);
