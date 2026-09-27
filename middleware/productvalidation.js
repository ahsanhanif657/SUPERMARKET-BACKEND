const validateProduct = (req, res, next) => {

    const { name, price, quantity, category_id } = req.body ?? {};

    // Product name
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            error: "Product name is required"
        });
    }

    if (name.trim().length < 2) {
        return res.status(400).json({
            error: "Product name must be at least 2 characters"
        });
    }

    if (name.trim().length > 100) {
        return res.status(400).json({
            error: "Product name cannot exceed 100 characters"
        });
    }

    // Price
    if (price === undefined || price === null) {
        return res.status(400).json({
            error: "Price is required"
        });
    }

    if (typeof price !== "number" || !Number.isFinite(price)) {
        return res.status(400).json({
            error: "Price must be a valid number"
        });
    }

    if (price <= 0) {
        return res.status(400).json({
            error: "Price must be greater than 0"
        });
    }

    // Quantity
    if (quantity === undefined || quantity === null) {
        return res.status(400).json({
            error: "Quantity is required"
        });
    }

    if (typeof quantity !== "number" || !Number.isFinite(quantity)) {
        return res.status(400).json({
            error: "Quantity must be a valid number"
        });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            error: "Quantity must be a non-negative whole number"
        });
    }

    if (category_id !== undefined && category_id !== null &&
        (!Number.isInteger(category_id) || category_id < 1)) {
        return res.status(400).json({
            error: "Category ID must be a positive whole number"
        });
    }

    next();
};

module.exports = validateProduct;