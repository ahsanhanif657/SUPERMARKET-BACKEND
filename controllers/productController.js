const db = require("../database/db");

// GET all products
const getAllProducts = (req, res, next) => {
    const sql = `
        SELECT 
            products.id,
            products.name,
            products.price,
            products.quantity,
            products.category_id,
            categories.name AS category
        FROM products
        LEFT JOIN categories
        ON products.category_id = categories.id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) return next(err);
        res.json(rows);
    });
};

// CREATE product
const createProduct = (req, res, next) => {
    const { name, price, quantity, category_id } = req.body;
    const sql = `INSERT INTO products(name, price, quantity, category_id) VALUES (?, ?, ?, ?)`;

    db.run(sql, [name, price, quantity, category_id], function (err) {
        if (err) return next(err);
        res.status(201).json({
            message: "Product Added Successfully",
            id: this.lastID
        });
    });
};

// GET product by ID
const getProductById = (req, res, next) => {
    const id = req.params.id;
    const sql = `
        SELECT  
            products.id,
            products.name,
            products.price,     
        products.quantity,
            products.category_id,
            categories.name AS category
        FROM products
        LEFT JOIN categories
        ON products.category_id = categories.id
        WHERE products.id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) return next(err);
        if (!row) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json(row);
    });
};

// UPDATE product
const updateProduct = (req, res, next) => {
    const id = req.params.id;
    const { name, price, quantity, category_id } = req.body;
    const sql = `
        UPDATE products
        SET name = ?, price = ?, quantity = ?, category_id = ?
        WHERE id = ?
    `;

    db.run(sql, [name, price, quantity, category_id, id], function (err) {
        if (err) return next(err);
        if (this.changes === 0) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json({ message: "Product Updated Successfully" });
    });
};

// DELETE product
const deleteProduct = (req, res, next) => {
    const id = req.params.id;
    const sql = `DELETE FROM products WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) return next(err);
        if (this.changes === 0) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json({ message: "Product Deleted Successfully" });
    });
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};