import { useEffect, useState } from "react";
import { API } from "../../../services/api";
import { Box, Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import Post from "./post";




const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || ''});
                console.log(response);
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [category])
    
    return (
        <>
            {posts && posts.length > 0 ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                        <Post post={post} />
                    </Link>
                </Grid>
            )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                No data is available for selected category
            </Box>}
        </>
    )
}

export default Posts;