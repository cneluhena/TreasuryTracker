const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/user");
const authenticate = require("../middlewares/auth");

router.get("/profile", authenticate, profile);
router.post("/signup", register);
router.post("/login", login);
module.exports = router;
