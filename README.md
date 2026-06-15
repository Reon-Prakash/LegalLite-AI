# LegalLite AI

Privacy-First AI Contract Simplifier

## Created by
Reon Prakash Naik — Individual Creator

## What it does
Analyzes legal contracts (PDF/DOCX) and returns:
- Risk score (1-100)
- Red flags
- Top 3 negotiation actions
- Clause-by-clause plain English breakdown

## Security
- Zero data retention
- In-memory processing only
- Magic bytes file validation
- Rate limiting
- Prompt injection defense
- XSS prevention
- CORS protection

## How to run

### Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm run dev

## Environment Variables
Add your Google AI API key to backend/.env
