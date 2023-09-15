const path = require('path');

module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: 'localhost',  // Change to your Laragon MySQL host
        user: 'root',
        password: 'root',
        database: 'lalaina_creation',
      },
      migrations: {
        directory: './database/migrations/',  // Create a directory for your migrations
      },
    },
  };
  