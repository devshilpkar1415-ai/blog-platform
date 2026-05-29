
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

mongoose.connect(process.env.mongo_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Blog API Running");
});
app.post("/register", async (req, res) => {
  try {
   const existingUser = await User.findOne({
    email: req.body.email
});

if(existingUser){
    return res.json("Email already registered");
}

const hashedPassword = await bcrypt.hash(req.body.password, 10);

const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
});

await user.save();

res.json("User Registered");
  } catch (err) {  
res.json(err);
  }
});


app.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if(!user){
        return res.json("User not found");
    }

    const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if(!isMatch){
        return res.json("Wrong password");
    }

    const token = jwt.sign(
        { id: user._id },
        "secretkey"
    );

    res.json({
        message: "Login Success",
        token: token
    });

});

app.post("/create-post", async (req, res) => {
  console.log(req.body);

  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      image: req.body.image,
    });

    await post.save();
    res.json("Post Created");
  } catch (err) {
    res.json(err);
  }
});
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (user) {
      res.json("Login Successful");
    } else {
      res.json("Invalid Email or Password");
    }
  } catch (err) {
    res.json(err);
  }
});
// Show all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

// Edit post
app.put("/edit-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.json("Post Updated");
  } catch (err) {
    res.json(err);
  }
});

// Delete post
app.delete("/delete-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json("Post Deleted");
  } catch (err) {
    res.json(err);
  }
});
app.put("/edit-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content
    });

    res.json("Post Updated");
  } catch (err) {
    res.json(err);
  }
});
app.delete("/delete-post/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json("Post Deleted");
  } catch (err) {
    res.json(err);
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});app.put("/like-post/:id", async (req, res) => {

  try {

    const post =
    await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json("Post Liked");

  }

  catch(err){
    res.json(err);
  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

