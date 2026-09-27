const express = require("express");
const app = express();
const port = 3000;

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryroutes");
const errorHandler = require("./middleware/errorhandler");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to SuperMarket Backend API!");
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});