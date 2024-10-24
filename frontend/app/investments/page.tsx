"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import AddInvestmentDialog from "../components/AddInvestment";
import { Alert, Box, Button, CircularProgress, Grid, IconButton, Snackbar, TablePagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from "../components/DeleteDialog";
import { blueGrey, blue } from "@mui/material/colors";
import UpdateInvestmentDialog from "../components/UpdateInvestment";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blueGrey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
interface UserInvestment {
  _id: string;
  investmentName: string;
  investmentType: string;
  investmentAmount: string;
  maturityPeriod: number;
  expectedReturn: number;
  investmentDate: string;
  maturityDate: string;
  interestRate: number;
}
const CustomizedTables = () => {
  

  const [userInvestments, setUserInvestments] = useState<
    UserInvestment[] | null
  >(null);
  const [error, setError] = useState("");
  const[isError,  setIsError] = useState<boolean|undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const[editInvestment, setEditInvestment] = useState<any>(null);
  const [delInvestmentId, setDelInvestmentId] = useState('');
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [updateInvestId, setUpdateInvsetId] = useState('');
   const [editOpen, setEditOpen] = useState(false);
   const [message, setMessage] = useState('');
   const [editInvestmentId, setEditInvestmentId] = useState('');
  
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    
  
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleDelete = (invesetmentId: string)=>{
      setOpenDelete(true);
      setDelInvestmentId(invesetmentId);
    }

    const handleDeleteDialogClose = ()=>{
      setOpenDelete(false);
    }

    const handleEdit = async(investmentId: string)=>{
      const data = await getUserInvestment(investmentId);
      console.log(data);
      setEditInvestment(data);
      setUpdateInvsetId(investmentId);
      setEditOpen(true);
    }

    const handleUpdate = (message:string)=>{
      setMessage(message);
    }

    const getUserInvestment = async(id:string)=>{
      try {
        //setLoading(true);
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/investment/getInvestment?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch investments");
        }
  
        const data = await response.json();
        return data[0];
     
  
      } catch (error) {
        console.error(error);
  
    } finally{
      setLoading(false);
    }
  }
    


  const getUserInvestments = async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/investment/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch investments");
      }

      const data: UserInvestment[] = await response.json();
      setUserInvestments(data);
      return data;


    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulAdd = (message: string)=>{
    setMessage(message);
  }

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditOpen(false);
  };

  const hasError = (value:boolean)=>{
    setIsError(value);
  }

  

  useEffect(() => {
    getUserInvestments();
  }, []);



  if (error) {
    return <p>Error Occured</p>;
  }
  return (
    <>
     <Grid container justifyContent="flex-end">
            <Grid item paddingBottom={3}>
            <Button variant="contained" onClick={handleButtonClick}>
        Add Investment
      </Button>

           
            </Grid>
      </Grid>

     
      <AddInvestmentDialog
        open={open}
        onClose={handleDialogClose}
        refreshPage={getUserInvestments}
        errorHandle={hasError}
        handleMessage={handleSuccessfulAdd}
      
      />

      {editOpen &&<UpdateInvestmentDialog open={editOpen} onClose={handleDialogClose} editInvestment={editInvestment} refreshPage={getUserInvestments} errorHandle={hasError} investmentId={updateInvestId} updateMessage={handleUpdate}/>}

      <DeleteDialog open={openDelete} handleClose={handleDeleteDialogClose} investmentId = {delInvestmentId} refreshPage={getUserInvestments}/>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setIsError(undefined)} open={isError !== undefined} autoHideDuration={2000}>
        <Alert variant="filled" severity={isError? "error" :"success"}>
          {isError ? " Investment Adding failed!" : message}
        </Alert>
      </Snackbar>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:'75vh'

          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" >
            <TableHead>
              <TableRow>
                <StyledTableCell>Investment Name</StyledTableCell>
                <StyledTableCell align="right">Investment Type</StyledTableCell>
                <StyledTableCell align="right">
                  Investment Amount
                </StyledTableCell>
                <StyledTableCell align="right">Maturity Period</StyledTableCell>
                <StyledTableCell align="right">Expected Return</StyledTableCell>
                <StyledTableCell align="right">Interest Rate</StyledTableCell>
                <StyledTableCell align="right">Investment Date</StyledTableCell>
                <StyledTableCell align="right">Maturity Date</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userInvestments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((investment) => (
                <StyledTableRow key={investment._id}>
                  <StyledTableCell component="th" scope="row">
                    {investment.investmentName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {investment.investmentType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {investment.investmentAmount}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {investment.maturityPeriod}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {investment.expectedReturn}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {investment.interestRate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(investment.investmentDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {new Date(investment.maturityDate).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton onClick={()=>handleEdit(investment._id)}>
                    <EditIcon/>
                    </IconButton>
                    <IconButton onClick={()=>handleDelete(investment._id)}>
                    <DeleteIcon htmlColor="red"/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                
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
        
      )}
    </>
  );
};

export default CustomizedTables;
