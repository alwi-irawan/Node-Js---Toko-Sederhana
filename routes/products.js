const express = require('express');
const router = express.Router();
const db = require('../db');// mysql2/promise

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM products");
        res.render("products/index", { products: rows });
    } catch (error) {
        console.error(error);
        res.send("Error mengambil data produk");
    }
});


router.get('/add', (req, res) => {
    res.render('products/add');
});

router.post('/add', async (req, res) => {
    const { name, price } = req.body;
    try {
        await db.query(
            "INSERT INTO products (name, price) VALUES (?, ?)",
            [name, price]
        );
        res.redirect('/products');
    } catch (err) {
        console.log(err);
        res.send("Gagal menyimpan produk");
    }
});

module.exports = router;
