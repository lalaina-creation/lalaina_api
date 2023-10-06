const colors = require('colors');
const { connection } = require('../db');

module.exports = {

   getAttributes: async (req, res) => {
         console.log(colors.cyan('getAttributes()'))

        const sql = `SELECT * FROM attributes`;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).send('Error querying the database');
                return;
            }
    
            if (results.length === 0) {
                // Handle the case where no ticket was found with the given ID
                res.status(404).send('Attributes not found');
                return;
            }

            res.json(results);
        });
    
    }


}