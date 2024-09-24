const mongoose = require('mongoose');
const interestSchema = new mongoose.Schema({ Date: Date, Price: Number,  TimePeriod: Number, Type: String}, {
    timeseries: {
      timeField: 'Date',
      metaField: 'Price',
    }
  });

//const interestDB = mongoose.connection.useDb('InterestRates')

const Interest = mongoose.model("Interest", interestSchema)
module.exports = Interest;