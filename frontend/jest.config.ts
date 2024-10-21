// jest.config.js
module.exports = {
    testEnvironment: 'jsdom', // Use jsdom for testing React components
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform JS/TS files
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: for additional setup
  };
  