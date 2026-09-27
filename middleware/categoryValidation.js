const validateCategory = (req, res, next) => {

    const { name } = req.body;

    // Name required
    if (!name || name.trim() === "") {
        return res.status(400).json({
            error: "Category name is required"
        });
    }

    // Minimum length
    if (name.trim().length < 2) {
        return res.status(400).json({
            error: "Category name must be at least 2 characters"
        });
    }

    // Maximum length
    if (name.trim().length > 100) {
        return res.status(400).json({
            error: "Category name cannot exceed 100 characters"
        });
    }

    next();
};

module.exports = validateCategory;