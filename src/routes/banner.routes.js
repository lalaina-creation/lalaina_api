const { Router } = require('express');
const router = Router();
const multer  = require('multer')
const fs = require('fs');

const { getBanner, editBanner, uploadImage } = require('../controllers/banner.controller');
const verifyToken = require('../middlewares/verifyToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/banners'); // Save files to the 'uploads/banners' folder
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now(); // Generate a timestamp
      const extension = file.originalname; // Get the file extension
      const filename = `${timestamp}.${extension}`; // Create a timestamped filename
      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage });

  //create folder if not exist
    const dir = './uploads/banners';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }


router.get('/', getBanner);
router.put('/edit', verifyToken, editBanner);
router.post('/upload', verifyToken, upload.single('file'), uploadImage);

module.exports = router;
