"use client"
import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import DrawerComponent from './DrawerComponent';
import { Vazirmatn } from 'next/font/google';


interface Props{
  children: React.ReactNode, 
  open:boolean, 

}


export default function MiniDrawer({ children, open}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screen size
  
  return (
    <Box sx={{ display: 'flex'}}>
       
      <CssBaseline />
      {!isMobile && <DrawerComponent variant="permanent" drawerOpen={open}/>}

        {children}
     
    </Box>
  );
}