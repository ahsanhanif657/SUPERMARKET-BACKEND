const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categorycontroller");

const validateCategory = require("../middleware/categoryValidation");

router.get("/", categoryController.getAllCategories);

router.post("/", validateCategory, categoryController.createCategory);

router.get("/:id", categoryController.getCategoryById);

router.put("/:id", validateCategory, categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;