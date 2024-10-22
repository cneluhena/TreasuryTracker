const Interest = require("../models/interests");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const addInterest = async (req, res, next) => {
  const date = req.body.date;
  const interest = req.body.interest;
  const newInterest = new Interest({
    Date: new Date(date),
    Price: interest,
  });

  try {
    await newInterest.save();
    res.status(200).send("Interest added successfully!");
  } catch (error) {
    console.log(error);
    console.log("Error adding interest");
    res.status(400).send("Error adding interest");
  }
};

const getLastTwelveRecords = async (req, res) => {
  try {
    const period = parseInt(req.query.period);
    console.log(period);
    const lastTwelveRecords = await Interest.find({ Period: period })
      .sort({ Date: -1 }) // Sort by Date in descending order
      .limit(12) // Limit to 12 records
      .exec();

    // Optional: Reverse the order to get them in chronological order
    const recordsInChronologicalOrder = lastTwelveRecords.reverse();

    res.status(200).json(recordsInChronologicalOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error retrieving records");
  }
};

const answerQuestions = async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).send("Please provide a question");
  }
  try {
    const response = await axios.post("http://127.0.0.1:4000/answer", {
      question,
    });
    const { answer } = response.data;

    return res.json(answer);
  } catch (error) {
    console.error("Error in communicating with FinGuide API:", error);
    return res
      .status(500)
      .json({ error: "Failed to get an answer from the Python API" });
  }
};

const predict = async (req, res) => {
  try {
    const { period } = req.body;
    if (!period) {
      return res
        .status(400)
        .json({ error: "Please provide a period for prediction" });
    }

    const response = await axios.post("http://127.0.0.1:8080/predict", {
      period,
    });
    const predictions = response.data;

    return res.json(predictions);
  } catch (error) {
    console.error("Error in communicating with prediction API:", error);
    return res
      .status(500)
      .json({ error: "Failed to get predictions from the Python API" });
  }
};

module.exports = {
  addInterest,
  getLastTwelveRecords,
  answerQuestions,
  predict,
};
