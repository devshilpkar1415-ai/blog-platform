const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Post", PostSchema);