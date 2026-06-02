import motor.motor_asyncio
import os
import certifi
from dotenv import load_dotenv
 
load_dotenv()
 
MONGODB_URL = os.getenv("MONGODB_URL")
 
client = motor.motor_asyncio.AsyncIOMotorClient(
    MONGODB_URL,
    serverSelectionTimeoutMS=30000,
    connectTimeoutMS=30000,
    socketTimeoutMS=30000,
    tlsCAFile=certifi.where()
    )
db = client.college_recommender
 
users_collection = db.get_collection("users")
colleges_collection = db.get_collection("colleges")
questions_collection = db.get_collection("questions")