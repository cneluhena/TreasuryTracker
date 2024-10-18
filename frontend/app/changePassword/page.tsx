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
import { ChangeEvent, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

import Cookies from 'js-cookie';
import Link from "next/link";
import AlertDialog from "../components/DialogBox";

const ResetForm = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      setOpenDialog(true);
      setLoad(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ userId: userId, token: token, password: password })
      });
      if (response.ok) {
        console.log("Password Changed Successfully");
        setLoad(false);
      }
    } catch (error) {
      setErrorMessage("Server Error");
      setOpen(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    router.push('/login');
  };

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
        <Typography variant="h6" component="div" sx={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold' }}>
          Reset Password
        </Typography>
      
        <FormControl>
          <Grid container spacing={3} justifyContent={'center'}>
            <Grid item xs={12} sm={12} paddingBottom={0}>
              <Typography sx={{ fontSize: '15px', paddingTop: '3px' }}>
                Enter your new password
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ paddingTop: '0' }}>
              <TextField
                label="New Password"
                size="small"
                fullWidth
                value={password}
                type="text"
                onChange={handlePasswordChange}
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

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setOpen(false)} open={open} autoHideDuration={2000}>
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <AlertDialog open={openDialog} handleClickOpen={() => setOpenDialog(true)} handleClose={handleDialogClose} loading={load} text="Password has been changed"></AlertDialog>
    </Grid>
  );
};

export default function ResetFormWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetForm />
    </Suspense>
  );
}
