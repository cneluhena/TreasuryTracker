const nodemailer = require('nodemailer')

const sendEmail = (email, link)=>{
  return  new Promise((resolve, reject)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "codeblooded00@gmail.com",
          pass: "bepl hgta ilsy cmkd"
        }
      });
    
      var mailOptions = {
        from: process.env.USERNAME,
        to: email,
        subject: 'Password Reset Link',
        html:`
         <h2 style="color:black">Password Reset</h2>
      <p style="color:black">If you requested a password reset, click the button below. If you didn't request a reset, please ignore this email.</p>
      <a href="${link}" style="background-color:#263238; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">
        Reset Password
      </a>
      <p style="color:black">This link will expire in 10 minutes.</p>
        `,
      };
    
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          reject("Email Sending Fail")
        } else {
          resolve("Email Sent Successfully");
        }
      })
}

);


}
 

module.exports = {sendEmail}

