const express = require("express");
const path = require("path");

// ! Middle wares  =  middle vare aslinda bir aracidir request ile response arasinda verileri getir gotur islemeni yapar bu isleminde dogru duzgun yapilmasi icin next() fonksiyonu caigirlir. ve app.use(fonksiyon) ili caigirilir.
const app = express();
app.use(express.static("public"));

const myLogger = function (req, res, next) {
  console.log("midwareloged");
  next();
};

const myLogger2 = function (req, res, next) {
  console.log("ben ikinci middlewarim");
  next();
};

app.use(myLogger);
app.use(myLogger2);

app.get("/", (req, res) => {
  // get request genelikle verileri listelemek icin kullanilir. post ise veri gondermek icin.
  const photo = {
    id: 1,
    name: "photo name",
    description: "Photo description",
  };
  res.send(photo); // res.sende()  app.use gibi    app.get metodun middle waredir eger res.send() olmazsa sayfamiz hep beklemed kalir ve calismaz middleware tikanir.
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

app.get("/about.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/about.html"));
});

app.get("/contact.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/contact.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} de baslatildi`);
});
