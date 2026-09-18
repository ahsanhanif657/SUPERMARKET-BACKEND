const express = require("express");
const app = express();
const port = 3000;

const productRoutes = require("./routes/productRoutes");

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to SuperMarket Backend API!");
});

app.use("/products", productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});