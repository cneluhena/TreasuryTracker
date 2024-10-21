const { addInterest, getLastTwelveRecords } = require('../controllers/interests');
const Interest = require('../models/interests');

// Mock the Interest model
jest.mock('../models/interests');

describe('Interest Controller Tests', () => {

  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test Suite for addInterest
   */
  describe('addInterest', () => {

    beforeEach(() => {
      req = {
        body: {
          date: '2023-10-01',
          interest: 5.2
        }
      };
    });

    it('should add interest and return a 200 status', async () => {
      Interest.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(true),
      }));

      await addInterest(req, res, next);

      expect(Interest).toHaveBeenCalledWith({
        Date: new Date(req.body.date),
        Price: req.body.interest,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Interest added successfully!');
    });

    it('should return 400 status if there is an error', async () => {
      Interest.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Error adding interest')),
      }));

      await addInterest(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Error adding interest');
    });
  });


 
});
