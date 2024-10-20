const { addInvestment, getInvestments, getTotalInvestments, getTotalActiveInvestments,getThisMonthInvestments } = require('../controllers/investment');
const Investment = require('../models/investment');

jest.mock('../models/investment'); // Mocking the Investment model

describe('Investment Controller - addInvestment', () => {
  it('should save a new investment and return a success message', async () => {
    const req = {
      user: { _id: 'user123' },
      body: {
        investmentName: 'Test Investment',
        investmentType: 'Bond',
        investmentAmount: 1000,
        maturityPeriod: 6,
        expectedReturn: 150,
        investmentDate: new Date(),
        maturityDate: new Date(),
        interestRate: 5.5
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    const investmentMock = {
      save: jest.fn().mockResolvedValueOnce(true)
    };
    Investment.mockImplementation(() => investmentMock);

    await addInvestment(req, res);

    expect(investmentMock.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Investment added successfully!');
  });

  it('should return an error message if investment saving fails', async () => {
    const req = {
      user: { _id: 'user123' },
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    const investmentMock = {
      save: jest.fn().mockRejectedValueOnce(new Error('Saving failed'))
    };
    Investment.mockImplementation(() => investmentMock);

    await addInvestment(req, res);

    expect(investmentMock.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Error adding investment');
  });
});

describe('Investment Controller - getInvestments', () => {
    it('should return investments for the given user', async () => {
      const req = { user: { _id: 'user123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
  
      const investmentsMock = [{ investmentName: 'Test Investment', amount: 1000 }];
      Investment.find.mockResolvedValueOnce(investmentsMock);
  
      await getInvestments(req, res);
  
      expect(Investment.find).toHaveBeenCalledWith({ userId: 'user123' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(investmentsMock);
    });
  
    it('should return 404 if no user is found', async () => {
      const req = { user: null };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      await getInvestments(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('No user Found');
    });
  });


  describe('Investment Controller - getTotalInvestments', () => {
    it('should return total investment amount for the user', async () => {
      const req = { user: { _id: 'user123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
  
      Investment.aggregate.mockResolvedValueOnce([{ amount: 5000 }]);
  
      await getTotalInvestments(req, res);
  
      expect(Investment.aggregate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(5000);
    });
  
    it('should return an error if something goes wrong', async () => {
      const req = { user: { _id: 'user123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      Investment.aggregate.mockRejectedValueOnce(new Error('Database error'));
  
      await getTotalInvestments(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Internal Error');
    });
  });


  describe('Investment Controller - getTotalActiveInvestments', () => {
    it('should return total active investment amount for the user', async () => {
      const req = { user: { _id: 'user123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      };
  
      Investment.aggregate.mockResolvedValueOnce([{ amount: 3000 }]);
  
      await getTotalActiveInvestments(req, res);
  
      expect(Investment.aggregate).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(3000);
    });
  
    it('should return an error if something goes wrong', async () => {
      const req = { user: { _id: 'user123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      Investment.aggregate.mockRejectedValueOnce(new Error('Database error'));
  
      await getTotalActiveInvestments(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Internal Error');
    });
  });

