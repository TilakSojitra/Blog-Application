import { Grid } from "@mui/material";
import Banner from "../banner/banner";
import Categories from "./categories";
import Posts from "./posts/posts";
import SearchIcon from '@mui/icons-material/Search';
import {
    InputBase,
    IconButton,
    Paper
} from "@mui/material";
import { useState } from "react";


const Home = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories />
                </Grid>
                <Grid container item lg={10} sm={10} xs={12}>
                    <Grid container item lg={10} sm={10} xs={12} sx={{ mt: 3, ml:2 }}>
                        <Paper style={{ width:'100%', height:'40px' }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Blog By Title"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="button" sx={{  pl:'76%' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Posts searchValue={searchValue} />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;