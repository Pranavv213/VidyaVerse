import React, { useState, useRef } from 'react';
import { db } from '../firebase-config';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
import Webcam from 'react-webcam';

const CaptureAndUpload = () => {
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const usersCollectionRef5 = collection(db, 'Face'); // Your Firestore collection

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageData(imageSrc);
    }
  };

  const handleUpload = async () => {
    if (!imageData) {
      alert('Please capture an image first.');
      return;
    }

    try {
      // Convert base64 image to Blob
      const blob = await (await fetch(imageData)).blob();

      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'my_unsigned_preset'); // Replace with your Cloudinary preset
      formData.append('cloud_name', 'getsetcourse'); // Replace with your Cloudinary cloud name

      // Upload to Cloudinary
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/getsetcourse/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.secure_url;

      // Save URL to Firebase
      await addDoc(usersCollectionRef5, {
        FaceImage: imageUrl,
        Email: localStorage.getItem('email'),
      });

      alert('Image captured and uploaded!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  return (
    <div>
      <h2>Capture Image</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: 'user',
        }}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={captureImage}>Capture</button>
        <button onClick={handleUpload} disabled={!imageData}>
          Upload to Cloudinary & Save
        </button>
      </div>
      {imageData && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Preview:</h3>
          <img src={imageData} alt="Captured" width={320} />
        </div>
      )}
    </div>
  );
};

export default CaptureAndUpload;
