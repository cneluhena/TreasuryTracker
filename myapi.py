from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Apply CORS to the Flask app

# Load your pre-trained model
model = load_model('model/Code/biLSTM.h5')

# Initialize the MinMaxScaler with the same range as used during training
# scaler = MinMaxScaler(feature_range=(0,1))

data = pd.read_csv('model/Data/3-Month 2009-2019.csv')
data=data.iloc[::-1].reset_index(drop=True)

data['Date'] = pd.to_datetime(data['Date'])
data.set_index('Date', inplace=True)
data = data[['Price']]  # Select the X3M column
data = data.dropna()

# Normalize the data
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)

def predict_future(model, data, time_step, future_steps):
    predictions = []
    last_sequence = data[-time_step:]
    
    for _ in range(future_steps):
        # Prepare the input data
        input_data = last_sequence.reshape((1, time_step, 1))
        
        # Predict the next value
        predicted_value = model.predict(input_data)
        
        # Store the predicted value
        predictions.append(predicted_value[0, 0])
        
        # Update the last_sequence
        last_sequence = np.append(last_sequence[1:], predicted_value, axis=0)
    
    return predictions

@app.route('/api', methods=['GET'])
def get_predicts():
    return jsonify({'message': 'Welcome to the API'})

# Define a POST route to accept input and provide predictions
@app.route('/predict', methods=['GET'])
def predict():
    try:

        # Make predictions using the model
        predictions = predict_future(model, scaled_data, 23, 7)

        # Inverse transform the predictions to get them back to the original scale
        output = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))

        # Convert output to a list for JSON serialization
        output_list = output.tolist()
        future_dates = pd.date_range(start=data.index[-1], periods=7 + 1, freq='W')[1:]
        future_dates = future_dates.strftime('%Y-%m-%d').tolist()
        predictions_with_dates = [{'date': date, 'interest_rate': rate} for date, rate in zip(future_dates, output_list)]
        # Return the predictions as a JSON response
        return jsonify(predictions_with_dates)

    except Exception as e:
        return jsonify({'error': str(e)})
    


if __name__ == '__main__':
    app.run(debug=True)

