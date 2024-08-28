"use client";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { useState, MouseEvent } from "react";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useRouter } from "next/navigation";

interface Profile {
  name: string | undefined;
}
const ProfileIcon = ({ name }: Profile) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (status: boolean) => {
    setDrawerOpen(status);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
    setAnchorEl(event.currentTarget); // Set anchor element for Menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close Menu
  };

  //handling logout
  const handleLogOut = async () => {
    const response = await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log(response);
    if (response.ok) {
      router.push("/login");
    }
  };

  

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="profile"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        open={drawerOpen}
        anchorEl={anchorEl}
        onClose={() => {
          setDrawerOpen(false);
        }}
        slotProps={{
          paper: {
            sx: {
              width: "250px", // Set the width of the Menu
              height: "auto", // Adjust height automatically based on content
              p: 2, // Add padding to the Menu
              borderRadius: 1, // Adjust border radius if needed
            },
          },
        }}
        disableScrollLock // Close Menu
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Avatar sx={{ bgcolor: deepOrange[500], margin: "15px" }}>N</Avatar>
          <Typography sx={{ marginBottom: "15px" }}>{name}</Typography>
        </Box>

        <MenuItem onClick = {()=>{router.push('/profile');handleClose();}}>Profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default ProfileIcon;
