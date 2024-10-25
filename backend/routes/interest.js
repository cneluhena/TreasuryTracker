const express = require("express");
const router = express.Router();

const {
  addInterest,
  getLastTwelveRecords,
  answerQuestions,
  predict,
  getDates,
  getYieldData,
} = require("../controllers/interests");

router.post("/add", addInterest);
router.get("/get", getLastTwelveRecords);
router.post("/questions", answerQuestions);
router.post("/predict", predict);
router.get("/dates", getDates);
router.get("/yield", getYieldData);

module.exports = router;
