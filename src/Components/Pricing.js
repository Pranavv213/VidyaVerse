import React,{useState} from 'react'
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
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

 const usersCollectionRef1 = collection(db, "user");
// Replace with your ERC20 token contract address and ABI
const CON_TOKEN_ADDRESS = '0xD104B06857a572e1a8d3631F467fBc83557Df9F6';
const CON_TOKEN_ABI = 
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "initialOwner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


const RECEIVER_ADDRESS = '0x3d8C2b52d2F986B880Aaa786Ff2401B2d3412a41';

function Pricing() {

  const [loading, setLoading] = useState(false);
  
  const sendTokens = async (amountString) => {
    if (!window.ethereum) return alert("MetaMask is not available.");

    try {
      setLoading(true);

      const data = await getDocs(usersCollectionRef1);
                                                  
      let usersTemp=await data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      
          
     let filteredArray=usersTemp.filter(obj => obj.Email === localStorage.getItem('email'))

     if(filteredArray.length==0)
     {

      return;
     }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const token = new ethers.Contract(CON_TOKEN_ADDRESS, CON_TOKEN_ABI, signer);
      const decimals = await token.decimals();
      const balance = await token.balanceOf(userAddress);

      const amountToSend = ethers.utils.parseUnits(amountString, decimals);

      if (balance.gte(amountToSend)) {
        const tx = await token.transfer(RECEIVER_ADDRESS, amountToSend);
        await tx.wait();

        notifyCustom(`${amountString} CON token(s) sent successfully!`,"success")


       const userDoc1 = doc(db, "user", filteredArray[0].id);
      const newFields1 = { Premium:'Creator'};
        await updateDoc(userDoc1, newFields1);

        notifyCustom(`Successfully bought Creators Pack`,"success")

        setTimeout(() => {

          window.location.reload()
          
        }, 3000);



       
      } else {

        notifyCustom(`Insufficient CON token balance.!`,"error")

        setTimeout(() => {

          window.location.reload()
          
        }, 3000);

        
      }
    } catch (error) {
      console.error(error);
      notifyCustom(`Transaction failed or was rejected`,"error")

      setTimeout(() => {

        window.location.reload()
        
      }, 3000);

     
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (amount) => {

    if(!localStorage.getItem('walletAddress'))
    {
      notifyCustom(`Wallet not connected`,"error")

      setTimeout(() => {

        window.location.reload()
        
      }, 3000);
    }

  
    if (!amount || isNaN(amount) || Number(amount) <= 0) {

      
     
      return;
    }
    sendTokens(amount);
  };

   const notifyCustom = (text,type) =>{
    
    toast(text,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                type:type
               
                });

                


              }

  

  return (
    <div>
        <br></br>
       <ResponsiveAppBar homeButtonStyle="outlined" earnButtonStyle="outlined" createButtonStyle="outlined" dashboardButtonStyle="outlined" />
       <br></br><br></br><br></br><br></br><br></br>

       <div>

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

       <div style={{display:'flex',flexWrap:'wrap',gap:'20px',justifyContent:'center'}}>

       <Card sx={{  }} style={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(17.5px)', WebkitBackdropFilter: 'blur(17.5px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.18)' ,color:'white'}}>
      
      <CardContent >
        <Typography gutterBottom  component="div" >
            <br></br>
         <l style={{fontSize:'24px'}}> Starter</l>
          <br></br><br></br>

          <l style={{fontSize:'28px'}}><b>$0 CONS</b></l> <l style={{fontSize:'16px',color:'rgb(200,200,200'}}>/ month</l>
        </Typography>
        <br></br>  
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>

            <div style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'flex-start'}}> 

        

          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create unlimited online events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create 3 offline events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <ClearIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}> Create paid events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}> Maximum capacity of 50  </l>

            </div>


            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <ClearIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}> Run Ad Campaign </l>

            </div>


            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
             <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create channel </l>

          </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create 1 community </l>

            </div>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <ClearIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Send crypto to individuals </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <ClearIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Aidrop to community members </l>

            </div>

          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{width:'100%'}}>
        <Button variant='outlined' style={{border:'1px solid #1876d1', color:'#1876d1',width:'10em'}}>Buy</Button>

        </div>
      </CardActions>
    </Card>


    <Card sx={{  }} style={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(17.5px)', WebkitBackdropFilter: 'blur(17.5px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.18)' ,color:'white'}}>
      
      <CardContent >
        <Typography gutterBottom  component="div" >
            <br></br>
         <l style={{fontSize:'24px'}}> Creator</l>
          <br></br><br></br>

          <l style={{fontSize:'28px'}}><b>$100 CONS</b></l> <l style={{fontSize:'16px',color:'rgb(200,200,200'}}>/ month</l>
        </Typography>
        <br></br>  
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>

            <div style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'flex-start'}}> 

        

          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create unlimited online events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create 10 offline events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>Create paid events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}> Unlimited capacity </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create 1 Ad Campaign </l>

            </div>


            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
             <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create channel </l>

          </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create 5 communities </l>

            </div>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Send crypto to individuals </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <ClearIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Aidrop to community members </l>

            </div>

          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{width:'100%'}}>
        <Button variant='outlined' style={{border:'1px solid #1876d1', color:'#1876d1',width:'10em'}} onClick={()=>{handleSubmit("100")}}>Buy</Button>

        </div>
      </CardActions>
    </Card>


    <Card sx={{  }} style={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', backdropFilter: 'blur(17.5px)', WebkitBackdropFilter: 'blur(17.5px)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.18)' ,color:'white'}}>
      
      <CardContent >
        <Typography gutterBottom  component="div" >
            <br></br>
         <l style={{fontSize:'24px'}}> Pro</l>
          <br></br><br></br>

          <l style={{fontSize:'28px'}}><b>$150 CONS</b></l> <l style={{fontSize:'16px',color:'rgb(200,200,200'}}>/ month</l>
        </Typography>
        <br></br>  
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>

            <div style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'flex-start'}}> 

        

          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create unlimited online events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create unlimited offline events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}> Create paid events </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}> Unlimited capacity  </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create 10 Ad Campaigns </l>

            </div>


            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
             <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create channel </l>

          </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Create unlimited communities </l>

            </div>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Send crypto to individuals </l>

            </div>

            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
   
            <DoneIcon style={{color:'white'}} /> <l style={{color:'rgb(200,200,200',fontSize:'18px'}}>  Aidrop to community members </l>

            </div>

          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{width:'100%'}}>
        <Button variant='outlined' style={{border:'1px solid #1876d1', color:'#1876d1',width:'10em'}}>Buy</Button>

        </div>
      </CardActions>
    </Card>


    </div>
    </div>

<br></br><br></br><br></br>
 <ToastContainer style={{zIndex:'99999999999'}}/>
    </div>
  )
}

export default Pricing
