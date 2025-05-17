import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/images/coinBackground2.gif'
import ResponsiveAppBar from "./ResponsiveAppBar";
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';

const QrScanner = () => {
  const webcamRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [showAuthorizationMessage,setShowAuthorizationMessage]=useState("")

  const usersCollectionRef = collection(db, "events");
  const usersCollectionRef1 = collection(db, "user");
  const usersCollectionRef2 = collection(db, "ticket");


   const notify = (text,type) => toast(text,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type:type
       
        });

   const { event_id } = useParams();

  

  useEffect(()=>{

    getEvents()
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isReady) {
        scanQRCode();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isReady]);

  const handleLoadedMetadata = () => {
    setIsReady(true);
  };


    const getEvents = async () => {

          if(!localStorage.getItem('email'))
          {
            window.location.href = '/oktologin';
          }
          const data = await getDocs(usersCollectionRef);
         
          let eventsTemp=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
         
          let filteredArray=eventsTemp.filter(obj => obj.Creator === localStorage.getItem('email') && obj.id===event_id)
          
          if(filteredArray.length==0)
          {
            window.location.href = '/error/User Not Authorized';
          }
         
         
        
        };
  const scanQRCode = () => {
    const video = webcamRef.current?.video;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }

      const updateUser = async (obj,EventId) => {
    
              
                        const userDoc = doc(db, "user", obj.id);
                        let filteredArray=0;
                         filteredArray=obj.EventsAttended.filter(x=>x==event_id)
                        console.log(obj.EventsAttended)
                        console.log(filteredArray)
                        if(filteredArray.length==0)
                        {
                          
                          const newFields = { Email: obj.Email, Coins:obj.Coins+1000, EventsCreated:obj.EventsCreated,EventsRegistered:obj.EventsRegistered, EventsApproved:obj.EventsApproved,EventsAttended:[...obj.EventsAttended,EventId]};
                          await updateDoc(userDoc, newFields);

                       
                         notify("Congratulations! You earned 1000 coins","success")
                         
                         
                         
                         
                        }
                      

                        
                      };
    
  const getTickets = async (code) => {
        let data = await getDocs(usersCollectionRef2);
       
        let ticketTemp=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       
        let filteredArray=ticketTemp.filter(obj => obj.EventId==event_id && obj.TicketId==code)

       

       
        if(filteredArray.length!=0)
        {
         

          let EventId=filteredArray[0].EventId

          data = await getDocs(usersCollectionRef1);
       
          let userTemp=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
       
          filteredArray=userTemp.filter(obj => obj.Email === code.slice(10))
         
          if(filteredArray.length!=0)
          {
            updateUser(filteredArray[0],EventId)
          }
        }
        else
          {
            alert('User Not Authorized')
          }
         
       
      
      };
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code && code.data !== qrCode) {
      alert(code.data)
      setQrCode(code.data);
      getTickets(code.data)
    }
  };

  return (
    <div style={{ backgroundImage:`url(${backgroundImage})`,
    backgroundSize: 'cover', // Ensures the image covers the entire area without distortion
    backgroundPosition: 'center center', // Centers the image within the div
    backgroundRepeat: 'no-repeat', // Prevents repeating of the image}}>
    height:'50em'
  }}>
   

<ResponsiveAppBar homeButtonStyle="outlined" earnButtonStyle="outlined" createButtonStyle="outlined" dashboardButtonStyle="outlined" />
    
     <br></br><br></br><br></br><br></br><br></br> <br></br> <br></br>  <br></br> <br></br>  <br></br> <br></br>  <br></br> <br></br>
      
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
        onLoadedMetadata={handleLoadedMetadata}
        style={{
          width: "80%",
          maxWidth: "600px",
          borderRadius: "10px",
          border:'1px solid white'
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <strong>Scanned QR Code</strong>
        {/* <p>{qrCode || "Waiting for scan..."}</p> */}
      </div>

<ToastContainer  style={{zIndex:'99999999999999'}}/>


    </div>
  );
};

export default QrScanner;
