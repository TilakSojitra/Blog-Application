import React, { useEffect, useState } from "react";
import { API } from "../../../services/api";
import { Box, Grid } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Post from "./post";

import MuiAlert from '@mui/material/Alert';

import {
    Stack,
    Snackbar,
} from "@mui/material";



const Posts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || '' });
                // console.log(response);
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            }
            catch (error) {
                if (error.response.status === 403) {
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
        fetchData();
    }, [category])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Stack>
            {posts && posts.length > 0 ?
                posts.map((post, index) => (
                    <Grid item key={index} lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <Post key={index} post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            }
        </>
    )
}

export default Posts;