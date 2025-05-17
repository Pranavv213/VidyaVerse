import React from 'react'
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

function Pricing() {
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
        <Button variant='outlined' style={{border:'1px solid #1876d1', color:'#1876d1',width:'10em'}}>Buy</Button>

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
    </div>
  )
}

export default Pricing
