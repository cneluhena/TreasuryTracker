import os
import pickle
import time
import streamlit as st
import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import UnstructuredURLLoader
from langchain.vectorstores import FAISS as LangchainFAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain import HuggingFaceHub
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema.output_parser import StrOutputParser

# Constants
HUGGINGFACE_API_TOKEN = os.getenv('HUGGING_FACE_API_KEY', 'your_default_api_key_here')
URLS = [
    'https://www.cbsl.gov.lk/en/financial-system/financial-markets/government-securities-market',
    'https://www.sc.com/ke/investments/learn/understanding-bonds-for-beginners/',
    'https://www.researchgate.net/publication/275543195_Treasury_Bills_and_Central_Bank_Bills_for_Monetary_Policy'
]

def load_and_process_data(urls):
    """Load data from URLs and process it."""
    loader = UnstructuredURLLoader(urls=urls)
    data = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    docs = text_splitter.split_documents(data)
    return docs

def create_embeddings(docs):
    """Create embeddings for the documents."""
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode([d.page_content for d in docs])
    return embeddings

def create_faiss_index(embeddings):
    """Create a FAISS index from the embeddings."""
    d = embeddings.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(embeddings)
    return index

def setup_langchain_components(docs):
    """Set up LangChain components."""
    db = LangchainFAISS.from_documents(docs, 
                                       HuggingFaceEmbeddings(model_name='sentence-transformers/all-mpnet-base-v2'))
    retriever = db.as_retriever(search_type="similarity", search_kwargs={'k': 4})
    
    template = """You are assistant for a financial institution. Use the following information to answer the questions. 
    If you don't know the answer, just say that you don't know. You have 10 sentences maximum to answer each question 
    and keep the answer concise.
    Question: {question}
    Context: {context}
    Answer:"""
    
    prompt = ChatPromptTemplate.from_template(template)
    
    llm_model = HuggingFaceHub(
        huggingfacehub_api_token="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",
        repo_id='mistralai/Mistral-7B-Instruct-v0.1',
        model_kwargs={"temperature": 1, 'max_length': 180}
    )
    
    output_parser = StrOutputParser()
    
    rag_chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt | llm_model | output_parser)
    
    return rag_chain

def load_predicted_rates():
    """Load predicted future interest rates from CSV."""
    return pd.read_csv('future_predictions.csv')

def analyze_rates_for_advice(predicted_rates):
    """
    Analyze the future interest rates and generate basic investment advice based on trends.
    - If rates are increasing: suggest buying bonds.
    - If rates are decreasing: suggest buying bills.
    """
    predicted_rates['Rate Change'] = predicted_rates['Interest Rate'].diff()
    
    # Simple heuristic-based advice
    if predicted_rates['Rate Change'].mean() > 0:
        advice = "Interest rates are expected to rise. It may be a good time to invest in bonds to lock in higher returns."
    else:
        advice = "Interest rates are expected to decline. Short-term investments like treasury bills might be favorable."
    
    return advice

def generate_advice(rag_chain, predicted_rates, question):
    """Generate investment advice based on predicted rates and web content."""
    
    # Convert the predicted rates into a string format for the LLM context
    csv_context = predicted_rates.to_string(index=False)
    
    # Get web content-based response
    web_advice = rag_chain.invoke(f"Context: {csv_context}\nQuestion: {question}")
    
    # Analyze the predicted rates for trend-based advice
    rate_based_advice = analyze_rates_for_advice(predicted_rates)
    
    # Combine the web-based advice and the rate-based advice
    combined_advice = f"{web_advice}\n\nBased on future interest rates, here is some advice:\n{rate_based_advice}"
    
    return combined_advice

def main():
    # Load and process data from URLs
    docs = load_and_process_data(URLS)
    
    # Create embeddings and FAISS index
    embeddings = create_embeddings(docs)
    index = create_faiss_index(embeddings)
    
    # Set up LangChain components
    rag_chain = setup_langchain_components(docs)
    
    # Load predicted rates from CSV
    predicted_rates = load_predicted_rates()
    
    # Define the question for generating advice
    question = "What advice can be given to investors based on the future treasury bill and bond interest rates?"
    
    # Generate advice combining web knowledge and future rates
    advice = generate_advice(rag_chain, predicted_rates, question)
    
    # Output the advice
    print(advice)

if __name__ == "__main__":
    main()
