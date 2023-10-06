const { Router } = require('express');
const router = Router();

const { getAttributes } = require('../controllers/attributes.controllers');

router.get('/getAttributes', getAttributes);


module.exports = router;
