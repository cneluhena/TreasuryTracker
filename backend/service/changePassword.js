const User = require('../models/user');
const bcrypt = require('bcryptjs');

const changePassword = async(userId, newPassword)=>{
    try{
        const user = await User.findOne({_id:userId});
        if (!user) return res.status(404).send("User not found");
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({_id: userId}, {$set: {password: hashedPassword}}, {new:true})
        return true;
    } catch(error){
        return false;
    }
        

}


module.exports = {changePassword};