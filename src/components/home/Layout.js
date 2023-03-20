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
import PageRouter from './PageRouter';
import { Link } from 'react-router-dom';

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  console.log(theme);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const options = [
    {
        id: 1, 
        title: "Home",
        href: "/home",
        icon: HomeIcon,
    },
    {
        id: 2, 
        title: "Inbox",
        href: "/inbox",
        icon: MailIcon,
    },
    {
        id: 3, 
        title: "Mock Draft",
        href: "/mock-draft",
        icon: DvrIcon,
    },
    {
        id: 4, 
        title: "New League",
        href: "/create-league",
        icon: AddBoxIcon,
    },
  ]

  const leaguesTest = [
    {
        id: 1, 
        title: "Fantasy Lizard Creatures",
        icon: "F",
    },
    {
        id: 2, 
        title: "Test League Too",
        icon: "T",
    },
    {
        id: 3, 
        title: "Deez League",
        icon: "D",
    },
  ]

  const handleEnter = (e) => {
    console.log("hover")
    setOpen(true);
  }

  const handleLeave = (e) => {
    console.log("leave")
    setOpen(false);
  }




  return (
    <Box id="layout" sx={{ display: 'flex' }}>

        <Drawer 
            variant="permanent" 
            open={open} onMouseEnter={handleEnter} 
            onMouseLeave={handleLeave}
            sx={{backgroundColor: "#1f2431"}}
            id="drawer"
        >

            <DrawerHeader>
                
                <ListItem disablePadding sx={{ 
                    display: 'flex',
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >

                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        }}
                    >
                        <GolfCourseIcon sx={{ fill:"#ffffff" }}/>
                    </ListItemIcon>

                    <Typography sx={{ opacity: open ? 1 : 0, color:"#ffffff" }} variant="h6" noWrap component="div">Masters Golf App</Typography>
                    {/* <ListItemText primary="Masters Golf App" sx={{ opacity: open ? 1 : 0, color:"#ffffff", variant:"h3" }} /> */}

                </ListItem>

            </DrawerHeader>

            <Divider sx={{bgcolor:"#677897"}} />

            <List>

            {options.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>

                <ListItem
                    component={Link}
                    to={item.href}
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    <item.icon sx={{ fill:"#677897" }} />
                    </ListItemIcon>

                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0, color:"#677897"}} />

                </ListItem>
                </ListItem>
            ))}
            </List>

            <Divider sx={{bgcolor:"#677897"}} />

            <List>
            {leaguesTest.map((league) => (
                <ListItem key={league.id} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemAvatar
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                    <Avatar >{league.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={league.title} sx={{ opacity: open ? 1 : 0, color:"#677897"  }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>

        </Drawer>

        {/* <Box component="main" sx={{ display:"flex", flexDirection: "column", flexGrow: 1, p: 3, gap: 3, backgroundColor: '#181c28'}}>

            <Box id="section-header" >
                <Typography variant='h3' sx={{color:"#ffffff"}}>Section Header</Typography>
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
                        }}
                    >
                    </Box>

            </Box>
                        
        </Box> */}


    </Box>
    
  );
}