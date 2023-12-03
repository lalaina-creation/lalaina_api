const colors = require('colors');
const { query } = require('../db');
const path = require('path');
const fs = require('fs');

module.exports = {

    getProducts: async (req, res) => {
        console.log(colors.cyan('getProducts()'))
        const sql = `SELECT * FROM products`;

        query(sql, (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                res.status(500).send('Error querying the database');
                return;
            }
    
            if (results.length === 0) {
                // Handle the case where no ticket was found with the given ID
                res.status(404).send('Products not found');
                return;
            }
            // transoform product.images to array
            results.forEach(product => {
                product.images = product.images.split(',');
            });
           
            res.json(results);
        });

    },

    addProduct: async (req, res) => {
      try {
        console.log(colors.cyan('addProduct()'));
        const { title, description, price, category, matter, col, threads, size, color, stock_quantity } = req.body;
        // const imagePath = req.file ? req.file.path : null; // Get the uploaded image path
        const imagePaths = req.files ? req.files.map(file => file.path) : [];
        console.log(colors.cyan('images:'), imagePaths);

        const imagePathsString = imagePaths.join(',');
        console.log(colors.cyan('imagePathsString:'), imagePathsString);
      
        const product = {
          title,
          description,
          price,
          images: imagePathsString,
          category,
          matter,
          col,
          threads,
          size,
          color,
          stock_quantity
        };
        console.log(colors.cyan('product:'), product);
    
        await query('INSERT INTO products SET ?', [product]);
        return res.status(201).send('Product added successfully!');
      } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).send('Error querying the database');
      }
    }
      


}