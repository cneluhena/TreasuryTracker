const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    investmentName:{
        type: String,
        required: true
    },
    investmentType:{
        type: String,
        required: true, 
        enum: ["Treasury Bills", "Treasury Bonds"]
    },
    investmentAmount:{
        type: Number,
        required: true
    },
    maturityPeriod:{
        type: Number,
        required: true
    },
    expectedReturn:{
        type: Number,
        required: true
    }, 
    investmentDate:{
        type: Date,
        required: true
    }, 
    maturityDate:{

        type: Date,
        required: true
    
    }, 
    interestRate:{
        type: Number,
        required: true
    
    }
    }
    
);


const Investment = mongoose.model('Investment', investmentSchema);


module.exports = Investment;