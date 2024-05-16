const { Router } = require('express');

const ProductsRoutes = require('./products.routes');
const MattersListRoutes = require('./mattersList.routes');
const ColsListRoutes = require('./colsList.routes');
const ProductsListRoutes = require('./productsList.routes');
const BannerRoutes = require('./banner.routes');
const UserRoutes = require('./user.routes');
const router = Router();


router.use('/products', ProductsRoutes);
router.use('/mattersList', MattersListRoutes);
router.use('/colsList', ColsListRoutes);
router.use('/productsList', ProductsListRoutes);
router.use('/banner', BannerRoutes);
router.use('/user', UserRoutes);


module.exports = router;
