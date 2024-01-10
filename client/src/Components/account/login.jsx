import React, { useState, useEffect, useContext } from "react";

import { TextField, Box, Button, Typography, styled, Stack, Grid } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';  
import Backdrop from '@mui/material/Backdrop';
var passwordValidator = require('password-validator');


const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 200,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");

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

  const [logindata, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signupdata, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
  });

  var schema = new passwordValidator();
  schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);

  const onLoginInputChange = (e) => {
    // console.log(logindata);
    setLoginData({ ...logindata, [e.target.name]: e.target.value });
  };

  const onSignupInputChange = (e) => {
    // console.log(signupdata);
    setSignupData({ ...signupdata, [e.target.name]: e.target.value });
  };
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };



  const loginUser = async () => {
    try {
      let response = await API.userLogin(logindata);
      if (response.isSuccess) {
        
        setAccount({ username: response.data.username, name: response.data.name });
        
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        
        handlelOpen();
        setMsg("Login successful!! You will be redirected to home page soon!!");
        setSeverity("success");
        handleClick();

        isUserAuthenticated(true);
        setTimeout(() => {
          handlelClose();
          navigate('/');
        }, 2000);
      } else {
        setError("Something went wrong please try again later!!");
      }
    } catch (error) {
      // if(response.sta)
      // setMsg()
      setMsg(error.response.data.msg);
      setSeverity("error");
      handleClick();

    }
  };

  const signupUser = async () => {
    try {
      if (!schema.validate(signupdata.password)) {
        setMsg('Password must contain atleast one uppercase character,one lowercase character, two digits and one special character, and minimum length of 8 (without containing space).');
        setSeverity('warning');
        handleClick();
      }
      else {

        let exist = await API.existUser(signupdata.username);

        // console.log(exist);
        if (exist.data) {
          setSeverity("error");
          setMsg("Username already exist!!");
          handleClick();
        }
        else {

          let response = await API.userSignup(signupdata);
          // console.log(response);
          if (response.isSuccess) {


            setSignupData(signupdata);
            setSeverity("success");
            setMsg(response.data.msg);

            handleClick();
            toggleAccount("login");
          } else {
            setMsg("Something went wrong please try again later!!")
            setSeverity('error');
            handleClick();
          }
        }

      }
    } catch (error) {
      setMsg(error.response.data.msg)
      setSeverity('error');
      handleClick();
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={lopen}
        onClick={handlelClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack spacing={2} sx={{ width: '50%' }}>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {msg}
          </Alert>
        </Snackbar>
      </Stack>
      <Component>
        <Box style={{ marginTop: 50 }}>
          <Image src={imageURL} alt="blog" />
          {account === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onLoginInputChange(e)}
                name="username"
                value={logindata.username}
                label="Enter Username"
                required
              />
              <TextField
                variant="standard"
                onChange={(e) => onLoginInputChange(e)}
                type="password"
                name="password"
                value={logindata.password}
                label="Enter Password"
                required
              />

              {error && <Error>{error}</Error>}

              <LoginButton variant="contained" onClick={() => loginUser()}>
                Login
              </LoginButton>
              <Text style={{ textAlign: "center" }}>OR</Text>
              <SignupButton type="submit" onClick={() => toggleSignup()}>
                Create an account
              </SignupButton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onSignupInputChange(e)}
                name="name"
                value={signupdata.name}
                label="Enter Name"
                required
              />
              <TextField
                variant="standard"
                onChange={(e) => onSignupInputChange(e)}
                name="username"
                value={signupdata.username}
                label="Enter Username"
                required
              />
              <TextField
                variant="standard"
                onChange={(e) => onSignupInputChange(e)}
                type="password"
                name="password"
                value={signupdata.password}
                label="Enter Password"
                required
              />

              {error && <Error>{error}</Error>}

              <SignupButton type="submit" onClick={() => signupUser()}>
                Signup
              </SignupButton>
              <Text style={{ textAlign: "center" }}>OR</Text>
              <LoginButton variant="contained" onClick={() => toggleSignup()}>
                Already have an account
              </LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </>
  );
};

export default Login;
