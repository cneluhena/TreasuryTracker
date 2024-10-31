"use client";

import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Typography, Alert } from "@mui/material";
import TimeSeriesChart from "../components/TimeSeriesChart";
import DropDown from "../components/DropDown";
import ForecastTable from "../components/ForecastTable";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ForecastObject {
  date: string;
  interest: number;
}

const Forecast = () => {
  const [period, setPeriod] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const treasuryType = ["Treasury Bills", "Treasury Bonds"];
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
 

  const [alignment, setAlignment] = useState('yield');
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const billTimePeriods = ["3-Month", "6-Month", "1-Year"];
  const bondTimePeriods = ["2-Year", "3-Year", "5-Year", "10-Year", "30-Year"];


  const [series, setSeries] = useState<ForecastObject[]>([]);
  useEffect(() => {
    if (selectedPeriod) {
      fetchPredictions();
    }
  }, [selectedPeriod]);

  const fetchPredictions = async () => {
    if (!selectedPeriod) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MODEL_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ period: selectedPeriod }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const data = await response.json();
      setSeries(
        data.map((item: any) => ({
          date: item.date,
          interest: parseFloat(item.interest).toFixed(3),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
      setError("Failed to fetch predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchPredictions();
    }
  }, [selectedPeriod]);

  useEffect(()=>{
    futureDates();
  }, [])

  useEffect(()=>{
    fetchYieldPredictions();
  }, [selectedDate])
  const handleChange = (selectedValue: string) => {
    if (selectedValue === "Treasury Bills") {
      setPeriod(billTimePeriods);
      setSelectedType(selectedValue);
    } else if (selectedValue === "Treasury Bonds") {
      setPeriod(bondTimePeriods);
      setSelectedType(selectedValue);
    }
    setSelectedPeriod("");
  };

  const futureDates = ()=>{
    const today = new Date();


    const datesList = [];


  for (let i = 0; i <= 7; i++) {
    const futureDate = new Date(today.getFullYear(), today.getMonth() + i, 1);

    const month = futureDate.getMonth()+1;
    const year = futureDate.getFullYear();

    datesList.push(`${month}/${year}`);
  }

  setDates(datesList);



}

  const fetchYieldPredictions = async()=>{
    setLoading(true);
    try{
      const response = await fetch(process.env.NEXT_PUBLIC_MODEL_URL + `/predict_multiple`, {    //https://treasury-tracker-frontend.vercel.app/model
        method: 'POST', // Specifies the HTTP method
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({"date": selectedDate}), 
      });

      const data = await response.json();
      const result = [{ date: '0', interest: 0 }, ...Object.entries(data).map(([date, price]) => ({
        date: date,
        interest: Number(parseFloat(price as string).toFixed(3)) // Format price to 3 decimal places
    }))];
    setSeries(result);
    
 
      
    } catch(err){
      console.log(err)
    } finally{
      setLoading(false);
    }
  }
 
  const handleToggleChange = (
    
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    
    setAlignment(newAlignment);
    setResetKey(prev=>prev+1);
    setSelectedDate('');
    setSelectedType('');
    setSelectedPeriod('');
    if (newAlignment == 'history'){
      setIsDisabled(true);
      console.log('reached');
    

    } else{
      setIsDisabled(false);
    }
  
  };

  const handlePeriodChange = (selectedValue: string) => {
    setSelectedPeriod(selectedValue);
  };

  const handleDateChange = (selectedDate: string) =>{
    setSelectedDate(selectedDate);
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
      <Grid item xs={12} container justifyContent="left" >
        <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
    >
      <ToggleButton value="yield" sx={{
        marginRight: '4px',
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            }}}}>Yield Curve</ToggleButton>
      <ToggleButton sx={{
        backgroundColor: 'white',
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'white',
            boxShadow: 4,
            '&:hover': {
              backgroundColor: 'primary.dark',
            }}}} value="history">Interests</ToggleButton>
      
    </ToggleButtonGroup>
        </Grid>
         
        <Grid item xs={12} container justifyContent="center">
          {
            alignment === 'history' && <DropDown
            menuName="Investment Type"
            menuItems={treasuryType}
            onSelectChange={handleChange}
            disabled={false}
            resetKey={resetKey}

          />
          }
          { 
          alignment === 'history' && <DropDown
          menuName="Period"
          menuItems={period}
          onSelectChange={handlePeriodChange}
          disabled={false}
          resetKey={resetKey}

        />

          }
           {
            alignment === 'yield' &&     <DropDown
            menuName="Date"
            menuItems={dates}
            onSelectChange={handleDateChange}
            disabled={isDisabled}
            resetKey={resetKey}
          
          />
          }
      
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {selectedPeriod &&
        selectedType &&
        (loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={5} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <ForecastTable series={series} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TimeSeriesChart
                series={series}
                title={`Predicted Interest Rates for ${selectedPeriod} ${selectedType}`}
                type='datetime'
                xTitle="Date"
              />
            </Grid>
          </Grid>
        ))}
        {
        alignment === 'yield' && selectedDate && (
          loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "75vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) :
          <Grid container spacing={4} justifyContent="center" marginTop={1}>
          <Grid item xs={12} md={6}>
            <TimeSeriesChart
              series={series}
              title="Yield Curve"
              type='category'
              xTitle="Maturity Period in months"
              
            />
          </Grid>
        </Grid>
        )
      }
    </Box>
  );
};

export default Forecast;
