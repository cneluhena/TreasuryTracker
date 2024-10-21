const User = require('../models/user')
const Token = require('../models/token')
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const {sendEmail} = require('../helper');
const { changePassword } = require('../service/changePassword');


const requestResetPassword = async(req, res, next)=>{
    const email = await req.body.email;
    const user = await User.findOne({ email });
    
    if (!user){
        return res.status(404).send("User Not Found");
    } 
    else{
        const token = await Token.findOne({userId: user._id})
        if (token) await token.deleteOne();
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 10);

        await new Token({
            userId: user._id,
            token: hash, 
            createdAt: Date.now()
        }).save()

        const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/changePassword?token=${resetToken}&id=${user._id}`
     
        sendEmail(email, resetLink).then(
            ()=>{
                return res.status(200).send("Reset Email Sent");
            }
          
        ).catch(()=>{
            return res.status(403).send("Error Occured")
        })
       
    }
}

const resetPassword = async(req, res, next) =>{
    const userId = req.body.userId;
    const token = req.body.token;
    const newPassword = req.body.password;
    const passwordResetToken = await Token.findOne({userId})
    if (!passwordResetToken){
        const err = new Error("Link has expired. Try Again");
        err.status = 403;
        return next(err);
    }
    if ((token || userId) === null){
        const err = new Error("No user");
        err.status = 403;
        return next(err);
    }

    const isValidToken = await bcrypt.compare(token, passwordResetToken.token);
    if (isValidToken){
        const isChanged = await changePassword(userId, newPassword);
        if (isChanged){
            await passwordResetToken.deleteOne();
            return res.status(200).send("Password Changed Succesfully!!");
        }
        return res.status(404).send("Password Change not successful");
   
    } 
    return res.status(404).send("Token is not valid");

}


module.exports = {requestResetPassword, resetPassword}