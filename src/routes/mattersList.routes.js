const { Router } = require('express');
const router = Router();

const { getMattersList } = require('../controllers/mattersList.controllers');

router.get('/getMattersList', getMattersList);


module.exports = router;
