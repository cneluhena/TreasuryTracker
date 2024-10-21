import { List } from "@mui/material";
import SideBarItem from "./SideBarItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import HistoryIcon from "@mui/icons-material/History";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  open: boolean, 
  onClick?: ()=>void
}

const DrawerList = ({ open, onClick}: Props) => {
  const handleClick = (path: string) => {
    router.push(path);   // Navigate to the selected path
    if (onClick){
      onClick();
    }         // Call the passed onClick to handle closing the drawer
  };
  const router = useRouter();
  return (
    <List>
      <SideBarItem
        open={open}
        icon={<DashboardIcon color="secondary"/>}
        text="Dashboard"
        onClick={() => {
          handleClick("/home")
        }}
        
      />
      <SideBarItem
        open={open}
        icon={<PaidIcon color="secondary" />}
        text="Investments"
        onClick={() => {
          handleClick("/investments")
        }}
        
      />
      <SideBarItem
        open={open}
        icon={<HistoryIcon color="secondary"/>}
        text="History"
        onClick={() => {
          handleClick("/history")

        }}
      />
      <SideBarItem
        open={open}
        icon={<OnlinePredictionIcon color="secondary"/>}
        text="Forecasts"
        onClick={() => {
          handleClick("/forecasts")
        
        }}
      />
    </List>
  );
};

export default DrawerList;
