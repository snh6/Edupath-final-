from fastapi import APIRouter, HTTPException
from models import UserRegister, UserLogin
from database import users_collection
import hashlib
import hmac
import os
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
 
load_dotenv()
 
router = APIRouter()
JWT_SECRET = os.getenv("JWT_SECRET")
 
def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()
 
def verify_password(plain: str, hashed: str):
    return hashlib.sha256(plain.encode()).hexdigest() == hashed
 
def create_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=7)
    data.update({"exp": expire})
    return jwt.encode(data, JWT_SECRET, algorithm="HS256")
 
@router.post("/register")
async def register(user: UserRegister):
    existing = await users_collection.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = hash_password(user.password)
    await users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed,
        "quizzes_taken": 0,
        "history": []
    })
    return {"message": "Registration successful"}
 
@router.post("/login")
async def login(user: UserLogin):
    existing = await users_collection.find_one({"username": user.username})
    if not existing:
        raise HTTPException(status_code=400, detail="User not found")
    if not verify_password(user.password, existing["password"]):
        raise HTTPException(status_code=400, detail="Wrong password")
    token = create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer", "username": user.username}
 