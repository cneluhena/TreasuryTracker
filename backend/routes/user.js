const express = require('express');
const router = express.Router();
const {register, login, logout, cookieCheck} = require('../controllers/user');
const authenticate  = require('../middlewares/auth');


router.get('/profile',authenticate,(req, res)=>{
    res.json(req.user);
})

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', authenticate, cookieCheck);

module.exports = router;


