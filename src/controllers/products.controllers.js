const colors = require('colors');
const { query } = require('../db');
const path = require('path');
const fs = require('fs');

module.exports = {

    getProducts: async (req, res) => {
        console.log(colors.cyan('getProducts()'))
        const sql = `SELECT * FROM products ORDER BY id DESC`;

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
        const { title, description, price, category, matter, col, threads, size, color, stock_quantity, hand_wash, ironing } = req.body;
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
          stock_quantity,
          //transform to boolean
          hand_wash: hand_wash == 'true' ? true : false,
          ironing: ironing == 'true' ? true : false
        };
        console.log(colors.cyan('product:'), product);
    
        await query('INSERT INTO products SET ?', [product]);
        return res.status(201).send('Product added successfully!');
      } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).send('Error querying the database');
      }
    },

    updateProduct: async (req, res) => {
      console.log(colors.cyan(`updateProduct(${req.params.id})`))
      const { id } = req.params;
      if(!id || id === 'undefined') return res.status(400).send('Missing id');
      const { title, description, price, category, matter, col, threads, size, color, stock_quantity, hand_wash, ironing } = req.body;
      const imagePaths = req.files ? req.files.map(file => file.path) : [];
      console.log(colors.cyan('images:'), imagePaths);
      const imagePathsString = imagePaths.join(',');
      console.log(colors.cyan('imagePathsString:'), imagePathsString);
      
      const product = {
        title,
        description,
        price,
        category,
        matter,
        col,
        threads,
        size,
        color,
        stock_quantity,
        //transform to boolean
        hand_wash: hand_wash == 'true' ? true : false,
        ironing: ironing == 'true' ? true : false
      };
      if(imagePathsString) product.images = imagePathsString;
      console.log(colors.cyan('product:'), product);
      
      try {
        const sql = `UPDATE products SET ? WHERE id = ${id}`;
        await query(sql, [product]);
        return res.status(200).send('Product updated successfully!');
      } catch (error) {
        console.error('Error querying the database:', error);
        return res.status(500).send('Error querying the database');
      }
      
    },

    deleteProduct: async (req, res) => {
      console.log(colors.cyan('deleteProduct()'))
      const { id } = req.params;
      if(!id || id === 'undefined') return res.status(400).send('Missing id');
      
      const sql = `DELETE FROM products WHERE id = ${id}`;
      query(sql, (err, results) => {
          if (err) {
              console.error('Error querying the database:', err);
              res.status(500).send('Error querying the database');
              return;
          }

          if (results.affectedRows === 0) {
              // Handle the case where no ticket was found with the given ID
              res.status(404).send('Product not found');
              return;
          }

          res.status(200).send('Product deleted successfully');
      });
    }

}