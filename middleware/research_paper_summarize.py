from flask import  request, jsonify
import requests
import fitz
from transformers import T5Tokenizer, T5ForConditionalGeneration

model = T5ForConditionalGeneration.from_pretrained('t5-large')
tokenizer = T5Tokenizer.from_pretrained('t5-large')

def summarize_text(text, max_length=200):
    # Preprocess the text to fit the T5 model's format
    preprocess_text = "summarize: " + text
    tokenized_text = tokenizer.encode(preprocess_text, return_tensors="pt", max_length=512, truncation=True)

    # Generate the summary using the T5 model
    summary_ids = model.generate(tokenized_text, max_length=max_length, min_length=30, length_penalty=2.0, num_beams=4, early_stopping=True)

    # Decode the generated summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary

def chunk_text(text, max_chunk_length=512):
    """
    Split the input text into chunks that fit within the model's token limit.
    """
    sentences = text.split('. ')
    current_chunk = []
    current_length = 0
    chunks = []

    for sentence in sentences:
        sentence_length = len(tokenizer.encode(sentence, add_special_tokens=False))
        if current_length + sentence_length <= max_chunk_length:
            current_chunk.append(sentence)
            current_length += sentence_length
        else:
            chunks.append(". ".join(current_chunk) + ".")
            current_chunk = [sentence]
            current_length = sentence_length

    # Add the last chunk
    if current_chunk:
        chunks.append(". ".join(current_chunk) + ".")

    return chunks

def summarize_large_text(text, max_length=200):
    """
    Summarize large text by chunking it and summarizing each chunk separately.
    """
    chunks = chunk_text(text)
    summaries = []
    print("total number of chunks are",len(chunks))
    for chunk in chunks:
        summary = summarize_text(chunk, max_length=max_length)
        summaries.append(summary)

    # Combine all chunk summaries into a final summary
    final_summary = " ".join(summaries)

    return final_summary

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text("text")
    return text

def generate_summary(data):
    pdf_url = data
    # print(pdf_url)
    if pdf_url:
        response = requests.get(pdf_url)
        # Check if the request was successful
        if response.status_code == 200:
            with open('paper.pdf', 'wb') as pdf_file:
                pdf_file.write(response.content)
            extracted_text = extract_text_from_pdf('paper.pdf')
            summary = summarize_large_text(extracted_text)
            # print("-----------------------------------------------------------------------")
            # print("final summmary is : ", summary)
            return summary
            # return jsonify({"summary": summary})
        else:
            return "No PDF found in the given repository"
    else:
        # print(pdf_url)
        # print("in else")
        # print("Headers: ", request.headers)
        # print("Body: ", request.get_data())
        return "Invalid git repository link"

if __name__=="__main__":
    print(generate_summary(input()))