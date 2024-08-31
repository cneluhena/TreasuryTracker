"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Grow,
} from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TreasuryTracker
        </Typography>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            color="inherit"
            onClick={handleToggle}
          >
            Services
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        Profit Calculator
                      </MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Link href="/login" passHref>
          <Button color="inherit">Sign In</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
