console.log("Product Routes Loaded");
const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const validateProduct = require("../middleware/productvalidation");

router.get("/", productController.getAllProducts);
router.post("/", validateProduct, productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", validateProduct, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;