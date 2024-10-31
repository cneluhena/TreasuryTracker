// const checkMaturitiesAndSendEmails = async () => {
//     const today = new Date();
//     const threeDaysFromNow = new Date(today);
//     threeDaysFromNow.setDate(today.getDate() + 3);
  
//     try {
//       // Find investments maturing in the next 3 days
//       const investmentsDue = await Investment.find({
//         maturityDate: { $gte: today, $lt: threeDaysFromNow },
//       }).populate('userId'); // Populate userId with user details
  
//       // Use a Set to track unique emails to avoid duplicates
//       const emailsToNotify = new Set();
  
//       investmentsDue.forEach(investment => {
//         const email = investment.userId.email;
//         emailsToNotify.add(email); // Add user email to the set
  
//         // Prepare the email content
//         const investmentDetails = `Amount: ${investment.amount}, Maturity Date: ${investment.maturityDate.toDateString()}`;
  
//         const mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: 'Maturity Reminder for Your Investments',
//           text: `Dear User,\n\nThe following investment is maturing in the next 3 days:\n\n${investmentDetails}\n\nBest regards,\nTreasuryTracker`,
//         };
  
//         // Send the email
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             return console.error('Error sending email:', error);
//           }
//           console.log('Email sent to:', email);
//         });
//       });
  
//     } catch (err) {
//       console.error('Error checking maturities:', err);
//     }
//   };
  
//   // Schedule the task to run every day at 12:00 PM
//   cron.schedule('0 12 * * *', () => {
//     console.log('Checking maturities and sending emails...');
//     checkMaturitiesAndSendEmails();
//   });
  
//   console.log('Email notifier running...');
  