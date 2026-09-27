const db = require("../database/db");


// GET all categories
const getAllCategories = (req, res, next) => {

    db.all("SELECT * FROM categories", [], (err, rows) => {

        if (err) {
            return next(err);
        }

        res.json(rows);

    });

};


// CREATE category
const createCategory = (req, res, next) => {

    const { name } = req.body;

    db.run(
        "INSERT INTO categories(name) VALUES (?)",
        [name],
        function (err) {

            if (err) {
                return next(err);
            }

            res.status(201).json({
                message: "Category Added Successfully",
                id: this.lastID
            });

        }
    );

};


// GET category by ID
const getCategoryById = (req, res, next) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM categories WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return next(err);
            }

            if (!row) {
                return res.status(404).json({
                    message: "Category Not Found"
                });
            }

            res.json(row);

        }
    );

};


// UPDATE category
const updateCategory = (req, res, next) => {

    const id = req.params.id;
    const { name } = req.body;

    db.run(
        "UPDATE categories SET name = ? WHERE id = ?",
        [name, id],
        function (err) {

            if (err) {
                return next(err);
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Category Not Found"
                });
            }

            res.json({
                message: "Category Updated Successfully"
            });

        }
    );

};


// DELETE category
const deleteCategory = (req, res, next) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM categories WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return next(err);
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Category Not Found"
                });
            }

            res.json({
                message: "Category Deleted Successfully"
            });

        }
    );

};


module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};