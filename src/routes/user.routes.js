const { Router } = require('express');
const router = Router();

const { signIn, register } = require('../controllers/user.controller');

router.post('/sign-in', signIn);
router.post('/register', register);

module.exports = router;
