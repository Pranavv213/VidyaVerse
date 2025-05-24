import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import { db } from "../firebase-config";
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function FaceRecognition() {
  const { event_id } = useParams();
  const webcamRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [matchResult, setMatchResult] = useState('No reference image uploaded');
  const [storedImages, setStoredImages] = useState([]);

  const usersCollectionRefFace = collection(db, 'Face');
  const usersCollectionRefUser = collection(db, 'user');

  // Load face-api models
  useEffect(() => {
    const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models/';
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]).then(() => setModelsLoaded(true))
      .catch((error) => console.error('Error loading models:', error));
  }, []);

  // Load stored images from Firestore
  const loadStoredImages = async () => {
    try {
      const data = await getDocs(usersCollectionRefFace);
      const images = data.docs.map((doc) => {
        const faceImageUrl = doc.data().FaceImage;
        if (faceImageUrl && faceImageUrl.startsWith('http')) {
          return { ...doc.data(), id: doc.id };
        } else {
          console.warn('Skipping invalid FaceImage URL for document:', doc.id);
          return null;
        }
      }).filter((img) => img !== null);

      setStoredImages(images);
    } catch (error) {
      console.error('Error loading stored images:', error);
    }
  };

  // Load stored images on mount
  useEffect(() => {
    loadStoredImages();
  }, []);

  // Face detection & comparison logic
  const detectAndCompare = async () => {
    if (
      !modelsLoaded ||
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4 ||
      storedImages.length === 0
    ) {
      return;
    }

    try {
      const video = webcamRef.current.video;
      const liveDetection = await faceapi
        .detectSingleFace(video)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!liveDetection) {
        setMatchResult('No face detected in webcam');
        return;
      }

      const liveDescriptor = liveDetection.descriptor;
      let matchFound = false;

      for (const image of storedImages) {
        if (!image.FaceImage || !image.FaceImage.startsWith('http')) {
          console.warn('Skipping invalid FaceImage:', image.FaceImage);
          continue;
        }

        const img = await faceapi.fetchImage(image.FaceImage);
        const detection = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) continue;

        const distance = faceapi.euclideanDistance(
          liveDescriptor,
          detection.descriptor
        );

        if (distance < 0.6) {
          // Matched Face
          const userData = await getDocs(usersCollectionRefUser);
          const users = userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          const matchedUser = users.find((user) => user.Email === image.Email);

          if (!matchedUser) {

            
            setMatchResult('❌ User Not Approved');
           
          } else if (matchedUser.EventsApproved?.includes(event_id)) {
            setMatchResult(`✅ Welcome ${matchedUser.UserName} !`);

            // alert(`✅ Welcome ${matchedUser.UserName} !`)
            matchFound = true;
            break;
          } else {
            setMatchResult(`❌ ${matchedUser.UserName} Not Approved for this event`);
            // alert(`❌ ${matchedUser.UserName} Not Approved for this event`)
            matchFound=true
          }
        }
      }

      if (!matchFound) {
        setMatchResult('❌ No User Found');
      }
    } catch (error) {
      console.error('Error during detection & comparison:', error);
      setMatchResult('❌ An error occurred');
    }
  };

  // Run face detection & comparison every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      detectAndCompare();
    }, 2000);

    return () => clearInterval(interval);
  }, [modelsLoaded, storedImages]);

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2>Face Recognition Attendance System</h2>

      <div style={{ margin: '20px' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
          videoConstraints={{
            width: 320,
            height: 240,
            facingMode: 'user',
          }}
        />
      </div>

      <h3>{matchResult}</h3>
    </div>
  );
}
