const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query(`
        SELECT stock.*, products.nama_produk 
        FROM stock 
        JOIN products ON stock.product_id = products.id
    `, (err, result) => {
        if (err) throw err;
        res.render('stock/index', { stock: result });
    });
});

module.exports = router;
