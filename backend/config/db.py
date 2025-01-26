from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from models.treatment import Treatment
from fastapi import Depends, FastAPI

# DATABASE_URL = "mysql+pymysql://root:libay22@localhost/lemonleaves_db"
DATABASE_URL = "mysql+pymysql://root:MySQLadmin123!@localhost/lemonleaves_db"

app = FastAPI()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
