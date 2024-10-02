# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

RUN pip install tensorflow
RUN pip install Flask
RUN pip install Flask-Cors
RUN pip install keras
RUN pip install numpy
RUN pip install pandas
RUN pip install scikit-learn

COPY . .
EXPOSE 5000

ENV FLASK_APP=myapi.py
ENV FLASK_ENV=production

CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]

