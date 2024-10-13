const express = require("express");
const router = express.Router();

const {
  addInterest,
  getLastTwelveRecords,
  answerQuestions,
} = require("../controllers/interests");

router.post("/add", addInterest);
router.get("/get", getLastTwelveRecords);
router.post("/questions", answerQuestions);
module.exports = router;
