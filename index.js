const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const products = require("./Data/products.json");
const menus = require("./Data/menus.json");
const category = require("./Data/category.json");
const rizzCategory = require("./Rizz-data/category.json");

app.use(cors());
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Project Nirvoy products data ");
});
//Menus
app.get("/menus", (req, res) => {
  res.send(menus);
});

app.get("/shop/:name", (req, res) => {
  const name = req.params.name;

  const result = menus.find((menu) => menu.name === name);

  if (result) {
    res.send(result);
  } else {
    res.status(404).send("Menu not found");
  }
});

//products
app.get("/products", (req, res) => {
  res.send(products);
});

//single product
app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const result = products.find((product) => product.id.toString() === id);
  console.log(result);
  res.send(result);
});

//Category
app.get("/rizz-category", (req, res) => {
  res.send(rizzCategory);
});

//single category
app.get("/rizz-category/:id", (req, res) => {
  const id = req.params.id;
  const result = rizzCategory.find((category) => category.id.toString() === id);
  console.log(result);
  res.send(result);
});

//single category products
app.get("/rizz-category/:id/products", (req, res) => {
  const id = req.params.id;
  const result = products.filter((product) => product.category === id);
  console.log(result);
  res.send(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
