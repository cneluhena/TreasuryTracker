const express = require('express');
const router = express.Router();


const {addInterest, getLastTwelveRecords} = require("../controllers/interests");


router.post("/add", addInterest);
router.get("/get", getLastTwelveRecords)
module.exports = router;