const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/user');
const authenticate  = require('../middlewares/auth');


router.get('/profile',authenticate,(req, res)=>{
    res.json(req.user);
})

router.post('/signup', register);
router.post('/login', login)

module.exports = router;


