const colors = require('colors');
const { query } = require('../db');

module.exports = {

    getColsList: async (req, res) => {
        console.log(colors.cyan('getColsList()'))

        const sql = `SELECT * FROM colslist`;

        query(sql, (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).send('Error querying the database');
                return;
            }
    
            if (results.length === 0) {
                // Handle the case where no ticket was found with the given ID
                res.status(404).send('colsList not found');
                return;
            }

            res.json(results);
        });

    }


}