const express = require('express');
const path = require('path');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTES
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/products', require('./routes/products'));
app.use('/stock', require('./routes/stock'));
app.use('/pembelian', require('./routes/pembelian'));

// START SERVER
app.listen(port, () => console.log(`Server running http://localhost:${port}`));
