import React, { useContext, useState } from "react";

import { Typography, Box, styled, Stack, Snackbar } from "@mui/material";
import { Delete } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'; 
import { API } from '../../../services/api';
import { DataContext } from "../../../context/DataProvider";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {
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

    const removeComment = async () => {
        try {
            let response = await API.deleteComment(comment._id);
            if (response.isSuccess) {
                handlelOpen();
                setMsg(response.data.msg);
                setSeverity('success');
                handleClick();
                setTimeout(() => {
                    handlelClose();
                }, 1000);
            }
            setTimeout(() => {
                setToggle(prevState => !prevState);
            }, 1000);
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
            // console.log(error.response);
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
            <Component>

                <Container>
                    <Name>{comment.name}</Name>
                    <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                    {comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />}
                </Container>
                <Typography>{comment.comment}</Typography>
            </Component>
        </>
    )
}

export default Comment;