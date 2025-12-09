
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'toko_sederhana'
});

module.exports = db.promise();
