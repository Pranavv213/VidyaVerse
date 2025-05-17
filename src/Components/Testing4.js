import React,{useEffect, useState,useRef} from 'react'
import { useOkto } from "okto-sdk-react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { QRCodeCanvas } from 'qrcode.react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import logo from '../assets/images/logo.png'
import Stack from '@mui/material/Stack';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import coinImg from '../assets/images/coinImg.png'
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import './Home2.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import Confetti from 'react-confetti'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import CategoryIcon from '@mui/icons-material/Category';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ResponsiveAppBar from './ResponsiveAppBar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CountUp from 'react-countup';
import coinAnimation from '../assets/images/coinBackground3.gif'
import EventIcon from '@mui/icons-material/Event';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import axios from 'axios';
import { getCode } from 'country-list';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';



function Testing4() {


    const addUser=async()=>{

         const data = await getDocs(collection(db,"user"));
                              
               
         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
         let result = '';
         const charactersLength = characters.length;
         for (let i = 0; i < 6; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         
         const width = 600; // You can change the width
         const height = 400; // You can change the height
         const randomImageUrl = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
                               
              
                            
              
                await addDoc(collection(db,"user"), { Email:`${result}@gmail.com`, Coins: 100, EventsCreated: [], EventsRegistered: [], EventsApproved:[],EventsAttended: [],UserName:result,ProfileImage:randomImageUrl});
               


    }


    const addRandomDateTimetoEvents=async()=>{

        const data = await getDocs(collection(db,"events"));

         
                                           
        let eventsTemp=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        

        for(let i=0;i<eventsTemp.length;i++)
        {

            const randomTime = dayjs(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).format("YYYY-MM-DD HH:mm:ss")

            const userDoc = doc(db, "events",eventsTemp[i].id);
               
                           
            const newFields = {Timestamp:randomTime};
    
            await updateDoc(userDoc, newFields);

        }


        
       

   }


  return (
    <div>
      
<br></br>

      <button onClick={()=>{
        addUser()
      }}>Add Random User</button>
      <br></br>

      <button onClick={()=>{
       addRandomDateTimetoEvents()
      }}>Set Ramdom Timestamp to all events</button>
    </div>
  )
}

export default Testing4
