const { Router } = require('express');

const ProductsRoutes = require('./products.routes');
const CategoriesRoutes = require('./categories.routes');
const AttributesRoutes = require('./attributes.routes');

const router = Router();


router.use('/products', ProductsRoutes);
router.use('/categories', CategoriesRoutes);
router.use('/attributes', AttributesRoutes);


module.exports = router;
