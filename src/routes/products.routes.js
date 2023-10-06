const { Router } = require('express');
const router = Router();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const { getProducts, addProduct } = require('../controllers/products.controllers');


// Configure multer to save files to the 'uploads' folder with a timestamped filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save files to the 'uploads' folder
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now(); // Generate a timestamp
      const extension = file.originalname; // Get the file extension
      const filename = `${timestamp}.${extension}`; // Create a timestamped filename
      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage });
  

  
  router.get('/getProducts', getProducts);
  
  // Use the upload middleware for handling image uploads
  router.post('/addProduct', upload.single('image'), addProduct);

module.exports = router;
