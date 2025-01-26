from fastapi import HTTPException, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from models.user import User
from models.report import Report
from config.db import get_db
import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi.responses import RedirectResponse


SECRET_KEY = "secretKey" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME="junsayjm123@gmail.com",
    MAIL_PASSWORD="yxoa pzfb hies jwjw",
    MAIL_FROM="junsayjm123@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    # MAIL_TLS=True,
    # MAIL_SSL=False,
    MAIL_STARTTLS=True,  # Use STARTTLS
    MAIL_SSL_TLS=False, # Use SSL/TLS
    USE_CREDENTIALS=True
)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# def register(user_data: dict, db: Session):
#     hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
#     user = User(username=user_data["username"], email=user_data["email"], password=hashed_password.decode('utf-8'))
#     db.add(user)
#     db.commit()
#     db.refresh(user)
#     return {"message": "User registered successfully", "user": user}

# def register(user_data: dict, db: Session):
#     hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
#     user = User(username=user_data["username"], email=user_data["email"], password=hashed_password.decode('utf-8'))
#     user.is_verified = False
#     db.add(user)
#     db.commit()
#     db.refresh(user)

#     # Generate email verification token
#     token = create_access_token(data={"email": user.email})
#     verification_link = f"http://localhost:8000/api/auth/verify-email?token={token}"
#     send_verification_email(user.email, verification_link)

#     return {"message": "User registered successfully. Please check your email to verify your account.", "user": user}

# def register(user_data: dict, db: Session, background_tasks: BackgroundTasks):
#     hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
#     user = User(username=user_data["username"], email=user_data["email"], password=hashed_password.decode('utf-8'))
#     user.is_verified = False
#     db.add(user)
#     db.commit()
#     db.refresh(user)

#     # Generate email verification token
#     token = create_access_token(data={"email": user.email})
#     verification_link = f"http://localhost:8000/api/auth/verify-email?token={token}"

#     # Add email sending task to the background
#     background_tasks.add_task(send_verification_email, user.email, verification_link)

#     return {"message": "User registered successfully. Please check your email to verify your account.", "user": user}

def register(user_data: dict, db: Session, background_tasks: BackgroundTasks):
    hashed_password = bcrypt.hashpw(user_data["password"].encode('utf-8'), bcrypt.gensalt())
    user = User(username=user_data["username"], email=user_data["email"], password=hashed_password.decode('utf-8'))
    user.is_verified = False
    db.add(user)
    db.commit()
    db.refresh(user)

    # Generate email verification token
    token = create_access_token(data={"email": user.email})
    verification_link = f"http://localhost:8000/api/auth/verify-email?token={token}"

    # Add email sending task to the background
    background_tasks.add_task(send_verification_email, user.email, verification_link)

    return {"message": "User registered successfully. Please check your email to verify your account.", "user": user}


async def send_verification_email(email: str, verification_link: str):
    message = MessageSchema(
        subject="Verify your email",
        recipients=[email],
        body=f"Click the link to verify your email: {verification_link}",
        subtype="html"
    )
    fm = FastMail(conf)
    await fm.send_message(message)

def verify_email(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=400, detail="Invalid token")
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.is_verified = True
        db.commit()
        db.refresh(user)
        # return {"message": "Email verified successfully"}
        return RedirectResponse(url="http://localhost:3000/login?verified=true")
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid token")


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

def login(user_data: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data["email"]).first()
    if not user or not bcrypt.checkpw(user_data["password"].encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"id": user.id, "username": user.username})
    return {"message": "Login successful", "token": access_token, "username": user.username}
