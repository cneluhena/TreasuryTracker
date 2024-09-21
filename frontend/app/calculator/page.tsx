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
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { request } from "https";
import { getCookie, setCookie } from "cookies-next";
import { get } from "http";

const SignupForm = () => {
  const [hasError, setHasError] = useState(false);



  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          minheight: isSmallScreen ? "550px" : "550px",
          width: "400px",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{
            fontFamily: "Arial, sans-serif", // Change to your desired font family
            fontSize: "24px", // Change to your desired font size
            fontWeight: "bold", // Change to your desired font weight
          }}
        >
          Calculator
        </Typography>
        <FormControl>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Investment Amount"
                size="small"
                fullWidth
                type="text"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Expected Value Date"
                size="small"
                fullWidth
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" fullWidth>
                Sign-up
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Paper>
    </Grid>
  );
};

export default SignupForm;
