// ProductController.js
const ProductModel = require("../Models/ProductsModel");

module.exports = {
    getAllProduct: function(req, res) {
        ProductModel.getAll(function(err, products) {
            if (err) {
                console.error("Error retrieving products:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json(products);
            }
        });
    },

    getProductById: function(req, res) {
        const productId = req.params.id;
        ProductModel.getById(productId, function(err, product) {
            if (err) {
                console.error("Error retrieving product:", err);
                res.status(500).json({ error: "Internal server error" });
            } else if (!product) {
                res.status(404).json({ error: "Product not found" });
            } else {
                res.json(product);
            }
        });
    },

    createProduct: function(req, res) {
        const productData = req.body;
        ProductModel.create(productData, function(err, result) {
            if (err) {
                console.error("Error creating product:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({ message: "Product created successfully", id: result.insertId });
            }
        });
    },

    updateProduct: function(req, res) {
        const productId = req.params.id;
        const productData = req.body;
        ProductModel.update(productId, productData, function(err) {
            if (err) {
                console.error("Error updating product:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Product updated successfully" });
            }
        });
    },

    deleteProduct: function(req, res) {
        const productId = req.params.id;
        ProductModel.delete(productId, function(err) {
            if (err) {
                console.error("Error deleting product:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.json({ message: "Product deleted successfully" });
            }
        });
    }
};
