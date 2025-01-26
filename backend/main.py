from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from models.report import Report
from config.db import get_db, SessionLocal
from sqlalchemy.orm import Session
import os
import uuid
from github import Github
from models.treatment import Treatment
from datetime import datetime, timedelta
from pydantic import BaseModel

app = FastAPI()

# Initialize GitHub client
GITHUB_TOKEN = "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"  # Replace with your token
REPO_NAME = "evertowers/leaf-disease-images"  # Replace with your repository name
g = Github(GITHUB_TOKEN)

# MODEL = tf.keras.models.load_model("C:/Users/Administrator/Documents/jay mark system/lemon-leaves-v2/backend/lemon-model.keras")
MODEL = tf.keras.models.load_model("D:/llv2-proj/lemon-leaves-v2/backend/lemon-model.keras")

CLASS_NAMES = ['Aphids', 'Black spot', 'Canker', 'Greening', 'Healthy', 'Melanose']
input_shape = MODEL.input_shape  
_, img_height, img_width, _ = input_shape

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class TreatmentUpdate(BaseModel):
    treatment: str

@app.on_event("startup")
def add_default_values():
    db = SessionLocal()
    try:
        # Check if the table is empty, then insert defaults
        if db.query(Treatment).count() == 0:
            default_treatments = [
                Treatment(disease_name='Aphids', treatment='Spray fungicides, particularly copper-based, during early fruit development. Prune dead wood from the tree to reduce sources of the fungus.', last_updated = datetime.utcnow() + timedelta(hours=8)),
                Treatment(disease_name='Black Spot', treatment='Use fungicides containing copper or petroleum oil to manage the infection. Regularly prune trees to increase airflow.', last_updated = datetime.utcnow() + timedelta(hours=8)),
                Treatment(disease_name='Canker', treatment='Spray fungicides, particularly copper-based, during early fruit development. Prune dead wood from the tree to reduce sources of the fungus.', last_updated = datetime.utcnow() + timedelta(hours=8)),
                Treatment(disease_name='Greening', treatment='No cure exists, but infected trees should be removed to prevent the spread of the disease. Control the Asian citrus psyllid, which spreads the disease, using insecticides.', last_updated = datetime.utcnow() + timedelta(hours=8)),
                Treatment(disease_name='Melanose', treatment='Spray fungicides, particularly copper-based, during early fruit development. Prune dead wood from the tree to reduce sources of the fungus.', last_updated = datetime.utcnow() + timedelta(hours=8))
            ]
            db.add_all(default_treatments)
            db.commit()
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

@app.get("/ping")
async def ping():
    return "Hello, alive"

@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).all()
    return reports

@app.get("/treatments/aphids")
def get_treatment(db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Aphids").first()
    return treatments

@app.get("/treatments/black-spot")
def get_treatment(db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Black Spot").first()
    return treatments

@app.get("/treatments/canker")
def get_treatment(db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Canker").first()
    return treatments

@app.get("/treatments/greening")
def get_treatment(db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Greening").first()
    return treatments

@app.get("/treatments/melanose")
def get_treatment(db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Melanose").first()
    return treatments

@app.put("/update/aphids")
def update_treatment(treatment_update: TreatmentUpdate, db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Aphids").first()
    if treatments is None:
        raise HTTPException(status_code=404, detail="Disease not found")
    treatments.treatment = treatment_update.treatment
    treatments.last_updated = datetime.utcnow() + timedelta(hours=8)
    db.commit()
    # Refresh the disease object to reflect the updated values
    db.refresh(treatments)
    return {"message": "Treatment updated successfully", "disease": "Aphids"}

@app.put("/update/black-spot")
def update_treatment(treatment_update: TreatmentUpdate, db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Black Spot").first()
    if treatments is None:
        raise HTTPException(status_code=404, detail="Disease not found")
    treatments.treatment = treatment_update.treatment
    treatments.last_updated = datetime.utcnow() + timedelta(hours=8)
    db.commit()
    # Refresh the disease object to reflect the updated values
    db.refresh(treatments)
    return {"message": "Treatment updated successfully", "disease": "Black Spot"}

@app.put("/update/canker")
def update_treatment(treatment_update: TreatmentUpdate, db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Canker").first()
    if treatments is None:
        raise HTTPException(status_code=404, detail="Disease not found")
    treatments.treatment = treatment_update.treatment
    treatments.last_updated = datetime.utcnow() + timedelta(hours=8)
    db.commit()
    # Refresh the disease object to reflect the updated values
    db.refresh(treatments)
    return {"message": "Treatment updated successfully", "disease": "Canker"}

@app.put("/update/greening")
def update_treatment(treatment_update: TreatmentUpdate, db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Greening").first()
    if treatments is None:
        raise HTTPException(status_code=404, detail="Disease not found")
    treatments.treatment = treatment_update.treatment
    treatments.last_updated = datetime.utcnow() + timedelta(hours=8)
    db.commit()
    # Refresh the disease object to reflect the updated values
    db.refresh(treatments)
    return {"message": "Treatment updated successfully", "disease": "Greening"}

@app.put("/update/melanose")
def update_treatment(treatment_update: TreatmentUpdate, db: Session = Depends(get_db)):
    treatments = db.query(Treatment).filter(Treatment.disease_name == "Melanose").first()
    if treatments is None:
        raise HTTPException(status_code=404, detail="Disease not found")
    treatments.treatment = treatment_update.treatment
    treatments.last_updated = datetime.utcnow() + timedelta(hours=8)
    db.commit()
    # Refresh the disease object to reflect the updated values
    db.refresh(treatments)
    return {"message": "Treatment updated successfully", "disease": "Melanose"}

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data))
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize((img_width, img_height))
    image_array = np.array(image)
    return image_array

@app.post("/predict")
async def predict(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db), 
    user_id: int = 1  
):
    image_data = await file.read()
    image = read_file_as_image(image_data)
    img_batch = np.expand_dims(image, 0)
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    if confidence < 0.8:
        predicted_class = "Unknown"

    original_filename = file.filename

    # Extract the file extension by splitting on '.' and taking the last part
    file_extension = '.' + original_filename.split('.')[-1] if '.' in original_filename else ''

    unique_filename = f"{predicted_class}_{uuid.uuid4()}{file_extension}"  # Change .png to your desired file extension if needed

    repo = g.get_repo(REPO_NAME)

    repo.create_file(
            unique_filename,
            f"Upload {unique_filename}",  # Commit message
            image_data,
        )

    # Construct the raw URL for the uploaded file
    raw_url = f"https://raw.githubusercontent.com/{REPO_NAME}/main/{unique_filename}"

    # image_path = os.path.join("../frontend/public/uploads", unique_filename) 
    # image_path_saved = f"uploads/{unique_filename}"  
    # with open(image_path, "wb") as f:
    #     f.write(image_data)
    report = Report(user_id=user_id, predicted_class=predicted_class, confidence=confidence, image_path=unique_filename)
    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        'class': predicted_class,
        'confidence': float(confidence),
        'report_id': report.id,
        'created_at': report.created_at.isoformat()  
    }

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
