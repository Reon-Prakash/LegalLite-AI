import io
from PyPDF2 import PdfReader
from docx import Document

def extract_text(file_content: bytes, filename: str) -> str:
    text = ""

    if filename.lower().endswith('.pdf'):
        try:
            reader = PdfReader(io.BytesIO(file_content))
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        except Exception as e:
            raise ValueError(f"Failed to parse PDF: {str(e)}")

    elif filename.lower().endswith('.docx'):
        try:
            doc = Document(io.BytesIO(file_content))
            for para in doc.paragraphs:
                if para.text.strip():
                    text += para.text + "\n"
        except Exception as e:
            raise ValueError(f"Failed to parse DOCX: {str(e)}")

    return text
