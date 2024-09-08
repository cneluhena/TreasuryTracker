"use client";

import Toolbar from "@mui/material/Toolbar";
import MiniVariantDrawer from "./components/sidebar";
import ProfileIcon from "./components/ProfileIcon";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Theme from "@/app/assets/theme";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Grid from "@mui/material/Grid";



interface Profile {
  username: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  phoneNumber: string;
  profileImage?: string; // Optional profile image field
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current path
  const noToolbarPaths = ["/login", "/signup"]; // Define paths where toolbar should be hidden
  const showToolbar = !noToolbarPaths.includes(pathname); // Determine whether to show the toolbar
  
  const userName = Cookies.get('name');

 

  return (
    <Theme>
      
      <Box component="main" sx={{ marginTop: showToolbar ? "64px" : "0px", overflowX:"hidden"}}>
     
      {showToolbar && (
        <>
        <header>
        <Toolbar
          sx={{
            position: "fixed",
            top: 0,
            width:"100%",
            left: 0,
            right: 0,
            justifyContent: "space-between",
            zIndex: 1100, // To ensure it stays on top
            backgroundColor: "white",
            overflow: "hidden"
                
            
           // Set background color to avoid transparency issues
          }}
          
        >
          <Box sx={{ flexGrow: 1, marginRight: "10px" }} />
          <Box sx={{ marginLeft: "auto" }}>
          <ProfileIcon name={userName} />
          </Box>
        </Toolbar>
        </header>
       <MiniVariantDrawer >
        <Box component="main" sx={{ flexGrow: 1, p: 2 , overflowX:"auto"}}>
        
        {children}
      </Box>
        </MiniVariantDrawer>
  
        </>
      )}
      {!showToolbar && <>{children}</>}
      </Box>
    
    </Theme>
  );
}