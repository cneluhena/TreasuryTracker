import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';


interface Props {
  investmentType: string;
  period: string;
}

interface ForecastObject{
    date:string,
    interest:number
   
} 


interface SingleSeries {
  name: string;
  data: ForecastObject;
}


interface TypeObject {
  [key: string]: ForecastObject[]; 
}

const ForecastTable = ({ investmentType, period }: Props) => {
  const [series, setSeries] = useState<ForecastObject[]>([]);
  
  // Function to fetch predictions from Flask API
  const fetchPredictions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict'); // Adjust this URL to match your Flask server
      setSeries(response.data.map((item: any) => ({
        date: item.date,
        interest: parseFloat(item.interest_rate).toFixed(3) // Assuming interest_rate is returned as a string
      })));
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    }
  };

  // Fetch data on component mount or when dependencies change
  useEffect(() => {
    fetchPredictions();
  }, [investmentType, period]); // Re-fetch if these props change

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450,  overflow: {
          xs: 'auto',  // enable scrolling on small screens
          sm: 'auto' // disable scrolling on larger screens
        } }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Auction Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Interest Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {series?.map((row, index) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.interest}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>

  )
};

export default ForecastTable;
