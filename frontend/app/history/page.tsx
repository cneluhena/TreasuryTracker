"use client";

import {
  Box,
  CircularProgress,
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

import { useState, useEffect } from "react";

import DropDown from "../components/DropDown";


interface UserDetails {
  username: string;
}
interface ForecastObject{
  date:string,
  interest:number
} 




const History = () => {
  const [period, setPeriod] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const treasuryType = ["Treasury Bills", "Treasury Bonds"];
 
  const [selectedType, setSelectedType] = useState("");
  const [interestData, setInterestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const billTimePeriods = ["3 months", "6 months", "12 months"];
  const bondTimePeriods = [
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "10 years",
  ];


  const getInterests = async () => {
    try {
      const response = await fetch("http://localhost:5000/interest/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        console.log("sdfsfg")
        throw new Error('Failed to fetch investments');

      }
  
      const data = await response.json();
      setInterestData(data);

    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  
  useEffect(()=>{
    console.log("Readhciadfa");
    getInterests();
  }, [])

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

  const [series, setSeries] = useState<ForecastObject[]>([]);
  
  // Function to fetch predictions from Flask API
  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/history');
      if (!response.ok){
        throw new Error('Failed to fetch history');
      } // Adjust this URL to match your Flask server

      const data = await response.json();
      setSeries(data.map((item: any) => ({
        date: item.date,
        interest: parseFloat(item.interest).toFixed(3) // Assuming interest_rate is returned as a string
      })));
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    }
  };

  // Fetch data on component mount or when dependencies change
  useEffect(() => {
    fetchPredictions();
  }, [selectedType, selectedPeriod]);

  return (
    <>{
      loading ? (<Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
      )
}
      {selectedType && selectedPeriod && (
        <Grid container spacing={4} justifyContent="center" marginTop={1}>
          <Grid item xs={12} md={6}>
            <TimeSeriesChart
              series={series}
              title="Interest rates over time"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default History;
