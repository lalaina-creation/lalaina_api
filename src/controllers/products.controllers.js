const colors = require('colors');
const { connection } = require('../db');
const path = require('path');
const fs = require('fs');

module.exports = {

    getProducts: async (req, res) => {
        console.log(colors.cyan('getProducts()'))
        connection.query('SELECT * FROM products', (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).send('Error querying the database');
                return;
            }
    
            if (results.length === 0) {
                // Handle the case where no ticket was found with the given ID
                res.status(404).send('tags not found');
                return;
            }

            res.json(results);
        });

    },

    addProduct: async (req, res) => {
        console.log(colors.cyan('addProduct()'));
        // console.log(colors.cyan('req.body:'), req.body);
        const { title, description, price, category, type } = req.body;
        console.log(colors.cyan('req.file:'), req.file);
        const imagePath = req.file ? req.file.path : null; // Get the uploaded image path
      
        const product = {
          title,
          description,
          price,
          category,
          type,
          image: imagePath, // Set the image path in the product data
        };
      
        connection.query('INSERT INTO products SET ?', product, (err, results) => {
          if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error querying the database');
            return;
          }
      
          res.status(201).send('Article ajouté avec succès !');
        });
      },
      


}