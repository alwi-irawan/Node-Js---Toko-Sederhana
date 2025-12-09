const express = require('express');
const router = express.Router();
const db = require('../db');

// tampil semua produk
router.get('/', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) throw err;
        res.render('products/index', { data: result });
    });
});

module.exports = router;
