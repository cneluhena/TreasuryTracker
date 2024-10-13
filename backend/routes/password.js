const express = require('express')
const router = express.Router();
const {requestResetPassword, resetPassword} = require('../controllers/password')

router.post('/resetReq', requestResetPassword);
router.post('/reset', resetPassword)

module.exports = router;