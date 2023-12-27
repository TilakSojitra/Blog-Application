import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'



import { DataContext } from '../../context/DataProvider';
import { API } from '../../services/api';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        <EditIcon color="primary" />
                        <DeleteIcon color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>

                <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>

                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
        </Container>
    )
}

export default DetailView;