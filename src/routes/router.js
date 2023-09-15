const { Router } = require('express');

const ProductsRoutes = require('./products.routes');

const router = Router();


router.use('/products', ProductsRoutes);


module.exports = router;
