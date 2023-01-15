const Photo = require("../models/Photo");
const fs = require("fs");

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos = await Photo.find().countDocuments(); // Veri tabanindaki butun datalari sayar mongo dbdeki

  // console.log(req.query); // sonuclari asagida
  // // ! http://localhost:3000/?user=test&pass=1234 buraya sorgu gonderdik ve bize consolelog sunu dondu ==>> { user: 'test', pass: '1234' }
  // // ! http://localhost:3000/?page=3 buraya sorgu gonderdik ve bize consolelog sunu dondu ==>> { page: '3'}
  const photos = await Photo.find({}).sort("-dateCreated").skip((page - 1) * photosPerPage).limit(photosPerPage);
  res.render("index", {
    photos:photos,
    current:page,
    pages:Math.ceil(totalPhotos / photosPerPage)
  });
};

exports.getPhoto = async (req, res) => {
  // console.log(req.params.id);   // https://www.tutorialspoint.com/req-params-property-in-express-js
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const photo = await Photo.create({
    ...req.body,
  });

  let uploadedImage = req.files.image.name.split(".");
  let uploadedImageName = uploadedImage[0] + photo._id + "." + uploadedImage[1];
  let path = __dirname + "/../public/uploads/" + uploadedImageName;

  req.files.image.mv(path, async () => {
    photo.image = "/uploads/" + uploadedImageName;
    await photo.save();
    res.redirect("/");
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
