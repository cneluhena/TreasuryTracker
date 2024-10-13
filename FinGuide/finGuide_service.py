from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

from fin_guide_new import FinGuide

app = Flask(__name__)
CORS(app)

# Initialize FinGuide instance
fin_guide = FinGuide()

# Load data and process it once on startup
data = fin_guide.load_data()
fin_guide.process_text(data)
fin_guide.create_embeddings_and_index()
fin_guide.setup_llm()
fin_guide.setup_rag_chain()

@app.route('/')
def home():
    return jsonify(message="Welcome to FinGuide API"), 200

@app.route("/answer", methods=["POST"])
def answer_question():
    # Get question from the request body
    question = request.json.get("question")
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    # Get the answer from the FinGuide
    answer = fin_guide.answer_question(question)
    return jsonify({"answer": answer})

@app.route("/investment_advice", methods=["POST"])
def generate_investment_advice():
    # Get CSV file path from request body (or you could pass the CSV content itself)
    file_path = request.json.get("file_path")
    if not file_path:
        return jsonify({"error": "No file path provided"}), 400
    
    # Load the predicted rates and generate advice
    rates_df = fin_guide.load_predicted_rates(file_path)
    advice = fin_guide.generate_investment_advice(rates_df)
    
    return jsonify({"advice": advice})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
