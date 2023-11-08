const { Router } = require('express');
const router = Router();

const { getProductsList } = require('../controllers/productsList.controller');

router.get('/getProductsList', getProductsList);


module.exports = router;
