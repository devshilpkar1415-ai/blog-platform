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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err.message));

app.get("/", (req, res) => {
  res.send("Blog API Running");
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User Registered" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({
      message: "Login Success",
      token,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.post("/create-post", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      image: req.body.image,
    });

    await post.save();
    res.json({ message: "Post Created" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.put("/like-post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes = (post.likes || 0) + 1;
    await post.save();

    res.json({ message: "Post Liked" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = app;