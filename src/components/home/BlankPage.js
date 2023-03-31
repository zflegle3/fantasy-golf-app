import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// Added
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DvrIcon from '@mui/icons-material/Dvr';
import { Avatar } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import { fontSize } from '@mui/system';
import { TwitterTimelineEmbed } from 'react-twitter-embed';


export default function BlankPage({title}) {
  const theme = useTheme();

    return (

        <Box id="page-all" component="main" sx={{ display:"flex", flexDirection: "column", flexGrow: 1, p: 3, gap: 3, backgroundColor: '#181c28'}}>

            <Box id="section-header" >
                <Typography variant='h3' sx={{color:"#ffffff"}}>{title}</Typography>
            </Box>

            <Box id="section-container" sx={{ display:"flex", flexDirection: "row", flexGrow: 1, p: 3, gap: 3, padding:"0"}}>
                    <Box 
                        component="main" 
                        sx={{ 
                            flexGrow: 2, 
                            p: 3, 
                            color: '#bbb',
                            backgroundColor: "rgba(58,70,91,0.5)",
                            border: "1px solid #3a465b",
                            borderRadius: "16px",
                        }}
                    >
                    </Box>

                    <Box 
                        component="main" 
                        sx={{ 
                            flexGrow: 1, 
                            p: 3, 
                            color: '#bbb',
                            backgroundColor: "rgba(58,70,91,0.5)",
                            border: "1px solid #3a465b",
                            borderRadius: "16px",
                            maxWidth: "600px",
                            overflowY: "scroll",
                        }}
                    >
                        {/* <TwitterTimelineEmbed 
                            sourceType="profile" 
                            screenName="TheMasters"
                            // options={} 
                        /> */}
                    </Box>

            </Box>
                        
        </Box>
    
    );
}