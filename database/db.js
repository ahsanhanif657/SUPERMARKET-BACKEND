const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/supermarket.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected Successfully");
    }
});

db.serialize(() => {

    // Create categories table
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `);

    console.log("Categories table created.");


    // Create products table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        )
    `);

    console.log("Products table created.");


    // Add category_id to existing products table
    db.run(`
        ALTER TABLE products
        ADD COLUMN category_id INTEGER
    `, (err) => {

        if (err) {
            // Column already exists — ignore this error
            if (err.message.includes("duplicate column name")) {
                console.log("category_id already exists.");
            } else {
                console.log(err.message);
            }
        } else {
            console.log("category_id added to products.");
        }

    });

});

module.exports = db;