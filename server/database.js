// This is intended to be a file containing the database connection
// It's a separate file because it's a separate concern from the server
// It's also a separate file because it's a separate concern from the routes

// This is a file that will be imported into the server file
const mysql = require('mysql2/promise');
const dotenv = require ("dotenv");
dotenv.config({ path: "./.env" });

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

console.log(DB_HOST, DB_USER, DB_PORT, DB_PASSWORD);
var pool = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    port: parseInt(DB_PORT, 10),
    password: DB_PASSWORD,
    database: DB_NAME
});


// Export the pool using module.exports
module.exports = pool;

