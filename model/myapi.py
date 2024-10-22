from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Dictionary to store models and data for different time periods
models = {}
data_dict = {}
scalers = {}

def load_model_and_data(time_period):
    model_path = f'monthly/{time_period}.h5'
    data_path = f'Data/Sri Lanka {time_period} Bond Yield Historical Data.csv'
    
    if os.path.exists(model_path) and os.path.exists(data_path):
        model = load_model(model_path)
        data = pd.read_csv(data_path)
        data = data.iloc[::-1].reset_index(drop=True)
        data['Date'] = pd.to_datetime(data['Date'])
        data.set_index('Date', inplace=True)
        data = data[['Price']]
        data = data.dropna()
        
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(data.values.reshape(-1, 1))
        
        return model, data, scaled_data, scaler
    else:
        print(f'Model or data not found for {time_period}')
        return None, None, None, None

# Load models and data for different time periods
time_periods = ['3-Month', '6-Month', '1-Year', '2-Year','5-Year']
for period in time_periods:
    models[period], data_dict[period], _, scalers[period] = load_model_and_data(period)

def predict_future(model, data, time_step, future_steps):
    predictions = []
    last_sequence = data[-time_step:]
    
    for _ in range(future_steps):
        input_data = last_sequence.reshape((1, time_step, 1))
        predicted_value = model.predict(input_data)
        predictions.append(predicted_value[0, 0])
        last_sequence = np.append(last_sequence[1:], predicted_value, axis=0)
    
    return predictions

@app.route('/api', methods=['GET'])
def get_predicts():
    return jsonify({'message': 'Welcome to the API'})

@app.route('/history', methods=['GET'])
def get_history():
    time_period = request.args.get('period', '3-Month')
    if time_period not in data_dict:
        return jsonify({'error': 'Invalid time period'}), 400
    
    data = data_dict[time_period].values.reshape(-1, 1)
    result = [{'date': str(index.date()), 'interest': [row.Price]} for index, row in data.iterrows()]
    return jsonify(result)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        time_period = request.json.get('period', '3-Month')
        if time_period not in models:
            return jsonify({'error': 'Invalid time period'}), 400
        
        model = models[time_period]
        data = data_dict[time_period]
        #scaler = scalers[time_period]
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(data.values.reshape(-1, 1))
        #scaled_data = scaler.transform(data)
        
        predictions = predict_future(model, scaled_data, 23, 7)
        output = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
        output_list = output.tolist()
        
        future_dates = pd.date_range(start=data.index[-1], periods=7 + 1, freq='M')[1:]
        future_dates = future_dates.strftime('%Y-%m-%d').tolist()
        predictions_with_dates = [{'date': date, 'interest': rate[0]} for date, rate in zip(future_dates, output_list)]
        
        return jsonify(predictions_with_dates)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)