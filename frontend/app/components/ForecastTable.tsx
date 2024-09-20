import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';


interface Props {
  series: ForecastObject[]
}

interface ForecastObject{
    date:string,
    interest:number
   
} 

interface series {
  [key: string]: ForecastObject[]; 
}
interface SingleSeries {
  name: string;
  data: ForecastObject;
}


interface TypeObject {
  [key: string]: ForecastObject[]; 
}

const ForecastTable = ({ series }: Props) => {
  
  // const [series, setSeries] = useState<ForecastObject[]>([]);
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
