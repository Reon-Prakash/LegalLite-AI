from pydantic import BaseModel, Field
from typing import List
from enum import Enum

class RiskLevel(str, Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"

class Clause(BaseModel):
    title: str
    plain_english: str
    risk: RiskLevel
    tip: str

class AnalysisResult(BaseModel):
    risk_score: int = Field(..., ge=1, le=100)
    risk_level: RiskLevel
    red_flags: List[str]
    top_3_actions: List[str]
    clauses: List[Clause]
