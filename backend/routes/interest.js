const express = require("express");
const router = express.Router();

const {
  addInterest,
  getLastTwelveRecords,
  answerQuestions,
  predict,
} = require("../controllers/interests");

router.post("/add", addInterest);
router.get("/get", getLastTwelveRecords);
router.post("/questions", answerQuestions);
router.post("/predict", predict);
module.exports = router;
