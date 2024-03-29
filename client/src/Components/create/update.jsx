import React, { useState, useEffect, useContext } from "react";
import {
    styled,
    Box,
    TextareaAutosize,
    Button,
    InputBase,
    FormControl,
    Stack,
    Snackbar,
} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; 
import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)(({ theme }) => ({
    margin: "50px 100px",
    [theme.breakpoints.down("md")]: {
        margin: 0,
    },
}));

const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const Update = () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        picture: "",
        username: "",
        categories: "",
        createdDate: new Date(),
    });

    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { account } = useContext(DataContext);
    const { id } = useParams();

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

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            }
            catch (error) {
                // console.log(error);
                if (error.response.status === 403) {
                    setMsg("Sorry, Your token expired, Please Login Again!!");
                    setSeverity('error');
                    handleClick();
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }

            }
        }
        fetchData();
    }, [id, navigate])

    useEffect(() => {
        const getImage = async () => {
            try {

                if (file) {
                    // console.log(file);
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);

                    const response = await API.uploadFile(data);
                    // console.log(response);
                    setPost({ ...post, picture: response.data })

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getImage();
        // console.log(location.search?.split('=')[1] || 'All');
        post.categories = location.search?.split('=')[1] || 'All';
        setPost({ ...post, username: account.username });
    }, [account.username, file, location.search, post])


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const updatePost = async () => {
        try {
            // console.log(post);
            let response = await API.updatePost(post);
            if (response.isSuccess) {
                // console.log(response);
                handlelOpen();
                setMsg(response.data.msg);
                setSeverity('success');
                handleClick();
                setTimeout(() => {
                    handlelClose();
                    navigate(`/details/${id}`);
                }, 1000);
            }
            else {
                console.log('somethig went wrong');
            }
        }
        catch (error) {
            // console.log(error);
            if (error.response.status === 403) {
                setMsg("Sorry, Your token expired, Please Login Again!!");
                setSeverity('error');
                handleClick();
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        }
    }

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
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Stack>
            <Container>
                <Image src={url} alt="post" />

                <StyledFormControl>
                    <label htmlFor="fileInput">
                        <Add fontSize="large" color="action" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <InputTextField
                        onChange={(e) => handleChange(e)}
                        name="title"
                        value={post.title}
                        placeholder="Title"
                    />
                    <Button onClick={() => updatePost()} variant="contained" color="primary">
                        Update
                    </Button>
                </StyledFormControl>

                <Textarea
                    rowsMin={5}
                    placeholder="Tell your story..."
                    name="description"
                    value={post.description}
                    onChange={(e) => handleChange(e)}
                />
            </Container>
        </>
    );
};

export default Update;
