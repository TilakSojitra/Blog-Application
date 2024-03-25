import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Typography, Stack } from "@mui/material"
import React, { useEffect, useState } from "react";
import { API } from "../../services/api";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const VerifyEmail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true)
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [msg, setMsg] = useState("");

  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [lopen, setlOpen] = React.useState(false);
  const handlelClose = () => {
    setlOpen(false);
  };
  const handlelOpen = () => {
    setlOpen(true);
  };

  const verify = async () => {

    try {
      handlelOpen()
      await API.verifyEmail({
        email: email,
        token: token
      })
      setLoading(false)
      handlelClose()
      setSeverity('success')
      setMsg("Email verified successfully")
      handleClick()
    }
    catch (error) {
      setLoading(true)
      setSeverity('error')
      setMsg(error.response.data.msg)
      handleClick()
      console.log(error);
    }

  }
  useEffect(() => {
    verify()
  }, [])

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Stack spacing={2} sx={{ width: '50%' }}>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </Stack>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={lopen}
        onClick={handlelClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loading && <Typography sx={{ textAlign: 'center', mt: 2, lineHeight: 1.82, backgroundColor: '#e7f3ff', height: '10vh' }} variant="h4" color="initial">
        Your email is verified,click on{' '}
        <Link to={`/login`} replace={true}>this</Link>{' '}
        and login again.
      </Typography>}
    </>
  )
}

export default VerifyEmail