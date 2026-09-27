const db = require("../database/db");

const productSelect = `
    SELECT
        products.id,
        products.name,
        products.price,
        products.quantity,
        products.category_id,
        categories.name AS category
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
`;

const getAllProducts = (req, res, next) => {
    db.all(productSelect, [], (err, rows) => {
        if (err) return next(err);
        res.json(rows);
    });
};

const createProduct = (req, res, next) => {
    const { name, price, quantity, category_id } = req.body;
    const sql = `
        INSERT INTO products(name, price, quantity, category_id)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [name.trim(), price, quantity, category_id ?? null], function (err) {
        if (err) return next(err);
        res.status(201).json({
            message: "Product Added Successfully",
            id: this.lastID
        });
    });
};

const getProductById = (req, res, next) => {
    db.get(`${productSelect} WHERE products.id = ?`, [req.params.id], (err, row) => {
        if (err) return next(err);
        if (!row) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json(row);
    });
};

const updateProduct = (req, res, next) => {
    const { name, price, quantity, category_id } = req.body;
    const sql = `
        UPDATE products
        SET name = ?, price = ?, quantity = ?, category_id = ?
        WHERE id = ?
    `;

    db.run(sql, [name.trim(), price, quantity, category_id ?? null, req.params.id], function (err) {
        if (err) return next(err);
        if (this.changes === 0) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json({ message: "Product Updated Successfully" });
    });
};

const deleteProduct = (req, res, next) => {
    db.run("DELETE FROM products WHERE id = ?", [req.params.id], function (err) {
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