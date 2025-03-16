const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const products = require("./Data/products.json");
const menus = require("./Data/menus.json");
const category = require("./Data/category.json");
const rizzProducts = require("./Rizz-data/products.json");

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

//Rizz Category endpoints
// Get all rizz categories
app.get("/rizz-category", (req, res) => {
  res.send(category);
});

// Get single rizz category by ID
app.get("/rizz-category/:id", (req, res) => {
  const id = req.params.id;
  const result = category.find((cat) => cat.id === id);

  if (result) {
    res.send(result);
  } else {
    res.status(404).send("Rizz category not found");
  }
});

// Get products by rizz category ID
app.get("/rizz-category/:id/products", (req, res) => {
  const categoryId = req.params.id;
  const categoryProducts = rizzProducts.filter(
    (product) => product.category === categoryId
  );

  if (categoryProducts.length > 0) {
    res.send(categoryProducts);
  } else {
    res.send([]);
  }
});

// Rizz Products endpoints
// Get all rizz products
app.get("/rizz-products", (req, res) => {
  res.send(rizzProducts);
});

// Get single rizz product by ID
app.get("/rizz-products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = rizzProducts.find((product) => product.id === id);

  if (result) {
    res.send(result);
  } else {
    res.status(404).send("Rizz product not found");
  }
});

// Get rizz products by badge type
app.get("/rizz-products/badge/:type", (req, res) => {
  const badgeType = req.params.type;
  const filteredProducts = rizzProducts.filter(
    (product) => product.badge === badgeType
  );

  if (filteredProducts.length > 0) {
    res.send(filteredProducts);
  } else {
    res.send([]);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
