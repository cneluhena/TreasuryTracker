const Interest = require("../models/interests");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const mongoose = require("mongoose");

const addInterest = async(req, res, next)=>{
    const date = req.body.date;
    const interest = req.body.interest;
    const newInterest = new Interest({
        Date: new Date(date),
        Price: interest
    })

    try {
        await newInterest.save();
        res.status(200).send("Interest added successfully!");
      } catch (error) {
        console.log(error);
        console.log("Error adding interest");
        res.status(400).send("Error adding interest");
      }
    
}

const getLastTwelveRecords = async (req, res) => {
    try {
        const lastTwelveRecords = await Interest.find()
            .sort({ Date: -1 })  // Sort by Date in descending order
            .limit(12)            // Limit to 12 records
            .exec();

        // Optional: Reverse the order to get them in chronological order
        const recordsInChronologicalOrder = lastTwelveRecords.reverse();

        res.status(200).json(recordsInChronologicalOrder);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error retrieving records");
    }
};



module.exports = { addInterest, getLastTwelveRecords}
