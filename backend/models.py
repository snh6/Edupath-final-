from pydantic import BaseModel, EmailStr
from typing import Optional, List
 
# Auth Models
class UserRegister(BaseModel):
    username: str
    email: str
    password: str
 
class UserLogin(BaseModel):
    username: str
    password: str
 
class Token(BaseModel):
    access_token: str
    token_type: str
 
# Quiz Models
class QuizSubmit(BaseModel):
    path: str
    score: int
    max_fees: Optional[int] = None
    location: Optional[str] = None
    min_ranking: Optional[int] = None
 
# College Models
class College(BaseModel):
    name: str
    field: str
    location: str
    fees: int
    ranking: int
    rating: float
    website: str
    courses: List[str]
    description: str
 

 