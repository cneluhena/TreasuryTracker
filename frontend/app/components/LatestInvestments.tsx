'use client'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { TableFooter, TablePagination } from '@mui/material';



const BasicTable=()=> {
  
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };



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
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
        
            <TableCell align="right">Investment Name</TableCell>
            <TableCell align="right">Investment Amount</TableCell>
            <TableCell align="right">Invested Date</TableCell>
            <TableCell align="right">Maturity Dtae</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userInvestments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={'dfsdf'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.investmentName}
              </TableCell>
              <TableCell align="right">{row.investmentAmount}</TableCell>
              <TableCell align="right">{new Date(row.investmentDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">{new Date(row.maturityDate).toLocaleDateString()}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          component="div"
          count={userInvestments?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}  // Options for rows per page
      />
    </TableContainer>

    
    
  </>
  );
}

export default BasicTable;