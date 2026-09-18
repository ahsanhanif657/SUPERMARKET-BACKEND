const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/supermarket.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected Successfully");
    }
});

module.exports = db;
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        )
    `);

    console.log("Products table created.");
});