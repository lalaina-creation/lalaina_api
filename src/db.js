const mysql = require('mysql');
const colors = require('colors');

const connection = mysql.createConnection({
  host: 'localhost', // Change this to your Laragon MySQL host if different
  user: 'root',
  password: 'root',
  database: 'lalaina_creation',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log(colors.bold.magenta('Connected to the database.'));
});



module.exports = {connection};