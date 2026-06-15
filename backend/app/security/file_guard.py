from fastapi import HTTPException

# Magic bytes signatures for allowed file types
ALLOWED_SIGNATURES = {
    b'%PDF': 'pdf',
    b'PK\x03\x04': 'docx'
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def validate_file(content: bytes, filename: str):
    # Check file size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum allowed size is 10MB."
        )

    # Check file extension
    allowed_extensions = ['.pdf', '.docx']
    file_ext = None
    for ext in allowed_extensions:
        if filename.lower().endswith(ext):
            file_ext = ext
            break

    if not file_ext:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF and DOCX files are allowed."
        )

    # Check magic bytes (actual file signature, not just extension)
    detected = False
    for signature, file_type in ALLOWED_SIGNATURES.items():
        if content.startswith(signature):
            detected = True
            break

    if not detected:
        raise HTTPException(
            status_code=400,
            detail="File content does not match allowed file types. Possible malicious file detected."
        )

    return True
