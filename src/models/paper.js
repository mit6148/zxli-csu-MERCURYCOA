// import node modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a schema
const PaperModelSchema = new mongoose.Schema({
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  paper_parent: { type: String, required: false },
  author: { type: String, required: false },
  title: { type: String, required: false },
  abstract: { type: String, required: false },
  subject: { type: String, required: false },
  // select list
  // method: String,
  views: Number,
  downloads: { type: Number, required: false },
  papernumber: { type: String, required: false },
  filePath: { type: String, required: false },
  fileName: { type: String, required: false },
  // file name for version
  fileVerName: { type: String, required: false }
});

// compile model from schema
module.exports = mongoose.model("PaperModel", PaperModelSchema);
