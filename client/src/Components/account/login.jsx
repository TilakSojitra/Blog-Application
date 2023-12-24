import React, { useState, useEffect, useContext } from "react";

import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";


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

  const [logindata, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signupdata, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
  });

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
        setError("");

        setAccount({ username:response.data.username, name:response.data.name});
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);

        isUserAuthenticated(true);
        navigate('/');
      } else {
        setError("Something went wrong please try again later!!");
      }
    } catch (error) {
      setError("Something went wrong please try again later!!");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signupdata);
      if (response.isSuccess) {
        setError("");
        setSignupData(signupdata);
        toggleAccount("login");
      } else {
        setError("Something went wrong please try again later!!");
      }
    } catch (error) {
      setError("Something went wrong please try again later!!");
      setTimeout(() => {
        setError("");
      }, 5000);
      // console.log(error);
    }
  };

  return (
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
  );
};

export default Login;
