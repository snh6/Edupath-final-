from fastapi import APIRouter
from database import colleges_collection
 
router = APIRouter()
 
colleges_data = [
    # Engineering
    {
        "name": "IIT Madras",
        "field": "engineering",
        "location": "Chennai",
        "fees": 200000,
        "ranking": 1,
        "rating": 9.8,
        "website": "https://www.iitm.ac.in",
        "courses": ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "AI & Data Science", "Chemical Engineering"],
        "description": "Premier engineering institution ranked #1 in India consistently."
    },
    {
        "name": "IIT Bombay",
        "field": "engineering",
        "location": "Mumbai",
        "fees": 200000,
        "ranking": 2,
        "rating": 9.7,
        "website": "https://www.iitb.ac.in",
        "courses": ["Computer Science", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering"],
        "description": "One of India's most prestigious engineering institutions."
    },
    {
        "name": "IIT Delhi",
        "field": "engineering",
        "location": "Delhi",
        "fees": 200000,
        "ranking": 3,
        "rating": 9.6,
        "website": "https://home.iitd.ac.in",
        "courses": ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Biotechnology"],
        "description": "Top engineering college in the heart of India's capital."
    },
    {
        "name": "NIT Trichy",
        "field": "engineering",
        "location": "Trichy",
        "fees": 150000,
        "ranking": 8,
        "rating": 9.0,
        "website": "https://www.nitt.edu",
        "courses": ["Computer Science", "Electronics", "Mechanical Engineering", "Civil Engineering"],
        "description": "Top NIT known for excellent placements and academics."
    },
    {
        "name": "VIT Vellore",
        "field": "engineering",
        "location": "Vellore",
        "fees": 180000,
        "ranking": 15,
        "rating": 8.5,
        "website": "https://vit.ac.in",
        "courses": ["Computer Science", "Mechanical Engineering", "Electronics", "Bioinformatics"],
        "description": "Leading private engineering university with strong industry connections."
    },
    {
        "name": "BITS Pilani",
        "field": "engineering",
        "location": "Pilani",
        "fees": 250000,
        "ranking": 5,
        "rating": 9.4,
        "website": "https://www.bits-pilani.ac.in",
        "courses": ["Computer Science", "Electronics", "Mechanical Engineering", "Chemical Engineering"],
        "description": "Premier private technical university with dual degree programs."
    },
    # Medical
    {
        "name": "AIIMS Delhi",
        "field": "medical",
        "location": "Delhi",
        "fees": 50000,
        "ranking": 1,
        "rating": 9.9,
        "website": "https://www.aiims.edu",
        "courses": ["MBBS", "Nursing", "Biotechnology", "MD", "MS"],
        "description": "India's top medical institution with world class facilities."
    },
    {
        "name": "CMC Vellore",
        "field": "medical",
        "location": "Vellore",
        "fees": 80000,
        "ranking": 2,
        "rating": 9.7,
        "website": "https://www.cmch-vellore.edu",
        "courses": ["MBBS", "Nursing", "Physiotherapy", "MD", "MS"],
        "description": "Christian Medical College, one of India's finest medical schools."
    },
    {
        "name": "JIPMER",
        "field": "medical",
        "location": "Puducherry",
        "fees": 50000,
        "ranking": 3,
        "rating": 9.5,
        "website": "https://jipmer.edu.in",
        "courses": ["MBBS", "Nursing", "MD", "MS", "Allied Health Sciences"],
        "description": "Jawaharlal Institute of Postgraduate Medical Education and Research."
    },
    {
        "name": "Kasturba Medical College",
        "field": "medical",
        "location": "Manipal",
        "fees": 1200000,
        "ranking": 6,
        "rating": 9.0,
        "website": "https://manipal.edu/kmc-manipal.html",
        "courses": ["MBBS", "MD", "MS", "Dentistry", "Pharmacy"],
        "description": "Premier private medical college with global recognition."
    },
    # Arts
    {
        "name": "Sir J.J. School of Art",
        "field": "arts",
        "location": "Mumbai",
        "fees": 50000,
        "ranking": 1,
        "rating": 9.5,
        "website": "https://www.sirjjschoolofart.in",
        "courses": ["Fine Arts", "Applied Arts", "Art History", "Sculpture", "Painting"],
        "description": "India's oldest and most prestigious art school."
    },
    {
        "name": "NID Ahmedabad",
        "field": "arts",
        "location": "Ahmedabad",
        "fees": 300000,
        "ranking": 2,
        "rating": 9.4,
        "website": "https://www.nid.edu",
        "courses": ["Industrial Design", "Communication Design", "Textile Design", "Film & Video"],
        "description": "National Institute of Design, premier design institution in India."
    },
    {
        "name": "Shantiniketan",
        "field": "arts",
        "location": "West Bengal",
        "fees": 80000,
        "ranking": 3,
        "rating": 9.2,
        "website": "https://www.visva-bharati.ac.in",
        "courses": ["Fine Arts", "Music", "Dance", "Drama", "Creative Writing"],
        "description": "Visva-Bharati University, founded by Rabindranath Tagore."
    },
    {
        "name": "College of Art Delhi",
        "field": "arts",
        "location": "Delhi",
        "fees": 30000,
        "ranking": 4,
        "rating": 8.8,
        "website": "https://www.collegeofart.nic.in",
        "courses": ["Painting", "Sculpture", "Applied Art", "Art History"],
        "description": "Premier government art college in India's capital."
    },
    # Commerce
    {
        "name": "SRCC Delhi",
        "field": "commerce",
        "location": "Delhi",
        "fees": 30000,
        "ranking": 1,
        "rating": 9.6,
        "website": "https://www.srcc.edu",
        "courses": ["B.Com", "Economics", "Finance", "Business Studies", "MBA"],
        "description": "Shri Ram College of Commerce, India's top commerce college."
    },
    {
        "name": "St. Xaviers Mumbai",
        "field": "commerce",
        "location": "Mumbai",
        "fees": 50000,
        "ranking": 2,
        "rating": 9.4,
        "website": "https://www.xaviers.edu",
        "courses": ["B.Com", "Economics", "Financial Markets", "Accounting", "Business Management"],
        "description": "Premier Jesuit institution known for commerce and economics."
    },
    {
        "name": "Christ University",
        "field": "commerce",
        "location": "Bangalore",
        "fees": 120000,
        "ranking": 4,
        "rating": 9.0,
        "website": "https://christuniversity.in",
        "courses": ["B.Com", "BBA", "Economics", "Finance", "MBA"],
        "description": "Leading private university with strong commerce programs."
    },
    {
        "name": "Loyola College",
        "field": "commerce",
        "location": "Chennai",
        "fees": 40000,
        "ranking": 5,
        "rating": 9.1,
        "website": "https://www.loyolacollege.edu",
        "courses": ["B.Com", "Economics", "Business Administration", "Finance"],
        "description": "Premier Jesuit college in Chennai with excellent commerce faculty."
    },
    # Law
    {
        "name": "NLSIU Bangalore",
        "field": "law",
        "location": "Bangalore",
        "fees": 250000,
        "ranking": 1,
        "rating": 9.8,
        "website": "https://www.nls.ac.in",
        "courses": ["BA LLB", "LLM", "PhD Law", "Corporate Law", "Constitutional Law"],
        "description": "National Law School, India's #1 ranked law university."
    },
    {
        "name": "NALSAR Hyderabad",
        "field": "law",
        "location": "Hyderabad",
        "fees": 220000,
        "ranking": 2,
        "rating": 9.6,
        "website": "https://nalsar.ac.in",
        "courses": ["BA LLB", "LLM", "Corporate Law", "Criminal Law", "International Law"],
        "description": "National Academy of Legal Studies and Research."
    },
    {
        "name": "NLU Delhi",
        "field": "law",
        "location": "Delhi",
        "fees": 200000,
        "ranking": 3,
        "rating": 9.5,
        "website": "https://nludelhi.ac.in",
        "courses": ["BA LLB", "LLM", "PhD Law", "Human Rights Law", "Criminal Law"],
        "description": "National Law University Delhi, premier law school in the capital."
    },
    {
        "name": "Symbiosis Law School",
        "field": "law",
        "location": "Pune",
        "fees": 300000,
        "ranking": 5,
        "rating": 9.0,
        "website": "https://www.symlaw.ac.in",
        "courses": ["BA LLB", "BBA LLB", "LLM", "Corporate Law", "Cyber Law"],
        "description": "Leading private law school with strong industry connections."
    }
]
 
@router.get("/")
async def get_all_colleges():
    return {"colleges": colleges_data}
 
@router.get("/{field}")
async def get_colleges_by_field(field: str):
    filtered = [c for c in colleges_data if c["field"] == field]
    return {"colleges": filtered}