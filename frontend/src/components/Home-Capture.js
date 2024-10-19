// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import Webcam from 'react-webcam';
// import { useNavigate } from 'react-router-dom';
// import './css/app.css';
// import SideBar from './sidebar';
// import DiseaseGreening from './disease-greening';
// import DiseaseCanker from './disease-canker';
// import DiseaseMelanose from './disease-melanose';

// function HomeCapture() {
//     const [selectedFile, setSelectedFile] = useState();
//     const [preview, setPreview] = useState();
//     const [data, setData] = useState();
//     const [image, setImage] = useState(false);
//     const [isLoading, setIsloading] = useState(false);
//     const [useWebcam, setUseWebcam] = useState(false); // Track webcam usage
//     const webcamRef = useRef(null); // Webcam reference
//     const navigate = useNavigate();
//     let confidence = 0;

//     const sendFile = async (imageToSend) => {
//         let formData = new FormData();
//         formData.append("file", imageToSend);
//         let res = await axios({
//             method: "post",
//             url: process.env.REACT_APP_API_URL || 'http://localhost:8000/predict',
//             data: formData,
//         });
//         if (res.status === 200) {
//             setData(res.data);
//         }
//         setIsloading(false);
//     };

//     const clearData = () => {
//         setData(null);
//         setImage(false);
//         setSelectedFile(null);
//         setPreview(null);
//         setUseWebcam(false);
//     };

//     // Function to capture webcam image
//     const capture = useCallback(() => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setPreview(imageSrc);
//         setIsloading(true);

//         // Convert the image to Blob for sending to the backend
//         fetch(imageSrc)
//             .then(res => res.blob())
//             .then(blob => sendFile(blob));
//     }, [webcamRef]);

//     const onSelectFile = (event) => {
//         const files = event.target.files;
//         if (!files || files.length === 0) {
//             setSelectedFile(undefined);
//             setImage(false);
//             setData(undefined);
//             return;
//         }
//         setSelectedFile(files[0]);
//         setData(undefined);
//         setImage(true);
//     };

//     useEffect(() => {
//         if (!selectedFile) {
//             setPreview(undefined);
//             return;
//         }
//         const objectUrl = URL.createObjectURL(selectedFile);
//         setPreview(objectUrl);
//     }, [selectedFile]);

//     useEffect(() => {
//         if (preview && !useWebcam) {
//             setIsloading(true);
//             sendFile(selectedFile);
//         }
//     }, [preview, useWebcam]);

//     if (data) {
//         confidence = (parseFloat(data.confidence) * 100).toFixed(2);
//     }

//     const renderContent = () => {
//         switch (data.class) {
//             case 'Black Spot':
//                 return <p>This is the content for Black Spot.</p>;
//             case 'Melanose':
//                 return <DiseaseMelanose/>;
//             case 'Canker':
//                 return <DiseaseCanker/>;
//             case 'Greening':
//                 return <DiseaseGreening/>;
//             default:
//                 return <p>This leaf is healthy.</p>;
//         }
//     };

//     const handleHome = () => {
//         navigate('/home');
//     }


//     return (
//         <div className="app">
//             <SideBar page="home"/>
//             <div className="content">
//                 <h2>Capture Image</h2>
//                 <p1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
//                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis no
//                     Lorem ipsum dolor sit amet, consectetur</p1>
//                 <div className="predictionContainer">
//                     <div className="chooseFileDiv">
//                         <button onClick={handleHome} className="chooseFile">Go back to Home</button>
//                     </div>
//                     <div className="previewContainer">
//                         <Webcam
//                             audio={false}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                         />
//                         <button onClick={capture}>Capture</button>
//                     </div>
//                 </div>
//                 {data && (
//                     <div>
//                         <p>Disease: {data.class}</p>
//                         <p>Confidence: {confidence}%</p>
//                     </div>)}
//                 {isLoading && <p>Loading...</p>}
//                 <button onClick={clearData}>Clear</button>
//             </div>

//         </div>
//     );
// }

// export default HomeCapture;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import './css/app.css';
import SideBar from './sidebar';
import DiseaseGreening from './disease-greening';
import DiseaseCanker from './disease-canker';
import DiseaseMelanose from './disease-melanose';
import DiseaseBlackSpot from './disease-blackspot';

function HomeCapture() {
    const [preview, setPreview] = useState();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    let confidence = 0;

    const videoConstraints = {
        width: 600,  // Set the desired width
        height: 400, // Set the desired height
        facingMode: "environment" // Use "user" for the front camera or "environment" for the back camera
    };

    const sendFile = async (imageToSend) => {
        let formData = new FormData();
        formData.append("file", imageToSend);

        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/predict', formData);
            setData(res.data);
        } catch (error) {
            alert('Error during prediction');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to capture webcam image
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPreview(imageSrc);

        // Convert the image to Blob for sending to the backend
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => sendFile(blob));
    }, [webcamRef]);

    const clearData = () => {
        setData(null);
        setPreview(null);
    };

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    const renderContent = () => {
        switch (data?.class) {
            case 'Black Spot':
                return <DiseaseBlackSpot/>;
            case 'Melanose':
                return <DiseaseMelanose />;
            case 'Canker':
                return <DiseaseCanker />;
            case 'Greening':
                return <DiseaseGreening />;
            default:
                return <p>This leaf is healthy.</p>;
        }
    };

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className="app">
            <SideBar page="home" />
            <div className="content">
                <h2>Capture Image</h2>
                <p1>Capture an image of a lemon leaf directly from your camera for disease detection and treatment advice. 
                Easily track and save your diagnosis history for future reference.</p1>
                

                <div className="predictionContainer">
                    <div className="chooseFileDiv">
                        {!preview && <button className="chooseFile" onClick={capture}>Capture</button>}
                        <button className='chooseFile' onClick={clearData}>Clear</button>
                        <button className='chooseFile' onClick={handleHome}>Go back to Home</button>
                    </div>

                    <div className="previewContainer">
                        {!preview &&<Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints} 
                        />}
                        {preview && <img src={preview} alt="Captured Preview" className="previewPhoto" />}
                        {data && (
                            <div className="predictionText">
                                <h1>Disease: </h1>
                                <h2>{data.class}</h2>
                                {/* <h1>Confidence: {confidence}%</h1> */}
                                {renderContent()}
                            </div>
                        )} 
                    </div>

               
                </div>
                
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
}

export default HomeCapture;
