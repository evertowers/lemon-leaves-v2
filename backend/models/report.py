from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from config.db import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)  
    predicted_class = Column(String)
    confidence = Column(Float)
    image_path = Column(String)  
    created_at = Column(DateTime, default=datetime.utcnow)  

