const express = require("express");
const router = express.Router();

const {
  register,
  profile,
  updateUserProfile,
  login,
  cookieCheck,
  logout,
} = require("../controllers/user");
const authenticate = require("../middlewares/auth");

router.get("/profile", authenticate, profile);
router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", authenticate, cookieCheck);
router.put("/profile", authenticate, updateUserProfile);

module.exports = router;
