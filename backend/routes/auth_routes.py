from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controllers.auth_controller import register, login, get_reports
from config.db import get_db
from pydantic import BaseModel
from models.report import Report
from fpdf import FPDF
from fastapi.responses import StreamingResponse
from io import BytesIO

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

@router.get("/reports/pdf", tags=["reports"])
def export_reports_as_pdf(db: Session = Depends(get_db)):
    reports = db.query(Report).all()

    # Create PDF object
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="Lemon Leaf Disease Reports", ln=True, align="C")
    pdf.ln(10)

    pdf.set_font("Arial", size=10)
    for report in reports:
        created_at = report.created_at.strftime("%Y-%m-%d %H:%M:%S")
        pdf.cell(0, 10, txt=f"Date: {created_at}", ln=True)
        pdf.cell(0, 10, txt=f"Disease: {report.predicted_class}", ln=True)
        pdf.cell(0, 10, txt=f"Confidence: {round(report.confidence * 100)}%", ln=True)
        pdf.cell(0, 10, txt=f"Image Path: {report.image_path}", ln=True)
        pdf.ln(5)

    # Write PDF content to a BytesIO object
    pdf_output = BytesIO()

    # Output the PDF to the BytesIO stream
    pdf_output.write(pdf.output(dest='S').encode('latin1'))  # Ensures we write the content in correct encoding

    # Reset the pointer to the start of the BytesIO object
    pdf_output.seek(0)

    # Debug: Check if content was written to BytesIO (log the size)
    print(f"Generated PDF size: {len(pdf_output.getvalue())} bytes")

    # Return the PDF file
    return StreamingResponse(
        pdf_output,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=reports.pdf"}
    )