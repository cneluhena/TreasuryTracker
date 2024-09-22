const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({ Date: Date, Price: Number}, {
    timeseries: {
      timeField: 'Date',
      metaField: 'Price',
    },
  });

const Interest = mongoose.model("interests", interestSchema)

module.exports = Interest;