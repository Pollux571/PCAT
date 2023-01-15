const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");


// ! Controllers
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageController");
const app = express();

// connect db
mongoose.connect("mongodb+srv://pcat:moNGl5rwbGdg1hKl@cluster0.sysnjz9.mongodb.net/pcat-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(()=>{
  console.log("we are connected")
}).catch((err)=>{
  console.log(err);
})

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//ROUTES
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/photos/edit/:id", pageController.getEditPage);
app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatildi..`);
});
