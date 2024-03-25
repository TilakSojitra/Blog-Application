import React, { useEffect, useState } from "react";
import { API } from '../../services/api'
import { Paper, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';  
import Backdrop from '@mui/material/Backdrop';

const Profile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const [lopen, setlOpen] = React.useState(true);
  const handlelClose = () => {
    setlOpen(false);
  };
  const handlelOpen = () => {
    setlOpen(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const user =  await API.getLoggedinUser()
        setUser(user.data)
        setLoading(false)
        handlelClose()
      }
      catch(error){
        console.log(error.response);
      }
    }
    fetchProfile()
  },[])
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={lopen}
        onClick={handlelClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loading && 
      <div style={{ display:'flex', justifyContent:'center' }}>
        <Paper elevation={3} style={{ height:'auto', width:'auto', marginTop:'100px', padding:'20px', textAlign:'center', boxShadow: 'inset 1px 1px 5px black', fontFamily:'"Inter", sans-serif' }}>
          <Typography variant="h4">
            Name:- {user.name}
          </Typography>
          <Typography variant="h6" sx={{mt:1}}>
            Username:- {user.username}
          </Typography>
          <Typography variant="h6">
            Email:- {user.email}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            created at:- {new Date(user.createdAt).toLocaleString()}
          </Typography>
        </Paper>
      </div>
      }
    </>
  )
}

export default Profile;