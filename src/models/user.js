// import node modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseFindAndFilter = require("mongoose-find-and-filter");
mongoose.plugin(mongooseFindAndFilter);

// define a schema
const UserModelSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  last_post: String,
  paper: { type: Schema.Types.ObjectId, ref: "Paper" },
  comment_paper: { type: Schema.Types.ObjectId, ref: "CommentPaper" }
});

// compile model from schema
module.exports = mongoose.model("UserModel", UserModelSchema);
