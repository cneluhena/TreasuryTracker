const User = require("../models/user");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, username, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hashing password before saving to database
    const existUsername = await User.findOne({ username: req.body.username });
    const existEmail = await User.findOne({ email: req.body.email });
    if (existUsername) {
      return res.status(409).send("Username already exists");
    } else if (existEmail) {
      return res.status(409).send("Email already exists");
    }
    const user = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    await user.save();
    res.status(200).send("User registration successful!");
  } catch {
    console.log("Error creating user");
    res.status(400).send("Error creating user");
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User Not Found");
      return res.status(400).send("User Not Found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Invalid Password");
      return res.status(400).send("Invalid Password");
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(200).send("Success");
  } catch {
    console.log("Error logging in");
    res.status(400).send("Error logging in");
  }
};

const profile = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Send profile data (excluding sensitive information like password)
    res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};


const updateUserProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    await user.save(); // Save changes to the database
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

const logout = async(req, res, next)=>{
    try{

        res.clearCookie('token');
        res.status(200).send('logged out');
    
    } catch(error){
        console.error(error);
    }
}

const cookieCheck = async(req, res, next)=>{
    try{
        if (req.cookies.token){
            res.status(200).send('logged');
        } else{
            res.send('Please Logged in');
        }
    } catch(error){
        res.send(error);
    }
}


module.exports = { register, login, profile, updateUserProfile, login, logout, cookieCheck };
