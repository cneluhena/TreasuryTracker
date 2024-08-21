const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  updateUserProfile,
} = require("../controllers/user");
const authenticate = require("../middlewares/auth");

router.get("/profile", authenticate, profile);
router.post("/signup", register);
router.post("/login", login);
router.put("/profile", authenticate, updateUserProfile);
module.exports = router;
