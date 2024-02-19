const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const multer = require("multer");

const blogSchema = mongoose.Schema({
  url: String,
  description: String,
  blog: String,
  datePosted: String,
  category: String,
  imageCover: String,
});

mongoose.connect(process.env.MONGO_STRING);
const blog = mongoose.model("Blog", blogSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

app.use((req, res, next) => {
  const time = new Date();
  req.body.datePosted = `${time}`;

  next();
});

app.post("/publish", (req, res) => {
  try {
    blog.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Your Blog Was Successfully Added" });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Your Blog Was Not Submitted" });
    console.error(error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now() + "-" + file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

app.post("/api/uploadFile", uploads.single("file"), (req, res) => {
  const url = `/api/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, data: url });
});

app.get("/api/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  res.status(200).sendFile(path.join(__dirname, "uploads", `${filename}`));
});

app.get("/api/blog/:url", async (req, res) => {
  try {
    const { url } = req.params;

    const singleBlog = await blog.findOne({ url: url });
    const item = {
      description: singleBlog.description,
      blog: singleBlog.blog,
      datePosted: singleBlog.datePosted,
    };

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(404).json({ success: false, message: "could not get the data" });
    console.error(error);
  }
});

app.get("/api/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const categoryBlogs = await blog.find({ category: category });
    const categoryList = categoryBlogs.map((blog) => {
      return {
        imageCover: blog.imageCover,
        description: blog.description,
        datePosted: blog.datePosted,
        url: blog.url,
      };
    });

    res.status(200).json({ success: true, data: categoryList });
  } catch (error) {
    res.status(404).json({ success: false, message: "could not get the data" });
    console.error(error);
  }
});

app.get("/api/navBtns", async (req, res) => {
  try {
    const blogs = await blog.find().exec();
    const categories = [...new Set(blogs.map((blog) => blog.category))];

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(404).json({ success: false, message: "could not get the data" });
    console.error(error);
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const data = await blog.find().exec();

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(404).json({ success: false, message: "could not get the data" });
    console.error(error);
  }
});

app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} ...`);
});
