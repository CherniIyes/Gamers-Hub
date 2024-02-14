// ProductRoutes.js
const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductsController");

router.get("/getAll", ProductController.getAllProduct);
router.get("/:id", ProductController.getProductById);
router.post("/add", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
