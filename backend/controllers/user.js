const User = require('../models/user');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res, next)=>{
try{
    const {firstName, lastName, email, phoneNumber, username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //hashing password before saving to database
    const existUsername = await User.findOne({ username: req.body.username});
    const existEmail = await User.findOne({email:req.body.email})
    if (existUsername){
        return res.status(409).send('Username already exists');
    } else if (existEmail){
        return res.status(409).send('Email already exists');
    }
    const user = new User({
        username, password: hashedPassword, firstName, lastName, email, phoneNumber
    });
    await user.save();
    res.status(200).send('User registration successful!');

} catch{
    console.log('Error creating user');
    res.status(400).send('Error creating user');
}
    
};


const login = async (req, res, next)=>{

    try{

        const {username, password} = req.body;
        console.log(username);
        const user = await User.findOne({username});
        if(!user){
            console.log('User Not Found')
            return res.status(400).send('User Not Found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            console.log('Invalid Password');
            return res.status(400).send('Invalid Password');
        }

        const token = jwt.sign({username: user.username}, process.env.SECRET_KEY, {expiresIn: '1h'}); 
        res.cookie('token', token, { httpOnly: true, secure: false });
        res.status(200).send("Success")
        
        
    } catch{

        console.log('Error logging in');
        res.status(400).send('Error logging in');
    }
}


module.exports = {register, login};

