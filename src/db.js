const mysql = require('mysql');
const colors = require('colors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'lalaina_creation',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log(colors.bold.magenta('Connected to the database.'));
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

// Handle disconnects and reconnect
connection.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to the database...');
    connection.connect((reconnectErr) => {
      if (reconnectErr) {
        console.error('Error reconnecting to the database:', reconnectErr);
      } else {
        console.log('Reconnected to the database.');
      }
    });
  } else {
    throw err;
  }
});

module.exports = { query };
