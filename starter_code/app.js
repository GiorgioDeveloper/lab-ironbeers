const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
const PunkAPIWrapper = require("punkapi-javascript-wrapper");
const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

//to declare partils folder (where you create files with partials example nav bar)
hbs.registerPartials(path.join(__dirname, "partials"));

//serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render("beers", { beers: beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers => {
      debugger;

      res.render("random-beer", { beers: beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server running");
});
