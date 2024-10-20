const mongoose = require('mongoose');
const Investment = require('../models/investment'); // Path to your investment model

describe('Investment Model Tests', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://cmalindu93:cmalindu93@cluster0.xh1ho.mongodb.net/TreasuryTrackerTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should insert a valid investment document', async () => {
    const investmentData = {
      userId: 'U12345',
      investmentName: 'Government Bond',
      investmentType: 'Treasury Bonds',
      investmentAmount: 15000,
      maturityPeriod: 5,
      expectedReturn: 2000,
      investmentDate: new Date('2024-05-10T00:00:00.000Z'),
      maturityDate: new Date('2029-05-10T00:00:00.000Z'),
      interestRate: 5.5,
    };

    const investment = new Investment(investmentData);
    const savedInvestment = await investment.save();
    
    expect(savedInvestment._id).toBeDefined(); // Check if document was saved successfully
    expect(savedInvestment.investmentName).toBe(investmentData.investmentName);
  });

  it('should fail to insert an investment document with missing required fields', async () => {
    const invalidInvestmentData = {
      userId: 'U12345',
      investmentType: 'Treasury Bonds',
      investmentAmount: 15000,
      maturityPeriod: 5,
      expectedReturn: 2000,
      investmentDate: new Date('2024-05-10T00:00:00.000Z'),
      maturityDate: new Date('2029-05-10T00:00:00.000Z'),
      interestRate: 5.5,
    };

    const investment = new Investment(invalidInvestmentData);
    await expect(investment.save()).rejects.toThrow(); // Check for validation error
  });

  it('should fail to insert an investment document with wrong data type', async () => {
    const invalidInvestmentData = {
      userId: 'U12345',
      investmentName: 'Government Bond',
      investmentType: 'Treasury Bonds',
      investmentAmount: 'Fifteen Thousand', // Invalid data type
      maturityPeriod: 5,
      expectedReturn: 2000,
      investmentDate: new Date('2024-05-10T00:00:00.000Z'),
      maturityDate: new Date('2029-05-10T00:00:00.000Z'),
      interestRate: 5.5,
    };

    const investment = new Investment(invalidInvestmentData);
    await expect(investment.save()).rejects.toThrow(); // Check for validation error
  });
});
