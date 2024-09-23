import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "./DrawerList";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)})`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(11)})`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1.5),
  justifyContent: "flex-end",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface Props {
  drawerOpen: boolean;
  variant: "temporary" | "permanent" | "persistent";
}

const DrawerComponent = ({ drawerOpen, variant }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(drawerOpen);
  }, [drawerOpen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Drawer open={open} variant={variant} onClose={handleDrawerClose}>
      <DrawerHeader sx={{paddingLeft:0, paddingRight:3}}>
        {open ? (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          
        ) : (
          <IconButton sx={{margin:0}}onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <DrawerList open={open} />
    </Drawer>
  );
};

export default DrawerComponent;
