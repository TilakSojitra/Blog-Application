import React, { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Stack, Snackbar } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'; 
import { API } from '../../../services/api';

import Comment from './comment';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;


const Comments = ({ post }) => {

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const [comment, setComment] = useState({
        name: account.username,
        postId: post._id,
        date: new Date(),
        comment: ""
    })

    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

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
        const fetchComments = async () => {
            try {
                let response = await API.getCommentsById(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            }
            catch (error) {
                if(error.response.status === 403){
                    setMsg("Sorry, Your token expired, Please Login Again!!");
                    setSeverity('error');
                    handleClick();
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
                // console.log(error);
            }
        }
        fetchComments();
    }, [navigate, post, toggle]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comment: e.target.value
        });
    }

    const addComment = async (e) => {
        try {
            let response = await API.addComment(comment);

            if (response.isSuccess) {
                // setToggle(prevState => !prevState);
                setComment({
                    name: account.username,
                    postId: post._id,
                    date: new Date(),
                    comment: "",
                })
                handlelOpen();
                setMsg(response.data.msg);
                setSeverity('success');
                handleClick();
                setTimeout(() => {
                    handlelClose();
                }, 1000);
            }
            setToggle(prevState => !prevState);
        }
        catch (error) {
            if(error.response.status === 403){
                setMsg("Sorry, Your token expired, Please Login Again!!");
                setSeverity('error');
                handleClick();
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
            // console.log(error);
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
            <Box>
                <Container>
                    <Image src={url} alt="dp" />
                    <StyledTextArea
                        rowsMin={5}
                        placeholder="what's on your mind?"
                        onChange={(e) => handleChange(e)}
                        value={comment.comment}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={{ height: 40 }}
                        onClick={(e) => addComment(e)}
                    >Post</Button>
                </Container>
                <Box>
                    {
                        comments && comments.length > 0 && comments.map((comment, index) => (
                            <Comment key={index} comment={comment} setToggle={setToggle} />
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

export default Comments;