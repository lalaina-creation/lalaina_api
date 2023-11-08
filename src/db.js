const mysql = require('mysql2');
const colors = require('colors');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
};

const connection = mysql.createPool(dbConfig);

// Connect to the database
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log(colors.bold.magenta('Connected to the database.'));

  // Release the connection
  conn.release();
});

// Export a function to execute queries
function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Handle errors and attempt to reconnect
connection.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to the database...');
    connection.getConnection((reconnectErr, conn) => {
      if (reconnectErr) {
        console.error('Error reconnecting to the database:', reconnectErr);
      } else {
        console.log('Reconnected to the database.');
        conn.release();
      }
    });
  } else {
    throw err;
  }
});

module.exports = { query };
