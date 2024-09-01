"use client";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { useState, MouseEvent } from "react";
import { deepOrange } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'

interface Profile {
  name: string | undefined;
}

const ProfileIcon = ({ name }: Profile) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set anchor element for Menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close Menu
  };

  // Handling logout
  const handleLogOut = async () => {
    const response = await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      credentials: "include",
    });
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
        disableScrollLock
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Avatar sx={{ bgcolor: deepOrange[500], margin: "15px" }}>{name.charAt(0)}</Avatar>
          <Typography sx={{ marginBottom: "15px" }}>{name}</Typography>
        </Box>

        <MenuItem onClick={() => { handleClose(); router.push('/profile'); }}>Profile</MenuItem>
        <MenuItem onClick={()=>{handleLogOut(); Cookies.remove('name', { path: '/'})}}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileIcon;
