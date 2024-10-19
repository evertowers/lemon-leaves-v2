from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.auth_controller import register, login, get_reports
from config.db import get_db
from pydantic import BaseModel
from models.report import Report

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ReportCreate(BaseModel):
    user_id: int
    predicted_class: str
    confidence: float
    image_path: str

router = APIRouter()

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    return register(user.dict(), db)

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    return login(user.dict(), db)

@router.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).all()
    return reports