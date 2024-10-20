const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../index'); // Ensure this points to your updated index.js file
const User = require('../models/user');
const authenticate = require('../middlewares/auth'); // Import the user model
jest.mock('../models/user');
jest.mock('../middlewares/auth');

// Continue with your tests as before...

describe('User Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mock data before each test
    });

    describe('Register Function', () => {
        it('should register a new user', async () => {
            User.findOne.mockImplementation((query) => {
                if (query.username === 'johndoe') {
                    return Promise.resolve(null); // Simulate username not found
                }
                if (query.email === 'john@example.com') {
                    return Promise.resolve(null); // Simulate email not found
                }
                return Promise.resolve(null);
            });

            User.prototype.save = jest.fn().mockResolvedValue(true); // Mock successful save

            const response = await request(app) // Use the imported app
                .post('/user/signup')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    phoneNumber: '1234567890',
                    username: 'johndoe',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.text).toBe("User registration successful!");
        });

        // ... rest of your tests for the Register function
    });

    describe('Login Function', () => {
        it('should log in an existing user', async () => {
            const mockUser = {
                username: 'johndoe',
                password: await bcrypt.hash('password123', 10) // Mock hashed password
            };

            User.findOne.mockResolvedValueOnce(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true); // Mock password comparison

            const response = await request(app)
                .post('/user/login')
                .send({
                    username: 'johndoe',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.text).toBe("Success");
        });

        it('should not log in with an invalid username', async () => {
            User.findOne.mockResolvedValueOnce(null); // Simulate user not found

            const response = await request(app)
                .post('/user/login')
                .send({
                    username: 'unknown',
                    password: 'password123'
                });

            expect(response.status).toBe(404);
            expect(response.text).toBe("User Not Found");
        });

        it('should not log in with an invalid password', async () => {
            const mockUser = {
                username: 'johndoe',
                password: await bcrypt.hash('password123', 10) // Mock hashed password
            };

            User.findOne.mockResolvedValueOnce(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false); // Simulate password mismatch

            const response = await request(app)
                .post('/user/login')
                .send({
                    username: 'johndoe',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(404);
            expect(response.text).toBe("Invalid Password");
        });
    });

    describe('Get profile function', ()=>{
        it('should log in an existing user', async () => {
            const mockUser = {
                username: 'johndoe',
                password: await bcrypt.hash('password123', 10) // Mock hashed password
            };

            User.findOne.mockResolvedValueOnce(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

    })

})})

describe('GET /user/profile', () => {
    let token;
  
    beforeEach(() => {
      // Mock JWT and create a fake token
      token = jwt.sign({ username: 'johndoe' }, process.env.SECRET_KEY);
    });
  
    it('should return the user profile after successful authentication', async () => {
      // Mock the authenticate middleware to call the next function, meaning it's authenticated
      authenticate.mockImplementation((req, res, next) => {
        req.user = {  username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phoneNumber: '1234567890' }; // Simulate the authenticated user
        next();
      });
  
      // Mock the User.findOne method to return a mock user
      const mockUser = {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
      };
      User.findOne.mockResolvedValue(mockUser);
  
      // Make a request to the /user/profile endpoint
      const response = await request(app)
        .get('/user/profile')
        .set('Cookie', [`token=${token}`]); // Send the token as a cookie
      
      console.log(response.body);
      expect(response.statusCode).toBe(200);
     

    });
  
    it('should return 404 if the user is not found', async () => {
      // Mock the authenticate middleware to simulate an authenticated request
      authenticate.mockImplementation((req, res, next) => {
        req.user = { username: 'johndoe' }; // Simulate the authenticated user
        next();
      });
  
      // Mock User.findOne to return null (user not found)
      User.findOne.mockResolvedValue(null);
  
      const response = await request(app)
        .get('/user/profile')
        .set('Cookie', [`token=${token}`]);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  
    it('should return 401 if the token is missing', async () => {
      // Mock authenticate middleware to simulate an unauthorized access
      authenticate.mockImplementation((req, res, next) => {
        return res.status(401).send('Unauthorized Access!');
      });
  
      const response = await request(app)
        .get('/user/profile'); // No token provided
  
      expect(response.statusCode).toBe(401);
      expect(response.text).toBe('Unauthorized Access!');
    });
  
    it('should return 500 if there is an error fetching the profile', async () => {
      // Mock authenticate middleware to simulate successful authentication
      authenticate.mockImplementation((req, res, next) => {
        req.user = { username: 'johndoe' }; // Simulate the authenticated user
        next();
      });
  
      // Mock User.findOne to throw an error
      User.findOne.mockRejectedValue(new Error('Database error'));
  
      const response = await request(app)
        .get('/user/profile')
        .set('Cookie', [`token=${token}`]);
  
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({ message: 'Error fetching user profile' });
    });
  });

