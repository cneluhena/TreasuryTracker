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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DropDown from "../components/DropDown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs'; 


interface UserDetails {
  username: string;
}
interface ForecastObject{
  date:string,
  interest:number
} 

interface YieldData{
  date: string, 
  period: number, 
  type: string
}




const History = () => {
  const [period, setPeriod] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [dates, setDates] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  const treasuryType = ["Treasury Bills", "Treasury Bonds"];
 
  const [selectedType, setSelectedType] = useState("");
  const [interestData, setInterestData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [yieldData, setYieldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState<ForecastObject[]>([]);
  const [alignment, setAlignment] = useState('yield');
  const [isDisabled, setIsDisabled] = useState(false);

  const billTimePeriods = ["3 months", "6 months", "12 months"];
  const bondTimePeriods = [
    "2 years",
    "5 years"
  ];

  const periodMap = {
    "3 months": 3, 
    "6 months": 6, 
    "12 months" : 12
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

  const handleDateChange = async(date: string)=>{
    try{
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/interest/yield?date=${date}`);
      const data = await response.json();
      setSeries([{ date: 0, interest: 0 }, ...data.map(item => ({
        date: item.Period.toString(),
        interest: item.Price
      }))])
      setSelectedDate(date);
      
    } catch(err){
      console.log(err)
    }
  }
 

  const getHistory = async (time:number) => {
    try {
      console.log(time);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/interest/get?period=${time}`);
      if (!response.ok){
        throw new Error('Failed to fetch history');
      } // Adjust this URL to match your Flask server
      console.log(response);
      const data = await response.json();
      setSeries(data.map((item: any) => ({
              date: item.Date,
              interest: item.Price // Assuming interest_rate is returned as a string
            })));
     
    } catch (error) {
      
      console.error('Failed to fetch predictions:', error);
    } finally{
      setLoading(false)
    }
  };


  
 
  const getDates = async()=>{
    try{
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/interest/dates`);
      if (!response.ok){
        throw new Error('Failed');
      } // Adjust this URL to match your Flask server
      const data = await response.json();
      setDates(data.map(date=> new Date(date).toISOString().split('T')[0]))
     
    } catch (error) {
      
      console.error('Failed to fetch predictions:', error);
    } finally{
      setLoading(false)
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

  // Fetch data on component mount or when dependencies change
  useEffect(() => {
    getHistory(periodMap[selectedPeriod]);
    console.log(periodMap[selectedPeriod])
    
  }, [selectedType, selectedPeriod, ]);
  useEffect(() => {
    getDates(); // This will run only on the first render
  }, []); 

 

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
            alignment == 'history' && <DropDown
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
            disabled={!isDisabled}
            resetKey={resetKey}
          
          />
          }
          {
            alignment === 'yield' &&    <DropDown
            menuName="Date"
            menuItems={dates}
            onSelectChange={handleDateChange}
            disabled={isDisabled}
            resetKey={resetKey}
          
          />
           
          }
         
        </Grid>
      </Grid>
      )
}
      {alignment === 'history' && selectedType && selectedPeriod && (
        <Grid container spacing={4} justifyContent="center" marginTop={1}>
          <Grid item xs={12} md={6}>
            <TimeSeriesChart
              series={series}
              title="Interest rates over time"
              type='datetime'
              xTitle="Date"
            />
          </Grid>
        </Grid>
      )}
      {
        alignment === 'yield' && selectedDate && (
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
    </>
  );
    };

export default History;
