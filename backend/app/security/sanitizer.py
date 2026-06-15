import re

def sanitize_text(text: str) -> str:
    if not text:
        raise ValueError("Empty document. No text could be extracted.")

    # Remove null bytes
    text = text.replace('\x00', '')

    # Remove non-printable control characters except newlines and tabs
    text = re.sub(r'[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)

    # Collapse excessive whitespace
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    text = re.sub(r' {4,}', '   ', text)

    # Limit total length to prevent token abuse
    if len(text) > 50000:
        text = text[:50000]

    text = text.strip()

    if len(text) < 50:
        raise ValueError("Document too short to analyze. Please upload a valid contract.")

    return text
