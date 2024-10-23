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
import { useState ,useEffect} from "react";
import DropDown from "../components/DropDown";
import ForecastTable from "../components/ForecastTable";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



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
  const [loading, setLoading] = useState(false);
  const [alignment, setAlignment] = useState('web');
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const billTimePeriods = ["3 months", "6 months", "12 months"];
  const bondTimePeriods = [
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "10 years",
  ];

  const [series, setSeries] = useState<ForecastObject[]>([]);
  
  // Function to fetch predictions from Flask API
  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_MODEL_URL+'/predict', {
        method: "POST",
        body: JSON.stringify({period: selectedPeriod})
      })
      if (!response.ok) {
        throw new Error('Failed to fetch predictions');

      }
      const data = await response.json()
      setSeries(data.map((item: any) => ({
        date: item.date,
        interest: parseFloat(item.interest).toFixed(3) // Assuming interest_rate is returned as a string
      })));
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally{
      setLoading(false);
    }
  };

  // Fetch data on component mount or when dependencies change
  useEffect(() => {
    fetchPredictions();
  }, [selectedType, selectedPeriod]); // Re-fetch if these props change

  const handleChange = (selectedValue: string) => {
    if (selectedValue === "Treasury Bills") {
      setPeriod(billTimePeriods);
      setSelectedType(selectedValue);
    } else if (selectedValue == "Treasury Bonds") {
      setPeriod(bondTimePeriods);
      setSelectedType(selectedValue);
    }
  };

  const handleDateChange = async(date: string)=>{
    try{
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/interest/yield?date=${date}`);
      const data = await response.json();
      setSeries(data.map(item=>({
        date:item.Period.toString(),
        interest: item.Price
      })))
      setSelectedDate(date);
      
    } catch(err){
      console.log(err)
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

  

  return (
    <>
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
          <DropDown
            menuName="Investment Type"
            menuItems={treasuryType}
            onSelectChange={handleChange}
            disabled={false}
            resetKey={resetKey}

          />
          <DropDown
            menuName="Period"
            menuItems={period}
            onSelectChange={handlePeriodChange}
            disabled={false}
            resetKey={resetKey}

          />
          <DropDown
            menuName="Date"
            menuItems={dates}
            onSelectChange={handleDateChange}
            disabled={isDisabled}
            resetKey={resetKey}
          
          />
        </Grid>
      </Grid>
      {selectedPeriod && selectedType && (loading ?   (
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

        ):
      (
        <Grid container spacing={5}  padding={5}>
          <Grid item xs={12} md={6} >
            <ForecastTable series={series}/>
          </Grid>
          <Grid item xs={12} md={6}>

            <TimeSeriesChart series={series} type='datetime' title="Predicted Interest Rates" xTitle="Time"/>

          </Grid>
        </Grid>
      ))}
      
    </>
  );
};

export default Forecast;
