const express = require('express');
const router = express.Router();
const db = require('../db');

// HALAMAN TAMBAH PEMBELIAN
router.get('/add', async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM products");
        res.render('pembelian/add', { produk: products });
    } catch (err) {
        console.log(err);
        res.send("Error mengambil data produk");
    }
});

// SIMPAN PEMBELIAN
router.post('/add', async (req, res) => {
    const { produk_id, qty } = req.body;

    try {
        await db.query(
            "INSERT INTO pembelian (product_id, qty) VALUES (?, ?)",
            [produk_id, qty]
        );
        res.send("Pembelian berhasil disimpan!");
    } catch (err) {
        console.log(err);
        res.send("Gagal menyimpan pembelian");
    }
});

module.exports = router;
