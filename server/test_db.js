const pool = require('./database');  // Import your database connection

// Test the connection by querying the database
pool.query('SHOW TABLES;', (err, results) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connection successful. Tables:', results);
    }
    pool.end(); // Close the pool connection after the test
});
