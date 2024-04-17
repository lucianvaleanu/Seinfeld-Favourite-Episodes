require("dotenv").config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    debug: false
});

pool.getConnection((err, connection) => {
    return new Promise((resolve, reject) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                reject('Database connection was closed.');
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                reject('Database has too many connections.');
            }
            if (err.code === 'ECONNREFUSED') {
                reject('Database connection was refused.');
            }
        }
        if (connection) connection.release()
        resolve();
    });
});

module.exports = pool
