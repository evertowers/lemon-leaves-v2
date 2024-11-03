from fastapi import FastAPI, File, UploadFile, Depends
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from models.report import Report
from config.db import get_db
from sqlalchemy.orm import Session
import os
import uuid

app = FastAPI()

MODEL = tf.keras.models.load_model("C:/Users/Administrator/Documents/jay mark system/lemon-leaves-v2-1/backend/lemon-model.keras")

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

    original_filename = file.filename

    # Extract the file extension by splitting on '.' and taking the last part
    file_extension = '.' + original_filename.split('.')[-1] if '.' in original_filename else ''

    unique_filename = f"{predicted_class}_{uuid.uuid4()}{file_extension}"  # Change .png to your desired file extension if needed

    image_path = os.path.join("../frontend/public/uploads", unique_filename) 
    image_path_saved = f"uploads/{unique_filename}"  
    with open(image_path, "wb") as f:
        f.write(image_data)
    report = Report(user_id=user_id, predicted_class=predicted_class, confidence=confidence, image_path=image_path_saved)
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
