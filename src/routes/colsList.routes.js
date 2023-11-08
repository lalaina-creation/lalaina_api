const { Router } = require('express');
const router = Router();

const { getColsList } = require('../controllers/colsList.controllers');

router.get('/getColsList', getColsList);


module.exports = router;
