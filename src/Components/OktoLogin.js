import React,{useState,useRef,useEffect, use} from 'react'
import { useOkto } from "okto-sdk-react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import logo from '../assets/images/logo.png'
import a2e from '../assets/images/a2e.gif'
import { ToastContainer, toast } from 'react-toastify';

import './OktoLogin.css'

function OktoLogin() {


    const { createWallet, getUserDetails, getPortfolio } = useOkto();
    const { authenticate } = useOkto();
    const [authToken, setAuthToken] = useState(null);
    const navigate=useNavigate()

    const buttonBRef = useRef(null);

    const handleButtonClickA = () => {
      // Programmatically click Button B
      if (buttonBRef.current) {
        buttonBRef.current.click();
      }
    };

      const notify = () => toast("Sign in to start earning!",{
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            type:'default'
      })

    const handleGoogleLogin = async (credentialResponse) => {
        const idToken = credentialResponse.credential;
       
         authenticate(idToken, (authResponse, error) => {
             if (authResponse) {
              
              console.log(authResponse)
               setAuthToken(authResponse.auth_token);
               console.log("Authenticated successfully, auth token:", authResponse.auth_token);
              
                navigate('/home')
               
             
             
              
             } else if (error) {
                   console.error("Authentication error:", error);
               }
           });
        };
        useEffect(()=>{
          notify()
        },[])
  return (
    <div>

    
   
<div className="page">
<div className="full-width-bar" >
  <div class="logo" >  <img src={logo} style={{width:'3em'}} alt="Logo" /> &nbsp; ConnectVerse</div>
    
      <div className="text"> <Button variant="outlined" onClick={()=>{
        window.location.reload()
      }}>Sign In</Button></div>
    </div>
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
 
  
      {!authToken ? (
          
        <center>


<Card sx={{ maxWidth: 345 }} style={{marginTop:'-5%', background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(17.5px)', WebkitBackdropFilter: 'blur(17.5px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.18)' }}>
      <CardActionArea>
        <br></br>
        <PersonAddIcon fontSize='large' style={{color:'white'}}/>
       
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ color: 'white', textAlign: 'left' }}>
            Welcome to ConnectVerse
          </Typography>
          <Typography gutterBottom sx={{  fontSize: 14 }} style={{color:'white', textAlign: 'left'}}>
         Please Sign In below to continue.
        </Typography>

          <br></br>
          <GoogleLogin 
      onSuccess={handleGoogleLogin}
      onError={(error) => console.error("Login Failed", error)}
      render={(renderProps) => (
        <button ref={buttonBRef}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4285F4", // Button color
            color: "#fff", // Text color
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      )}
    />
        
        </CardContent>
      </CardActionArea>
    </Card>
       



  


  </center>
) : (
  <p>Authenticated</p>
)}
      </div>
    </div>


<ToastContainer/>

    </div>
  )
}

export default OktoLogin
