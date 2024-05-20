const colors = require('colors');
const { query } = require('../db');

module.exports = {

   getMattersList: async (req, res) => {
         console.log(colors.cyan('getMattersList()'))

        const sql = `SELECT * FROM mattersList`;

        query(sql, (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).send('Error querying the database');
                return;
            }
    
            if (results.length === 0) {
                // Handle the case where no ticket was found with the given ID
                res.status(404).send('mattersList not found');
                return;
            }

            res.json(results);
        });
    
    }

}