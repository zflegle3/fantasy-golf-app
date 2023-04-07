import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import HeroImg from "../../../images/pictures/3-fairway-1.JPG"


export default function HeroInfo() {

    return (
        <Box id="leaderboard-container" sx={{ display:"flex", flexDirection: "column", padding: "2rem", flexGrow: 1, height: "500px", borderRadius: "1.6rem", backgroundImage: `url(${HeroImg})`, backgroundSize: "cover", border: '1px solid rgba(58,70,91)'}}>
            <Box sx={{paddingBottom: "1rem", display:"flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: "rgba(255, 255, 255, .45)", padding: "2rem", borderRadius: "1.5rem", maxWidth: "500px", backdropFilter: "blur(5px)"}}>
                <Typography variant='h2' sx={{color: "#00422d", fontWeight: "600", marginBottom: "1rem"}}>The Masters Tournament</Typography>
                <Typography variant='h6' sx={{color: "#000000"}}>Augusta National Golf Club</Typography>
                <Typography variant='h6' sx={{color: "#000000", marginBottom: "1rem"}}>Thu, Apr 6, 2023 – Sun, Apr 9, 2023</Typography>
                <div className="form-btn-container">
                        <a href="https://www.masters.com/en_US/live/index.html">
                            <button>WATCH LIVE NOW</button>
                        </a>
                </div>
            </Box>


        </Box>
    
    );

}