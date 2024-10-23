import streamlit as st
import requests
import pandas as pd
import plotly.express as px

# Set page config
st.set_page_config(page_title="FinGuide Q&A", page_icon="💰", layout="wide")

# Custom CSS to improve the app's appearance
st.markdown("""
<style>
    .reportview-container {
        background: #f0f2f6
    }
    .main {
        background: #ffffff;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
    }
    h1 {
            color: #0077b6; /* Title color */
        }
    label {
        color: black !important;
        font-weight: bold;
    }
    .subheader {
        color: #023e8a; /* Subheader color */
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .stTextInput>div>div>input {
        border-radius: 5px;
    }
    .stAlert, .stMarkdown {
        color: black !important; /* Change font color to black */
    }
</style>
""", unsafe_allow_html=True)

# Main app
def main():
    st.title("🏦 FinGuide Q&A")
    st.markdown('<h2 class="subheader">Your AI-powered Financial Assistant</h2>', unsafe_allow_html=True)

    # Question input
    question = st.text_input("Ask a question about treasury bills, bonds, or financial markets:")
    
    if st.button("Get Answer"):
        if question:
            with st.spinner(":blue[Thinking...]"):
                answer = get_answer(question)
            # st.markdown(f'<div class="stAlert" style="color:black;">Here\'s what I found:</div>', unsafe_allow_html=True)
            st.markdown(f'<div class="stMarkdown" style="color:black;">{answer}</div>', unsafe_allow_html=True)
        else:
            st.warning("Please enter a question.")

    st.markdown("---")

    # File upload for investment advice
    st.subheader(":blue[Get Investment Advice]")
    uploaded_file = st.file_uploader("Upload your CSV file with predicted rates", type="csv")
    
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file)
        st.write("Preview of uploaded data:")
        st.dataframe(df.head())

        if st.button("Generate Investment Advice"):
            with st.spinner("Analyzing data and generating advice..."):
                advice = get_investment_advice(df)
            st.success("Investment Advice:")
            st.write(advice)

            # Visualize the data
            st.subheader("Visualization of Predicted Rates")
            fig = px.line(df, x=df.columns[0], y=df.columns[1:], title="Predicted Interest Rates Over Time")
            st.plotly_chart(fig)

# Function to get answer from the API
def get_answer(question):
    url = "http://localhost:4000/answer"  # Update with your actual API endpoint
    response = requests.post(url, json={"question": question})
    if response.status_code == 200:
        return response.json()["answer"]
    else:
        return "Sorry, I couldn't get an answer at this time."

# Function to get investment advice from the API
def get_investment_advice(df):
    # Save DataFrame to a temporary CSV file
    temp_file = "temp_predictions.csv"
    df.to_csv(temp_file, index=False)
    
    url = "http://localhost:4000/investment_advice"  # Update with your actual API endpoint
    response = requests.post(url, json={"file_path": temp_file})
    if response.status_code == 200:
        return response.json()["advice"]
    else:
        return "Sorry, I couldn't generate investment advice at this time."

if __name__ == "__main__":
    main()