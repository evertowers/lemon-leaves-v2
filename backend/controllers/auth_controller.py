from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from models.user import User
from models.report import Report
from config.db import get_db
import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "secretKey" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def register(user_data: dict, db: Session):
    hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
    user = User(username=user_data["username"], email=user_data["email"], password=hashed_password.decode('utf-8'))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully", "user": user}

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp = payload.get("exp")
        if exp and datetime.utcfromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                # status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return payload  # Return payload if the token is valid
    except JWTError:
        raise HTTPException(
            # status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate token",
            headers={"WWW-Authenticate": "Bearer"},
        )

def login(user_data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data["email"]).first()
    if not user or not bcrypt.checkpw(user_data["password"].encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"id": user.id, "username": user.username}, expires_delta=access_token_expires)
    
    return {"message": "Login successful", "token": access_token, "username": user.username}

# def save_report(report_data: dict, db: Session):
#     report = Report(**report_data)
#     db.add(report)
#     db.commit()
#     db.refresh(report)
#     return report

def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).all()
    return reports