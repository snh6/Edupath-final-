from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
 
load_dotenv()
 
app = FastAPI(
    title="College Recommender API",
    description="API for recommending colleges based on quiz scores and filters",
    version="1.0.0"
)
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
@app.get("/")
def home():
    return {"message": "College Recommender API is running!"}
 
from routes.auth import router as auth_router
from routes.questions import router as questions_router
from routes.colleges import router as colleges_router
from routes.recommend import router as recommend_router
 
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(questions_router, prefix="/api/questions", tags=["Questions"])
app.include_router(colleges_router, prefix="/api/colleges", tags=["Colleges"])
app.include_router(recommend_router, prefix="/api/recommend", tags=["Recommend"])