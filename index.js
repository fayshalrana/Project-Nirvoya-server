const express = require("express");
const app = express();
const cors = require("cors");
const products = require("./Data/products.json");
const menus = require("./Data/menus.json");
const category = require("./Data/category.json");
const rizzProducts = require("./Rizz-data/products.json");
const rizzCategory = require("./Rizz-data/category.json");

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Define a route
app.get("/", (req, res) => {
  res.json({ message: "Project Nirvoy products data API" });
});

//Menus
app.get("/api/menus", (req, res) => {
  try {
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: "Error fetching menus" });
  }
});

app.get("/api/shop/:name", (req, res) => {
  try {
    const name = req.params.name;
    const result = menus.find((menu) => menu.name === name);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu" });
  }
});

//products
app.get("/api/products", (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

//single product
app.get("/api/product/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id.toString() === id);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

//Rizz Category endpoints
app.get("/api/rizz-category", (req, res) => {
  try {
    res.json(rizzCategory);
  } catch (error) {
    res.status(500).json({ error: "Error fetching rizz categories" });
  }
});

app.get("/api/rizz-category/:id", (req, res) => {
  try {
    const id = req.params.id;
    const result = rizzCategory.find((cat) => cat.id === id);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Rizz category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching rizz category" });
  }
});

app.get("/api/rizz-category/:id/products", (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryProducts = rizzProducts.filter(
      (product) => product.category === categoryId
    );

    res.json(categoryProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category products" });
  }
});

// Rizz Products endpoints
app.get("/api/rizz-products", (req, res) => {
  try {
    res.json(rizzProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching rizz products" });
  }
});

app.get("/api/rizz-products/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = rizzProducts.find((product) => product.id === id);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Rizz product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching rizz product" });
  }
});

app.get("/api/rizz-products/badge/:type", (req, res) => {
  try {
    const badgeType = req.params.type;
    const filteredProducts = rizzProducts.filter(
      (product) => product.badge === badgeType
    );
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products by badge" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Export the Express API
module.exports = app;
