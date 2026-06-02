from fastapi import APIRouter
from database import questions_collection
import random
 
router = APIRouter()
 
engineering_questions = [
    "Do you enjoy coding?",
    "Do you enjoy robotics?",
    "Do you enjoy mathematics?",
    "Do you enjoy AI?",
    "Do you enjoy programming?",
    "Do you enjoy logical thinking?",
    "Do you enjoy physics?",
    "Do you enjoy innovation?",
    "Do you enjoy technical projects?",
    "Do you enjoy problem solving?",
    "Do you enjoy debugging?",
    "Do you enjoy teamwork?",
    "Do you enjoy computers?",
    "Do you enjoy automation?",
    "Do you enjoy software development?",
    "Do you enjoy engineering design?",
    "Do you enjoy electronics?",
    "Do you enjoy experimentation?",
    "Do you enjoy analytical thinking?",
    "Do you enjoy technology?"
]
 
medical_questions = [
    "Do you enjoy biology?",
    "Do you enjoy helping people?",
    "Do you enjoy healthcare?",
    "Do you enjoy anatomy?",
    "Do you enjoy chemistry?",
    "Do you enjoy patient care?",
    "Do you enjoy science?",
    "Do you enjoy research?",
    "Do you enjoy responsibility?",
    "Do you enjoy teamwork?",
    "Do you enjoy diagnostics?",
    "Do you enjoy medicine?",
    "Do you enjoy hospitals?",
    "Do you enjoy practical learning?",
    "Do you enjoy communication?",
    "Do you enjoy empathy?",
    "Do you enjoy discipline?",
    "Do you enjoy critical thinking?",
    "Do you enjoy medical innovation?",
    "Do you enjoy problem solving?"
]
 
arts_questions = [
    "Do you enjoy drawing or painting?",
    "Do you enjoy creative writing?",
    "Do you enjoy music?",
    "Do you enjoy photography?",
    "Do you enjoy design?",
    "Do you enjoy storytelling?",
    "Do you enjoy performing arts?",
    "Do you enjoy art history?",
    "Do you enjoy sculpture?",
    "Do you enjoy film making?",
    "Do you enjoy fashion design?",
    "Do you enjoy animation?",
    "Do you enjoy graphic design?",
    "Do you enjoy interior design?",
    "Do you enjoy creative thinking?",
    "Do you enjoy exhibitions?",
    "Do you enjoy cultural studies?",
    "Do you enjoy poetry?",
    "Do you enjoy theatre?",
    "Do you enjoy visual communication?"
]
 
commerce_questions = [
    "Do you enjoy mathematics?",
    "Do you enjoy economics?",
    "Do you enjoy business?",
    "Do you enjoy accounting?",
    "Do you enjoy finance?",
    "Do you enjoy marketing?",
    "Do you enjoy management?",
    "Do you enjoy entrepreneurship?",
    "Do you enjoy stock markets?",
    "Do you enjoy banking?",
    "Do you enjoy statistics?",
    "Do you enjoy business strategy?",
    "Do you enjoy leadership?",
    "Do you enjoy negotiations?",
    "Do you enjoy commerce?",
    "Do you enjoy investment?",
    "Do you enjoy sales?",
    "Do you enjoy human resources?",
    "Do you enjoy supply chain?",
    "Do you enjoy financial planning?"
]
 
law_questions = [
    "Do you enjoy debating?",
    "Do you enjoy reading?",
    "Do you enjoy arguments?",
    "Do you enjoy justice?",
    "Do you enjoy critical thinking?",
    "Do you enjoy research?",
    "Do you enjoy writing?",
    "Do you enjoy public speaking?",
    "Do you enjoy politics?",
    "Do you enjoy history?",
    "Do you enjoy ethics?",
    "Do you enjoy problem solving?",
    "Do you enjoy negotiations?",
    "Do you enjoy social issues?",
    "Do you enjoy analytical thinking?",
    "Do you enjoy human rights?",
    "Do you enjoy constitutional law?",
    "Do you enjoy criminal justice?",
    "Do you enjoy civil law?",
    "Do you enjoy court proceedings?"
]
 
questions_map = {
    "engineering": engineering_questions,
    "medical": medical_questions,
    "arts": arts_questions,
    "commerce": commerce_questions,
    "law": law_questions
}
 
@router.get("/{path}")
async def get_questions(path: str):
    if path not in questions_map:
        return {"error": "Invalid path"}
    selected = random.sample(questions_map[path], 20)
    return {"questions": selected}