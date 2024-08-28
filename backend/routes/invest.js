const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth");

const {
  addInvestment,
  getInvestments,
  getFuturePredictions,
} = require("../controllers/investment");

router.post("/add", authenticate, addInvestment);
router.get("/get", authenticate, getInvestments);
router.get("/future", getFuturePredictions);
module.exports = router;
