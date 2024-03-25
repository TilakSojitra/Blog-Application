import React, { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import MuiAlert from '@mui/material/Alert';

import {
    Stack,
    Snackbar,
} from "@mui/material";

import { DataContext } from '../../context/DataProvider';
import { API } from '../../services/api';
import Comments from './comments/comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
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
    }, [id, navigate]);

    const deleteBlog = async () => {
        try {
            const response = await API.deletePost(post._id);

            if (response.isSuccess) {
                handlelOpen();
                setMsg(response.data.msg);
                setSeverity('success');
                handleClick();
                setTimeout(() => {
                    handlelClose();
                    navigate('/');
                }, 1000);
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

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

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
            <Container>
                <Image src={post.picture || url} alt="post" />
                <Box style={{ float: 'right' }}>
                    {
                        account.username === post.username &&
                        <>
                            <Link to={`/update/${post._id}`}> <EditIcon color="primary" /></Link>
                            <DeleteIcon onClick={() => deleteBlog()} color="error" />
                        </>
                    }
                </Box>
                <Heading>{post.title}</Heading>

                <Author>

                    <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>

                    <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
                </Author>

                <Typography>{post.description}</Typography>

                <Comments post={post} />
            </Container>
        </>
    )
}

export default DetailView;