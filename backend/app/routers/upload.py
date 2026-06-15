from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from app.services import parser, analyzer
from app.security.file_guard import validate_file
from app.security.sanitizer import sanitize_text
from app.security.rate_limiter import limiter, UPLOAD_RATE_LIMIT
from app.models.analysis_result import AnalysisResult
import gc

router = APIRouter()

@router.post("/upload", response_model=AnalysisResult)
@limiter.limit(UPLOAD_RATE_LIMIT)
async def handle_upload(request: Request, file: UploadFile = File(...)):
    content = None
    text = None

    try:
        # Read file into memory
        content = await file.read()

        # Security: Validate file (magic bytes + size + extension)
        validate_file(content, file.filename)

        # Extract text from document
        text = parser.extract_text(content, file.filename)

        # Security: Sanitize extracted text
        text = sanitize_text(text)

        # Analyze contract with AI
        result = analyzer.analyze_contract(text)

        return result

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    finally:
        # SECURITY: Immediately destroy document from memory after processing
        content = None
        text = None
        gc.collect()
