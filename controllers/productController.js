console.log("Product Controller Loaded");
const db = require("../database/db");

const getAllProducts = (req, res) => {

    db.all("SELECT * FROM products", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);

    });

};
const createProduct = (req, res) => {

    const { name, price, quantity } = req.body;

    const sql = `
        INSERT INTO products(name, price, quantity)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [name, price, quantity], function (err) {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "Product Added Successfully",
            id: this.lastID
        });

    });

};
const getProductById = (req, res) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Product Not Found"
                });
            }

            res.json(row);

        }
    );

};
const updateProduct = (req, res) => {

    const id = req.params.id;
    const { name, price, quantity } = req.body;

    const sql = `
        UPDATE products
        SET name = ?, price = ?, quantity = ?
        WHERE id = ?
    `;

    db.run(sql, [name, price, quantity, id], function (err) {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.json({
            message: "Product Updated Successfully"
        });

    });

};
const deleteProduct = (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM products WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Product Not Found"
                });
            }

            res.json({
                message: "Product Deleted Successfully"
            });

        }
    );

};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};