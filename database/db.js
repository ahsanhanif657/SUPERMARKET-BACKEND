const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "supermarket.db"), (err) => {
    if (err) {
        console.error("SQLite connection failed:", err.message);
    } else {
        console.log("SQLite Connected Successfully");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Categories table initialization failed:", err.message);
        } else {
            console.log("Categories table initialized.");
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            category_id INTEGER
        )
    `, (err) => {
        if (err) {
            console.error("Products table initialization failed:", err.message);
        } else {
            console.log("Products table initialized.");
        }
    });

    db.all("PRAGMA table_info(products)", (err, columns) => {
        if (err) {
            console.error("Products schema check failed:", err.message);
            return;
        }

        if (!columns.some((column) => column.name === "category_id")) {
            db.run("ALTER TABLE products ADD COLUMN category_id INTEGER", (migrationErr) => {
                if (migrationErr) {
                    console.error("Products schema migration failed:", migrationErr.message);
                } else {
                    console.log("Products category_id column added.");
                }
            });
        }
    });
});

module.exports = db;
