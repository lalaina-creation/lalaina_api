const { Router } = require('express');
const router = Router();

const { signIn, register, getUser } = require('../controllers/user.controller');

router.post('/sign-in', signIn);
router.post('/register', register);
router.get('/getUser', getUser);

module.exports = router;
