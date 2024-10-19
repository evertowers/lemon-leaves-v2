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

app = FastAPI()

MODEL = tf.keras.models.load_model("d:/lemon-leaves/models/1.keras")
CLASS_NAMES = ['Black Spot', 'Melanose', 'Canker', 'Greening', 'Healthy']
input_shape = MODEL.input_shape  # Typically (None, height, width, channels)
_, img_height, img_width, _ = input_shape

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
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

# def read_file_as_image(data) -> np.ndarray:
#     image = np.array(Image.open(BytesIO(data)))
#     return image

def read_file_as_image(data) -> np.ndarray:
    # Open the image
    image = Image.open(BytesIO(data))
    # Convert image to RGB if it's not
    if image.mode != 'RGB':
        image = image.convert('RGB')
    # Resize the image to the target size
    image = image.resize((img_width, img_height))
    # Convert the image to a numpy array
    image_array = np.array(image)
    # Normalize the image data if required by your model
    # image_array = image_array / 255.0  # Comment out if your model doesn't require normalization
    return image_array

@app.post("/predict")
async def predict(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db),  # Dependency injection for the database session
    user_id: int = 1  # Replace with actual user ID, or pass it as a request parameter
):
    # image = read_file_as_image(await file.read())
    # img_batch = np.expand_dims(image, 0)
    # predictions = MODEL.predict(img_batch)
    # predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    # confidence = np.max(predictions[0])

    # Read the file data
    image_data = await file.read()
    # Process the image data
    image = read_file_as_image(image_data)
    # Expand dimensions to match the model's input shape
    img_batch = np.expand_dims(image, 0)
    # Make predictions
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    # Save the image to the filesystem or cloud storage
    image_path = f"./uploads/{file.filename}"  # Adjust the path as needed
    with open(image_path, "wb") as f:
        f.write(await file.read())

    # Create a new report and save it to the database
    report = Report(user_id=user_id, predicted_class=predicted_class, confidence=confidence, image_path=image_path)
    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        'class': predicted_class,
        'confidence': float(confidence),
        'report_id': report.id,
        'created_at': report.created_at.isoformat()  # Return created time as an ISO formatted string
    }

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
