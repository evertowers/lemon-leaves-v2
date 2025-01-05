from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "mysql+pymysql://root:libay22@localhost/lemonleaves_db"
DATABASE_URL = "mysql+pymysql://avnadmin:AVNS_WUZ-yDg1pTcwjyZMsUd@mysql-182e036f-evra-c0fa.b.aivencloud.com:16701/lemonleaves_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
