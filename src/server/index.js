const express = require("express");
const path = require("path");
const products = require("./data/products.json");

const app = express();

// SERVE STATIC PAGES
app.use(express.static(path.join(process.cwd(), "/src/static")));

// ~~~~~ API ~~~~~ //
app.get("/products", (req, res) => {
	res.send(products);
});

app.listen(3000, (...e) => console.log("Server Started", e));
