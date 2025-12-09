// const mysql = require('mysql2/promise');

// const db = mysql.createPool({
//     host: '127.0.0.1',     // host saja
//     port: 8889,            // port MySQL MAMP
//     user: 'root',
//     password: 'root',
//     database: 'toko_sederhana',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // db.connect((err) => {
// //     if (err) throw err;
// //     console.log('MySQL Connected...');
// // });

// module.exports = db;


const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'toko_sederhana'
});

module.exports = db.promise();
