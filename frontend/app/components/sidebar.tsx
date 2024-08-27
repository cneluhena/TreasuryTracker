"use client";
import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import HistoryIcon from '@mui/icons-material/History';


import { styled } from '@mui/material/styles';


import { useRouter } from "next/navigation";

// Define the width of the drawer when expanded
const drawerWidth = 240;

const MiniVariantDrawer: React.FC = () => {
  // State to control whether the drawer is open or closed
  const [open, setOpen] = useState<boolean>(false);

  // Function to handle opening the drawer
  const handleDrawerOpen = () => setOpen(true);

  // Function to handle closing the drawer
  const handleDrawerClose = () => setOpen(false);
  const router = useRouter(); // Use useRouter here
  const CustomListItemIcon = styled(ListItemIcon)({
    minWidth: '30px',  // Adjust the width as needed
    marginRight: '8px', // Reduce the margin as needed
});

  return (
    <>
      <CssBaseline />
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <List>
          <ListItemButton>
            <CustomListItemIcon>
              <DashboardIcon />
            </CustomListItemIcon>
            <ListItemText
              primary="Dashboard"
              onClick={() => {
                router.push("/home");
                handleDrawerClose();
              }}
            />
          </ListItemButton>
          <ListItemButton>
            <CustomListItemIcon>
              <PaidIcon/>
            </CustomListItemIcon>
            <ListItemText
              primary="Investments"
              onClick={() => {
                router.push("/investments");
                handleDrawerClose();
              }}
            />
          </ListItemButton>
          <ListItemButton>
          <CustomListItemIcon>
              <HistoryIcon />
            </CustomListItemIcon>
            <ListItemText
              primary="Historical Data"
              onClick={() => {
                router.push("/history");
                handleDrawerClose();
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      > */}
      {/* <Toolbar sx={{ minHeight: 10 }} /> */}
      {/* </Box> */}
    </>
  );
};

export default MiniVariantDrawer;