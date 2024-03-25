import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email,LinkedIn,Twitter } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.instagram.com/_ti_luck_07/" color="inherit" target="_blank">
                        <Instagram style={{margin:3, fontSize:30, color:"#E1306C"}}/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/tilak-sojitra/" target="_blank" color="inherit">
                        <LinkedIn style={{margin:3, fontSize:30, color:"#405DE6" }} />
                    </Link>
                    <Link href="https://twitter.com/TilakSojitra" target="_blank" color="inherit">
                        <Twitter style={{margin:3, fontSize:30, color:"#405DE6" }} />
                    </Link>
                    or send me an Email 
                    <Link href="mailto:pateltilak9723@gmail.com" target="_blank" color="inherit">
                        <Email style={{margin:5, fontSize:30, color:"#c71610" }} />
                    </Link>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;