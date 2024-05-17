const colors = require('colors');
const { query } = require('../db');

module.exports = {

    getBanner: async (req, res) => {
        console.log(colors.cyan('getBanner()'))

        const sql = `SELECT * FROM banner`;

        query(sql, (err, result) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).send('Error querying the database');
                return;
            }
    
            if (result.length === 0) {
                // Handle the case where no ticket was found with the given ID
                res.status(404).send('banner not found');
                return;
            }

            res.json(result[0]);
        });
    },

    editBanner: async (req, res) => {
        console.log(colors.cyan('editBanner()'))

        const { title, description, image } = req.body;
        const sql = `UPDATE banner SET title = '${title}', description = '${description}', image = "${image}" WHERE id = 1`;
        console.log(sql)

        try {
            query(sql, (err, result) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    res.status(500).send('Error querying the database');
                    return;
                }
                if (result.length === 0) {
                    // Handle the case where no ticket was found with the given ID
                    res.status(404).send('banner not found');
                    return;
                }
                
                res.json(result[0]);
            });
        }
        catch (err) {
            console.error('Error updating the banner:', err);
            res.status(500).send('Error updating the banner');
        }
    },

    uploadImage: async (req, res) => {
        console.log(colors.cyan('uploadImage()'))
        // console.log(req.file)
        if (!req.file || Object.keys(req.file).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        res.json({ url: `${process.env.SERVER_URL}/${req.file.destination}/${req.file.filename}` });
    }

}