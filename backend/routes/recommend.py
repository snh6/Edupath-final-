from fastapi import APIRouter
from models import QuizSubmit
from routes.colleges import colleges_data
 
router = APIRouter()
 
@router.post("/")
async def recommend(data: QuizSubmit):
    filtered = [c for c in colleges_data if c["field"] == data.path]
 
    # Filter by fees if provided
    if data.max_fees:
        fees_filtered = [c for c in filtered if c["fees"] <= data.max_fees]
        if fees_filtered:
            filtered = fees_filtered
 
    # Filter by location if provided
    if data.location:
        loc_filtered = [c for c in filtered if
                   data.location.lower() in c["location"].lower()]
        if loc_filtered:
            filtered = loc_filtered
 
    # Filter by ranking if provided
    if data.min_ranking:
        rank_filtered = [c for c in filtered if c["ranking"] <= data.min_ranking]
        if rank_filtered:
            filtered = rank_filtered
 
    # Sort by ranking
    filtered.sort(key=lambda x: x["ranking"])
 
    # Score based compatibility AND recommendation quality
    if data.score >= 16:
        compatibility = "Excellent Match"
        # High scorers get top ranked colleges
        recommended = filtered[:3]
    elif data.score >= 10:
        compatibility = "Good Match"
        # Mid scorers get colleges with rating >= 9.0
        recommended = [c for c in filtered if c["rating"] >= 9.0][:3]
        if not recommended:
            recommended = filtered[:3]
    else:
        compatibility = "Moderate Match"
        # Low scorers get colleges with lower fees first
        recommended = sorted(filtered, key=lambda x: x["fees"])[:3]
        if not recommended:
            recommended = filtered[:3]
 
    return {
        "score": data.score,
        "compatibility": compatibility,
        "recommended_colleges": recommended
    }