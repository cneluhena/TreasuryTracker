'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const CustomizedTables = ()=> {
    interface UserInvestment{
        _id: string,
        investmentName: string,
        investmentType: string, 
        investmentAmount: string,
        maturityPeriod: number,
        expectedReturn: number,
        investmentDate: string,
        maturityDate: string,
        interestRate: number
    
    }
    
    const [userInvestments, setUserInvestments] = useState<UserInvestment[]|null>(null);
    const [error, setError] = useState('');
    const getUserInvestments = async () => {
      try {
        const response = await fetch("http://localhost:5000/investment/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch investments');
        }
    
        const data: UserInvestment[] = await response.json();
        setUserInvestments(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(()=>{
        getUserInvestments();
    }, [])
    
    if (error){
      return <p>Error Occured</p>
    }
  return (


    <TableContainer component={Paper}sx={{padding:5}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Investment Name</StyledTableCell>
            <StyledTableCell align="right">Investment Type</StyledTableCell>
            <StyledTableCell align="right">Investment Amount</StyledTableCell>
            <StyledTableCell align="right">Maturity Period</StyledTableCell>
            <StyledTableCell align="right">Expected Return</StyledTableCell>
            <StyledTableCell align="right">Interest Rate</StyledTableCell>
            <StyledTableCell align="right">Investment Date</StyledTableCell>
            <StyledTableCell align="right">Maturity Date</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
           
          {userInvestments?.map((investment) => (
            <StyledTableRow key={investment._id}>
              <StyledTableCell component="th" scope="row">
                {investment.investmentName}
              </StyledTableCell>
              <StyledTableCell align="right">{investment.investmentType}</StyledTableCell>
              <StyledTableCell align="right">{investment.investmentAmount}</StyledTableCell>
              <StyledTableCell align="right">{investment.maturityPeriod}</StyledTableCell>
              <StyledTableCell align="right">{investment.expectedReturn}</StyledTableCell>
              <StyledTableCell align="right">{investment.interestRate}</StyledTableCell>
              <StyledTableCell align="right">{new Date(investment.investmentDate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{new Date(investment.maturityDate).toLocaleDateString()}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;