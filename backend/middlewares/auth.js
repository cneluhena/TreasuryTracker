const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const path = require('path');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token, "hi am auth");
    if (!token) {
      return res.status(401).send("Unauthorized Access!");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(401).send("User Not Found!");
    }
    req.user = user;
    next();
  } catch {
    res.clearCookie("token");
    console.log("Error authenticating user");
  }
};

module.exports = authenticate;
