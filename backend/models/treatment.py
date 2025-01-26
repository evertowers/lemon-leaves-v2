from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Treatment(Base):
    __tablename__ = "treatments"

    id = Column(Integer, primary_key=True, index=True)
    disease_name = Column(String, index=True)  # e.g., "aphids"
    treatment = Column(Text)  # The actual treatment for the disease
    last_updated = Column(DateTime, default=datetime.utcnow)  # Timestamp of the last update
