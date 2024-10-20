const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth");

const {
  addInvestment,
  getInvestments,
  getFuturePredictions,
  getTotalInvestments, 
  getTotalActiveInvestments, 
  deleteInvestment
} = require("../controllers/investment");

router.post("/add", authenticate, addInvestment);
router.get("/get", authenticate, getInvestments);
router.get("/total", authenticate, getTotalInvestments)
router.get("/active", authenticate, getTotalActiveInvestments);
router.delete("/delete", authenticate, deleteInvestment);
// router.get("/predict", getFuturePredictions);
module.exports = router;
