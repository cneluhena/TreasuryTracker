"use client";

import Toolbar from "@mui/material/Toolbar";
import MiniVariantDrawer from "./components/sidebar";
import ProfileIcon from "./components/ProfileIcon";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import Theme from "@/app/assets/theme";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  Icon,
  List,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideBarItem from "./components/SideBarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import HistoryIcon from "@mui/icons-material/History";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DrawerList from "./components/DrawerList";
import DrawerComponent from "./components/DrawerComponent";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const pathname = usePathname(); // Get the current path
  const noToolbarPaths = ["/login", "/signup", "/reset-password", "/changePassword"]; // Define paths where toolbar should be hidden
  const showToolbar = !noToolbarPaths.includes(pathname); // Determine whether to show the toolbar
  const userName = Cookies.get("name");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
 // Drawer open state
 const [mounted, setMounted] = useState(false); // Track when the component has mounted

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    setMounted(true); // Set the mounted state to true after the first render
  }, []);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1.5),
    justifyContent: "flex-end",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
 
  const router = useRouter(); // Use useRouter here

  return (
    <Theme>
      <Box
        component="main"
        sx={{ marginTop: showToolbar ? "64px" : "0px", overflowX: "hidden" }}
      >
        {showToolbar && mounted && (
          <>
            <header>
              <Toolbar
                sx={{
                  position: "fixed",
                  top: 0,
                  width: "100%",
                  left: 0,
                  right: 0,
                  justifyContent: "space-between",
                  zIndex: 1100,
                  backgroundColor: "white",
                  overflow: "hidden",

                  // Set background color to avoid transparency issues
                }}
              >
                <IconButton onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>

                {/*{isMobile && <DrawerComponent  variant="temporary" drawerOpen={true}/>} */}

                <Box sx={{ flexGrow: 1, marginRight: "10px" }} />
                <Box sx={{ marginLeft: "auto" }}>
                  <ProfileIcon name={userName} />
                </Box>
              </Toolbar>
            </header>

            {isMobile && (
              <Drawer
                open={open}
                variant="temporary"
                onClose={handleDrawerClose}
              >
                <DrawerHeader>
                  {open ? (
                    <IconButton onClick={handleDrawerClose}>
                      <ChevronLeftIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleDrawerOpen}>
                      <MenuIcon />
                    </IconButton>
                  )}
                </DrawerHeader>
                <DrawerList open={open} onClick={handleDrawerClose} />
              </Drawer>
            )}


           
            <MiniVariantDrawer open={open}>
              <Box
                component="main"
                sx={{ flexGrow: 1, p: 2, overflowX: "auto" }}
              >
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
