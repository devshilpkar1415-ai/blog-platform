const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: String,
  username: String,
  comment: String
});

module.exports = mongoose.model("Comment", CommentSchema);