const express = require('express');
const ProductManager = require('./dao/ProductManager.js'); // Assuming ProductManager class is defined in a separate file

const app = express();
const port = 8080;

const productManager = new ProductManager("./products.json");

// GET /products endpoint
app.get('/products', async (req, res) => {
    try {
        let limit = parseInt(req.query.limit); // Parse the 'limit' query parameter to an integer
        if (isNaN(limit)) {
            limit = 0; // If 'limit' is not a number, set it to undefined
        }
        const products = await productManager.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /products/:id endpoint
app.get('/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.status(200).json(product); // Set status code to 200
        } else {
            res.status(404).json({ error: "Product not found" }); // Set status code to 404 if product is not found
        }
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});