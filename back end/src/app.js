
const express = require('express')

const app = express()

const cors = require("cors");

const fs = require('fs');


app.use(cors());
app.use(express.json());

console.log("Comienza el programa")


app.get("/emercado-api/cats/cat.json", (req, res) => {
  const rute = fs.readFileSync("../JSON/cats/cat.json/" , 'utf8');
  var object = JSON.parse(rute);
  if (object) res.send(object);
  else res.status(404).send({ message: "Product not found" });
});


app.get("/emercado-api/cats_products/:id", (req, res) => {
  id=req.params.id;
  const rute = fs.readFileSync("../JSON/cats_products/" + id +".json", 'utf8');
  object = JSON.parse(rute);
  if (object) res.send(object);
  else res.status(404).send({ message: "Product not found" });
});

app.get("/emercado-api/products/:id", (req, res) => {
  id=req.params.id;
  const rute = fs.readFileSync("../JSON/products/" + id + ".json", 'utf8');
  object = JSON.parse(rute);
  if (object) res.send(object);
  else res.status(404).send({ message: "Product not found" });
});

app.get("/emercado-api/products_comments/:id", (req, res) => {
  id=req.params.id;
  const rute = fs.readFileSync("../JSON/products_comments/" + id +".json", 'utf8');
  object = JSON.parse(rute);
  if (object) res.send(object);
  else res.status(404).send({ message: "Product not found" });
});


app.get("/emercado-api/user_cart/:id", (req, res) => {
  id=req.params.id;
  const rute = fs.readFileSync("../JSON/user_cart/" + id +".json", 'utf8');
  object = JSON.parse(rute);

  if (object) res.send(object);
  else res.status(404).send({ message: "Product not found" });
});


app.listen(3000)


