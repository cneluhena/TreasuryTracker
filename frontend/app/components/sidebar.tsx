"use client"
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import HistoryIcon from '@mui/icons-material/History';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';


import { useRouter } from 'next/navigation';
import SideBarItem from './SideBarItem';

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)})`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1.5),
  justifyContent: 'flex-end',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);



export default function MiniDrawer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const router = useRouter(); // Use useRouter here


  return (
    <Box sx={{ display: 'flex' }}>
       
      <CssBaseline />
   

      <Drawer variant="permanent" open={open}>

        <DrawerHeader>
      
        {
          open? <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon/>
        </IconButton> : <IconButton onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        }
        
        </DrawerHeader>
       
        <List>
          <SideBarItem open={open} icon={<DashboardIcon/>} text='Dashboard' onClick={()=>{
            router.push("/home");
     
          }} />
          <SideBarItem open={open} icon={<PaidIcon/>} text='Investments' onClick={()=>{
            router.push("/investments");
        
          }} />
          <SideBarItem open={open} icon={<HistoryIcon/>} text='History' onClick={()=>{
            router.push("/history");
          
          }} />
           <SideBarItem open={open} icon={<OnlinePredictionIcon/>} text='Forecasts' onClick={()=>{
            router.push("/forecasts");
            
          }} />
          
        </List>
        

      </Drawer>
        
        {children}
     
    </Box>
  );
}