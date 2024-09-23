const Investment = require("../models/investment");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");


//adding investment to the tracker
const addInvestment = async (req, res, next) => {
  const user = req.user;

  const userId = user._id.toString();
  console.log(userId); //getting the user id as a string from the user
  const {
    investmentName,
    investmentType,
    investmentAmount,
    maturityPeriod,
    expectedReturn,
    investmentDate,
    maturityDate,
    interestRate,
  } = req.body;
  const investment = new Investment({
    userId,
    investmentName,
    investmentType,
    investmentAmount,
    maturityPeriod,
    expectedReturn,
    investmentDate,
    maturityDate,
    interestRate,
  });
  console.log(investment);
  try {
    await investment.save();
    res.status(200).send("Investment added successfully!");
  } catch (error) {
    console.log(error);
    console.log("Error adding investment");
    res.status(400).send("Error adding investment");
  }
};

//getInvestments of a specific user
const getInvestments = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user); //getting the user containig in the token
    if (!user) {
      return res.status(404).send("No user Found");
    }

    const userId = user._id.toString(); //converting the userId to string

    //query to get the investments of a user from the db
    const findAllInvestments = await Investment.find({ userId });
    if (!findAllInvestments) {
      return res.status(404).send("No investments for this user");
    }
    console.log(findAllInvestments);
    return res.status(200).json(findAllInvestments);
  } catch (error) {
    return res.status(200).send("Internal Error");
  }
};

const getTotalInvestments = async (req, res, next)=>{

  try {
    const user = req.user;
    if (!user) {
      return res.status(404).send("No user Found");
    }

    const userId = user._id.toString(); //converting the userId to string
    const amount = await Investment.aggregate([
      {
        $match:{userId: userId}
      },
      {
        $group:{
          _id: null,
          amount: {$sum:"$investmentAmount"}

        }
      }
    ])
    return res.status(200).json(amount[0].amount);

  } catch (error) {
    return res.status(200).send("Internal Error");
  }

}

const getTotalActiveInvestments = async (req, res, next)=>{
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).send("No user Found");
    }

    const userId = user._id.toString(); //converting the userId to string
    const activeInvestments = await Investment.aggregate([
      {
        $match:  {userId:userId, maturityDate:{$gt: new Date()}}
      },
      {
        $group:{
          _id: null,
          amount: {$sum:"$investmentAmount"}

        }
      }
     ]
    )
    return res.status(200).json(activeInvestments[0].amount)
}
      catch (error) {
        return res.status(200).send("Internal Error");
}
}


// const getFuturePredictions = async (req, res, next) => {
//   try {
//     const response = await axios.get("http://127.0.0.1:5000/predict");
//     return res.status(200).json(response.data);
//   } catch (error) {
//     return res.status(400).send("Error in getting future predictions");
//   }
// };
module.exports = { addInvestment, getInvestments, getTotalInvestments, getTotalActiveInvestments };
