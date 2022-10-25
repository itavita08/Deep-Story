const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'testdb'
});

module.exports = db;