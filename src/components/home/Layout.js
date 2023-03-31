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
import { useSelector, useDispatch } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MuiToggleButton from '@mui/material/ToggleButton';
import { useState, useEffect } from 'react';

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

const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected > svg, &.Mui-selected:hover": {

        fill: '#00ceb8',
    }
});

export default function Layout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const {user} = useSelector((state) => state.auth);
    const [selectedTab, setSelectedTab] = useState("/home");

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
        setOpen(true);
    }

    const handleLeave = (e) => {
        setOpen(false);
    }

    const handleSelect = (e, newSelection) => {
        setSelectedTab(newSelection);
    };

    const unselectPage = () => {
        setSelectedTab(null);
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

                <ToggleButtonGroup 
                    color="primary"
                    value={selectedTab}
                    exclusive
                    onChange={handleSelect}
                    aria-label="page-tab"
                    sx={{display: "flex", flexDirection: "column", flexGrow: 1}}
                >

                    {options.map((item) => (
                        <ToggleButton
                            key={item.id}
                            component={Link}
                            to={item.href}
                            value={item.href}
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

                        </ToggleButton>
                    ))}


                    <Divider sx={{bgcolor:"#677897"}} />

                    {/* <div id="league-btns"> */}
                        {user.leagues.map((league) => (
                            <ToggleButton
                                id={league.id} 
                                key={league.id}
                                value={league.id}
                                component={Link}
                                to={`/league/${league.id}`}
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
                                <Avatar >{league.name.charAt(0).toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={league.name} sx={{ opacity: open ? 1 : 0, color:"#677897"  }} />
                            </ToggleButton>
                        ))}
                    {/* </div> */}

                </ToggleButtonGroup>

                <List>
                    <ListItem 
                        component={Link}
                        to={`/account-settings`}
                        onClick={unselectPage}
                        disablePadding 
                        sx={{ 
                            display: 'flex',
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
                            <Avatar >{user.username.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>

                        <Typography sx={{ opacity: open ? 1 : 0, color:"#ffffff", flexGrow: 1 }} variant="body1" noWrap component="div">{user.username}</Typography>

                        {open ? <SettingsIcon sx={{ opacity: open ? 1 : 0, color:"#ffffff" }}/> : null}
                        

                    </ListItem>

                </List>

            </Drawer>
        </Box>
        
    );
}