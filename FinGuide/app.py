import os
import pandas as pd
from typing import List
from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import UnstructuredURLLoader
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain import HuggingFaceHub
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema.output_parser import StrOutputParser
import streamlit as st
import plotly.express as px

load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGING_FACE_API_KEY")

class FinGuide:
    def __init__(self):
        self.urls = [
            'https://www.cbsl.gov.lk/en/financial-system/financial-markets/government-securities-market',
            'https://www.sc.com/ke/investments/learn/understanding-bonds-for-beginners/',
            'https://www.researchgate.net/publication/275543195_Treasury_Bills_and_Central_Bank_Bills_for_Monetary_Policy',
            'https://onlinelibrary.wiley.com/doi/full/10.1111/jofi.13376',
            'https://www.richmondfed.org/-/media/richmondfedorg/publications/research/special_reports/instruments_of_the_money_market/pdf/chapter_07.pdf',
            'https://drive.google.com/file/d/19QbWMrI9KjFjVHQu8Un00Y2gz49K-8Y3/view?usp=sharing'
        ]
        self.docs = None
        self.db = None
        self.llm_model = None
        self.rag_chain = None

    def load_data(self):
        loader = UnstructuredURLLoader(urls=self.urls)
        data = loader.load()
        print(f"Loaded {len(data)} documents")
        return data

    def process_text(self, data):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        self.docs = text_splitter.split_documents(data)
        print(f"Split into {len(self.docs)} chunks")

    def create_embeddings_and_index(self):
        embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-mpnet-base-v2')
        self.db = FAISS.from_documents(self.docs, embeddings)
        print("Created FAISS index")

    def setup_llm(self):
        self.llm_model = HuggingFaceHub(
            huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
            repo_id='mistralai/Mistral-7B-Instruct-v0.2',
            model_kwargs={"temperature": 0.9, 'max_length': 512}  # Increased max_length
        )

    def setup_rag_chain(self):
        template = """You are an assistant for a financial institution. Use the following information to answer the questions. If you don't know the answer, just say that you don't know. Use 300 words maximum paragraph to answer each question and keep the answer concise.
        Question: {question}
        Context: {context}
        Answer: """

        prompt = ChatPromptTemplate.from_template(template)
        retriever = self.db.as_retriever(search_type="similarity", search_kwargs={'k': 4})
        
        self.rag_chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | self.llm_model
            | StrOutputParser()
        )

    def answer_question(self, question: str) -> str:
        full_response = self.rag_chain.invoke(question)
        # Remove any "Answer:" prefix if present
        answer = full_response.split("Answer:")[-1].strip()
        # Split the answer into sentences
        sentences = answer.split(".")
        # Remove the last sentence if it is not finished
        if not sentences[-1].strip():
            sentences = sentences[:-1]
        final_answer = ".".join(sentences).strip()
        return final_answer

    def generate_investment_advice(self, rates_df: pd.DataFrame) -> str:
        context = rates_df.to_string(index=False)
        question = "Based on the predicted future interest rates, what is the best time for investors to invest in treasury bills and bonds? Please provide some advice.use 300 words maximum paragraph to answer "
        
        formatted_prompt = f"""
        Context: {context}
        Question: {question}
        """
        full_response=self.answer_question(formatted_prompt)
        answer = full_response.split("Answer:")[-1].strip()
        # Split the answer into sentences
        sentences = answer.split(".")
        # Remove the last sentence if it is not finished
        if not sentences[-1].strip():
            sentences = sentences[:-1]
        final_answer = ".".join(sentences).strip()
        return final_answer

@st.cache_resource
def initialize_fin_guide():
    fin_guide = FinGuide()
    data = fin_guide.load_data()
    fin_guide.process_text(data)
    fin_guide.create_embeddings_and_index()
    fin_guide.setup_llm()
    fin_guide.setup_rag_chain()
    return fin_guide

def main():
    st.set_page_config(page_title="FinGuide Q&A", page_icon="💰", layout="wide")

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
            color: #0077b6;
        }
        label {
            color: black !important;
            font-weight: bold;
        }
        .subheader {
            color: #023e8a;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        .stTextInput>div>div>input {
            border-radius: 5px;
        }
        .stAlert, .stMarkdown {
            color: black !important;
        }
    </style>
    """, unsafe_allow_html=True)

    st.title("🏦 FinGuide Q&A")
    st.markdown('<h2 class="subheader">Your AI-powered Financial Assistant</h2>', unsafe_allow_html=True)

    fin_guide = initialize_fin_guide()

    question = st.text_input("Ask a question about treasury bills, bonds, or financial markets:")
    
    if st.button("Get Answer"):
        if question:
            with st.spinner(":blue[Thinking...]"):
                answer = fin_guide.answer_question(question)
            st.markdown(f'<div class="stMarkdown" style="color:black;">{answer}</div>', unsafe_allow_html=True)
        else:
            st.warning("Please enter a question.")

    st.markdown("---")

    st.subheader(":blue[Get Investment Advice]")
    uploaded_file = st.file_uploader("Upload your CSV file with predicted rates", type="csv")
    
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file)
        st.write("Preview of uploaded data:")
        st.dataframe(df.head())

        if st.button("Generate Investment Advice"):
            with st.spinner("Analyzing data and generating advice..."):
                advice = fin_guide.generate_investment_advice(df)
            st.success("Investment Advice:")
            st.write(advice)

            st.subheader("Visualization of Predicted Rates")
            fig = px.line(df, x=df.columns[0], y=df.columns[1:], title="Predicted Interest Rates Over Time")
            st.plotly_chart(fig)

if __name__ == "__main__":
    main()