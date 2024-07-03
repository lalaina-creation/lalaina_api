const { Router } = require('express');
const router = Router();
const multer  = require('multer')

const { getProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/products.controllers');
const verifyToken = require('../middlewares/verifyToken');


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
  router.post('/addProduct', verifyToken, upload.array('images', 4), addProduct);
  router.put('/updateProduct/:id', verifyToken, upload.array('images', 4), updateProduct);
  router.delete('/deleteProduct/:id', verifyToken, deleteProduct);

module.exports = router;
