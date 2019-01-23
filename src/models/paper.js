// import node modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a schema
const PaperModelSchema = new mongoose.Schema({
  comments: [
    {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: "CommentPaper"
    }
  ],
  versions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Version"
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  // paper_parent: { type: String, required: false },
  author: { type: String, required: false },
  title: { type: String, required: false },
  abstract: { type: String, required: false },
  keywords: { type: String, required: false },
  subject: { type: String, required: false },
  // select list
  // method: String,
  views: { type: Number, default: 0, required: false },
  downloads: { type: Number, default: 0, required: false },
  papernumber: { type: String, required: false },
  filePath: { type: String, required: false },
  fileName: { type: String, required: false },
  paper_parent_fileName: { type: String, required: false },
  date: {
    type: Date,
    default: Date.now
  }
  // file name for version
  // fileVerName: { type: String, required: false }
});

// compile model from schema
module.exports = mongoose.model("PaperModel", PaperModelSchema);
