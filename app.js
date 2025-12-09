// app.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

/* ------------------ ROUTES ------------------ */

// Home → ke produk
app.get("/", (req, res) => res.redirect("/products"));

// List produk + stock
app.get("/products", async (req, res) => {
    const [rows] = await db.query(`
      SELECT p.id, p.sku, p.name, p.price, 
             IFNULL(s.quantity, 0) AS quantity
      FROM products p 
      LEFT JOIN stock s ON p.id = s.product_id
      ORDER BY p.id
  `);
    res.render("products", { products: rows });
});

// Form pembelian
app.get("/purchases/new", async (req, res) => {
    const [products] = await db.query(`SELECT id, name, price FROM products`);
    res.render("new_purchase", { products });
});

// Submit pembelian (transaction)
app.post("/purchases", async (req, res) => {
    const { product_id, qty } = req.body;
    const qtyInt = parseInt(qty);

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // Ambil produk
        const [[product]] = await conn.query(
            `SELECT id, price FROM products WHERE id = ?`,
            [product_id]
        );

        // Cek stock
        const [[stock]] = await conn.query(
            `SELECT quantity FROM stock WHERE product_id = ?`,
            [product_id]
        );

        if (!stock || stock.quantity < qtyInt) {
            await conn.rollback();
            return res.send("Stock tidak cukup!");
        }

        const newStock = stock.quantity - qtyInt;

        // Update stock
        await conn.query(
            `UPDATE stock SET quantity = ? WHERE product_id = ?`,
            [newStock, product_id]
        );

        // Insert purchase
        await conn.query(
            `INSERT INTO purchases (product_id, qty, total_price, status)
       VALUES (?, ?, ?, 'completed')`,
            [product_id, qtyInt, product.price * qtyInt]
        );

        await conn.commit();
        res.redirect("/purchases");

    } catch (err) {
        await conn.rollback();
        res.send("Error: " + err.message);
    } finally {
        conn.release();
    }
});

// List pembelian
app.get("/purchases", async (req, res) => {
    const [rows] = await db.query(`
    SELECT pu.*, p.name AS product_name
    FROM purchases pu
    LEFT JOIN products p ON pu.product_id = p.id
    ORDER BY pu.id DESC
  `);
    res.render("purchases", { purchases: rows });
});

// Cancel pembelian
app.post("/purchases/:id/cancel", async (req, res) => {
    const id = req.params.id;

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // Ambil purchase
        const [[pu]] = await conn.query(
            `SELECT * FROM purchases WHERE id = ?`,
            [id]
        );

        if (!pu || pu.status === "cancelled") {
            await conn.rollback();
            return res.redirect("/purchases");
        }

        // Update purchase → cancelled
        await conn.query(
            `UPDATE purchases SET status='cancelled', cancelled_at=NOW() WHERE id=?`,
            [id]
        );

        // Kembalikan stock
        const [[stock]] = await conn.query(
            `SELECT quantity FROM stock WHERE product_id=?`,
            [pu.product_id]
        );

        const newQty = stock.quantity + pu.qty;

        await conn.query(
            `UPDATE stock SET quantity=? WHERE product_id=?`,
            [newQty, pu.product_id]
        );

        await conn.commit();
        res.redirect("/purchases");

    } catch (err) {
        await conn.rollback();
        res.send("Error: " + err.message);
    } finally {
        conn.release();
    }
});


const pembelianRoute = require('./routes/pembelian');
app.use('/pembelian', pembelianRoute);


app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
