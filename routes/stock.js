const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM stock");
        res.render("stock/index", { stock: rows });
    } catch (err) {
        console.log(err);
        res.send("Gagal mengambil data stok");
    }
});

module.exports = router;
