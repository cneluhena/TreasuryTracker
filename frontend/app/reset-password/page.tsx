"use client";
import FormControl from "@mui/material/FormControl";
import {
  Alert,
  Box,
  Button,
  Grid,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertDialog from "../components/DialogBox";
import { ScreenLockLandscapeRounded } from "@mui/icons-material";



const ResetForm = () => {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };


  const handleResetPassword = async () => {
    try {
      if (email == ''){
        setErrorMessage("Provide an Email")
        setOpen(true);
      } else{
        setOpenDialog(true);
        setLoad(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/password/resetReq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"    
        },
        credentials: "include",
        body: JSON.stringify({ email: email})
      });
      
      if (!response.ok) {
        if (response.status == 404){
          setOpenDialog(false);
          setErrorMessage("Invalid Email Address");
          setOpen(true);
        
          
        }
      } else{
        setLoad(false);
        
      }
    }


    } catch(error){
        setErrorMessage("Server Error");
        setOpen(true);
    } 
    
  };

  const handleDialogClose = ()=>{
      setOpenDialog(false);
      router.push('/login');
  }
  
  return (
  
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: isSmallScreen ? "320px" : "350px",
          width: "380px",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" gutterBottom  sx={{ 
            fontFamily: 'Arial, sans-serif', // Change to your desired font family
            fontSize: '24px', // Change to your desired font size
            fontWeight: 'bold'
           
          // Change to your desired font weight
          }}>
          Forgot Your Password?
        </Typography>
        <Typography
        sx={{fontSize:'15px', paddingTop:'12px', paddingBottom:'12px', textAlign:"center"}}>
            Please enter your email address to get the password reset information
        </Typography>
        <FormControl>
        <Grid container spacing={3} justifyContent={'center'}>

        <Grid item xs={12} sm={12}>
          <TextField
            label="Email Address"
            size="small"
            fullWidth
            value={email}
            type="text"
            onChange={handleEmailChange}
            required
          />
          </Grid>

            <Grid item xs={12} sm={12}>
            <Button variant="contained" fullWidth onClick={handleResetPassword}>
          Reset Password
        </Button>
      
        
          </Grid>
          </Grid>
        
        </FormControl>
     
      </Paper>
      <Snackbar anchorOrigin = {{ vertical: 'bottom', horizontal: 'center' }} onClose={()=>{setOpen(false)}}open = {open} autoHideDuration={2000} >
        <Alert  variant="filled"  severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <AlertDialog open={openDialog} handleClickOpen={()=>setOpenDialog(true)} handleClose={handleDialogClose} loading = {load} text="Password Reset Link has been sent to the Email. Go through the link and reset your password"></AlertDialog>
    </Grid>
    
  );
};

export default ResetForm;
