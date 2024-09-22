# Dockerfile for Node.js Backend
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the port
EXPOSE 5000

# Start the app
CMD ["npm", "run", "start"]