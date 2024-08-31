import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

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
  const billSeries = {
    "3 months": [
    {"date": "2024/08/29", "interest": 11.06},
    {"date": "2024/09/05", "interest": 9.92},
    {"date": "2024/09/12", "interest": 9.81},
    {"date": "2024/09/19", "interest": 11.39},
    {"date": "2024/09/26", "interest": 9.81},
    {"date": "2024/10/03", "interest": 10.44},
    {"date": "2024/10/10", "interest": 10.47},
    {"date": "2024/10/17", "interest": 10.88},
    {"date": "2024/10/24", "interest": 9.53},
    {"date": "2024/10/31", "interest": 10.78},
    {"date": "2024/11/07", "interest": 10.15},
    {"date": "2024/11/14", "interest": 11.37}
  ],
    "6 months": [{date: "2024/08/14", interest: 0.75}, {date: "2024/08/16", interest: 0.9}],
    "12 months": [{date: "2024/08/14", interest: 0.9}, {date: "2024/08/14", interest: 0.95}]
  };

  const bondSeries = {
    "10 years":  [{date: "2024/08/14", interest: 0.9}, {date: "2024/08/14", interest: 0.95}]
  };

  //this is used to accomadate the changes of dropdown lists
  useEffect(() => {
    let selectedData: TypeObject = {};

    if (investmentType == "Treasury Bills") {
      selectedData = billSeries;
    } else if (investmentType == "Treasury Bonds") {
      selectedData = bondSeries;
    }
    setSeries(selectedData[period]);
  }, [investmentType, period]);

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
