const express = require("express");
const mongoose = require("mongoose");

const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");

const app = express();

// connect db
mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({});
  res.render("index", {
    photos,
  });
});

app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

app.get("/photos/:id", async (req, res) => {
  // console.log(req.params.id);   // https://www.tutorialspoint.com/req-params-property-in-express-js
  const photo = await Photo.findById(req.params.id);
  res.render("photo",{
    photo
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatildi..`);
});
