# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install the dependencies
RUN pip install tensorflow
RUN pip install Flask
RUN pip install Flask-Cors
RUN pip install keras
RUN pip install numpy
RUN pip install pandas
RUN pip install scikit-learn

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 5000 to allow external access to the Flask app
EXPOSE 6000

# Set the environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", port=6000]   

