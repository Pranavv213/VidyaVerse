import React,{useState,useEffect} from 'react'
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import backgroundVideo from '../assets/images/eventBackgroundVideo.mp4'
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../firebase-config";
import { useOkto } from "okto-sdk-react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useParams } from 'react-router-dom';

import eventContractABI from '../Contracts/EventManager.json'




const usersCollectionRef = collection(db, "events");
const usersCollectionRef1 = collection(db, "user");

const tokenAddress="0x594BC5879948faf0F9014aEB37E7a5F7B051f4c1"

const eventContractAddress="0x906BC3e88Ff2f3247881D6a4C0cD837bA283E2Fe"

function Payouts() {

    const {event_id}=useParams()
   


    const [events,setEvents]=useState([])

    const [balance,setBalance]=useState(0)

    const [loading, setLoading] = useState(false);
    const [loadingText,setLoadingText]=useState("")

    const [txn,setTxn]=useState('')

    const getEvents = async () => {

console.log(event_id)

         
           let data = await getDocs(usersCollectionRef);
           
            let eventsTemp=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
           
            let filteredArray=eventsTemp.filter(obj => obj.id === event_id)
            console.log(filteredArray)
            setEvents(filteredArray);

            if(!localStorage.getItem('email') || filteredArray.length==0 || ( filteredArray.length!=0 && filteredArray[0].Creator!=localStorage.getItem('email')))

                {
                    console.log(filteredArray)
                }
          
          };



          async function getCreatorEventBalance() {
            try {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, signer);
          
              const balance = await eventContract.getEventTokenBalance(event_id, tokenAddress);
              console.log(`Balance of creator for event ${event_id}:`, ethers.utils.formatUnits(balance, 18));

              setBalance( ethers.utils.formatUnits(balance, 18))
            } catch (err) {
              console.error("Error:", err);
            }
          }
          
          
    

    useEffect(()=>{

        getEvents()
        getCreatorEventBalance()
    },[])

  return (
    <div>
        <br></br> <br></br> <br></br> <br></br> <br></br>

          <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100vh",
                      objectFit: "cover",
                      zIndex: 0,
                    }}
                    src={backgroundVideo}
                  />

        {loading==true &&  <Box sx={{position:'absolute', width: '50%' ,top:'40%',left:'25%',zIndex:'9999999999999'}}>
        <l style={{color:'white',fontSize:'20px'}}>{loadingText}...</l>
        <br></br>
        <br></br> 
      <LinearProgress />
    </Box>}

        {!loading && 
        <center>
        <Card sx={{  }} style={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(17.5px)', WebkitBackdropFilter: 'blur(17.5px)', borderRadius: '10px', border:'1px solid rgb(255,255,255,0.5)',color:'rgb(255,255,255,0.5)' ,color:'white',width:'18em'}}>

        {events.length!=0 &&
      <CardContent >

            <img src={events[0].Image} style={{width:'16em',height:'16em'}}></img>
            <br></br>
            <br></br>
            <b>Balance</b> : USD {balance}
            <br></br>
            <br></br>
            <Button variant='outlined' style={{backgroundColor:balance==0 && 'grey',color:balance==0 && 'white'}} onClick={async()=>{


                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, signer);
               
                const tx = await eventContract.payout(event_id,tokenAddress);
                setLoadingText("Receiving Payout...")
                setLoading(true);
                await tx.wait();
                setTxn(tx.hash)
              
                setLoading(false);

                setBalance(0)

               


            }}>{balance==0 ? 'Received Payout':'Receive'}</Button>


            <br></br>
            <br></br>

            <center>      
                
                
                {txn.length!=0 && <div style={{display:'flex',gap:'10px'}}><b>Txn:</b><div style={{color:'green'}}>{txn.slice(0, 6)}...{txn.slice(-6)}</div> &nbsp; <ContentCopyIcon fontSize="small" onClick={()=>{
                    navigator.clipboard.writeText(txn)
                    .then(() => {
                      console.log("Text copied to clipboard!");
                     
                    })
                    .catch(err => {
                      console.error("Failed to copy text: ", err);
                    });
                 }}/></div>} 

            </center>
        
      </CardContent>
        }
      </Card>
      </center>
        }
    </div>
  )
}

export default Payouts
