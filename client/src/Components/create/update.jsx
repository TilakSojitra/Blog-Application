import React, { useState, useEffect, useContext } from "react";

import {
    styled,
    Box,
    TextareaAutosize,
    Button,
    InputBase,
    FormControl,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

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

    const [file,setFile] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {account} = useContext(DataContext);
    const { id } = useParams();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try{
                let response  = await API.getPostById(id);
                if(response.isSuccess){
                    setPost(response.data);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[])

    useEffect(() => {
        const getImage = async () => {
            try{

                if(file){
                    // console.log(file);
                    const data = new FormData();
                    data.append("name",file.name);
                    data.append("file",file);
                    
                    const response = await API.uploadFile(data);
                    // console.log(response);
                    setPost({...post , picture : response.data})

                }
            }
            catch(error){
                console.log(error);
            }
        }
        getImage();
        // console.log(location.search?.split('=')[1] || 'All');
        post.categories = location.search?.split('=')[1] || 'All';
        setPost({...post , username : account.username});
    },[file])

    
    const handleChange = (e) => {
        setPost({...post,[e.target.name]:e.target.value })
    }

    const updatePost = async () => {
        try{
            console.log(post);
            let response = await API.updatePost(post);
            if(response.isSuccess){
                navigate(`/details/${id}`);
            }
            else{
                console.log('somethig went wrong');
            }
        }
        catch(error){
            console.log(error);
        }
    }


    return (
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
    );
};

export default Update;
