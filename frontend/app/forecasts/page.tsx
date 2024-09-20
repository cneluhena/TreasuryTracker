"use client";

import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import TimeSeriesChart from "../components/TimeSeriesChart";
import { useState ,useEffect} from "react";
import DropDown from "../components/DropDown";
import ForecastTable from "../components/ForecastTable";
import axios from 'axios';

interface UserDetails {
  username: string;
}

interface ForecastObject{
  date:string,
  interest:number
 
} 

const Forecast = () => {
  const [period, setPeriod] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const treasuryType = ["Treasury Bills", "Treasury Bonds"];
  const [selectedType, setSelectedType] = useState("");
  const billTimePeriods = ["3 months", "6 months", "12 months"];
  const bondTimePeriods = [
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "10 years",
  ];

  const data = {

  }


  

  const handleChange = (selectedValue: string) => {
    if (selectedValue === "Treasury Bills") {
      setPeriod(billTimePeriods);
      setSelectedType(selectedValue);
    } else if (selectedValue == "Treasury Bonds") {
      setPeriod(bondTimePeriods);
      setSelectedType(selectedValue);
    }
  };

  const handlePeriodChange = (selectedValue: string) => {
    setSelectedPeriod(selectedValue);
  };

  

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} container justifyContent="center">
          <DropDown
            menuName="Investment Type"
            menuItems={treasuryType}
            onSelectChange={handleChange}
          />
          <DropDown
            menuName="Period"
            menuItems={period}
            onSelectChange={handlePeriodChange}
          />
        </Grid>
      </Grid>
      {selectedType && selectedPeriod && (
        <Grid container spacing={5}  padding={5}>
          <Grid item xs={12} md={6} >
            <ForecastTable investmentType={selectedType} period={selectedPeriod}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeSeriesChart investmentType={selectedType} period={selectedPeriod} title="Predicted Interest Rates"/>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Forecast;
