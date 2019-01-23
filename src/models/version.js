// import node modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a schema
const VersionModelSchema = new mongoose.Schema({
  comments: [
    {
      // type: Schema.Types.ObjectId,
      type: String,
      ref: "CommentPaper"
    }
  ],
  version: { type: Number, required: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  parent_paper_fileName: { type: String, required: false },
  author: { type: String, required: false },
  title: { type: String, required: false },
  abstract: { type: String, required: false },
  keywords: { type: String, required: false },
  subject: { type: String, required: false },

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
});

// compile model from schema
module.exports = mongoose.model("VersionModel", VersionModelSchema);
