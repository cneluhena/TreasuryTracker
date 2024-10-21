"use client";

import FormControl from "@mui/material/FormControl"

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);

  const [firstError, setFirstError] = useState(false);
  const [lastError, setLastError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage]  = useState("");

  const [firstErrorText, setFirstErrorText] = useState("");
  const [lastErrorText, setlastErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [userErrorText, setUserErrorText] = useState("");
  const [passErrorText, setPassErrorText] = useState("");
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [hasServerError, setHasServerError] = useState(false);


  const [hasError, setHasError] = useState(false);

  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valueMissing) {
      setUserError(false);
      setUsername(event.target.value);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 8) {
      setPassError(true);
      setPassErrorText("Password must at least 8 characters long");
    } else {
      setPassError(false);
    }
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valueMissing) {
      setFirstError(false);
      setFirstName(event.target.value);
    }
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valueMissing) {
      setLastError(false);
      setLastName(event.target.value);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.validity.valueMissing) {
      setEmailError(false);
      setEmail(event.target.value);
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isNumber = /^\d*$/.test(value); // Regular expression to check if the input contains only numbers
    setPhoneNumber(value);
    if (!(isNumber && value.length == 10)) {
      setPhoneError(true);
      setPhoneErrorText("Enter a valid phone number");
    } else {
      setPhoneError(false);
    }
  };

  const validate = () => {
    if (firstName === "") {
      setFirstErrorText("First Name is required");
      setFirstError(true);
      setHasError(true);
    } else {
      setFirstError(false);
    }

    if (lastName === "") {
      setlastErrorText("Last Name is required");
      setLastError(true);
      setHasError(true);
    } else {
      setLastError(false);
    }

    if (email === "") {
      setEmailErrorText("Email is required");
      setEmailError(true);
      setHasError(true);
    } else {
      setEmailError(false);
    }

    if (phoneNumber === "") {
      setPhoneError(true);
      setPhoneErrorText("Phone Number is required");
      setHasError(true);
    }

    if (username === "") {
      setUserErrorText("Username is required");
      setUserError(true);
      setHasError(true);
    } else {
      setUserError(false);
    }

    if (password === "") {
      setPassErrorText("Password is required");
      setPassError(true);
      setHasError(true);
    }
    return hasError;
  };

  const handleSignUp = async () => {
    validate();
    if (hasError) {
      return;
    } else {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
          }),
        });

        if (response.status === 409) {
          const data = await response.text();
          if (data === "Username already exists") {
            setAlreadyExists(true);
            setAlertMessage(
              "Username already exists. Try a different username"
            );
            throw new Error("Username already exists");
          } else if (data == "Email already exists") {
            setAlreadyExists(true);
            setAlertMessage("Email already exists. Try a different email");
            throw new Error("Email already exists");
          }
        }
        if (!response.ok) {
          throw new Error("Error in registration");
        }
        router.push("/login");
      } catch (error: any) {
        if (error.message === 'Failed to fetch'){
          setHasServerError(true);
          setServerErrorMessage("Server Error")
        }
        setOpen(true);
      }
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", background:"#F5F5F7" }}
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
          Signup
        </Typography>
        <FormControl>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="First Name"
                size="small"
                fullWidth
                error={firstError}
                helperText={firstError ? firstErrorText : ""}
                value={firstName}
                type="text"
                onChange={handleFirstNameChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Last Name"
                size="small"
                fullWidth
                error={lastError}
                helperText={lastError ? lastErrorText : ""}
                value={lastName}
                type="text"
                onChange={handleLastNameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                size="small"
                fullWidth
                error={emailError}
                helperText={emailError ? emailErrorText : ""}
                value-={email}
                type="text"
                onChange={handleEmailChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Phone Number"
                size="small"
                fullWidth
                error={phoneError}
                helperText={phoneError ? phoneErrorText : ""}
                value={phoneNumber}
                type="text"
                onChange={handlePhoneChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Username"
                size="small"
                fullWidth
                error={userError}
                helperText={userError ? userErrorText : ""}
                value={username}
                type="text"
                onChange={handleUsernameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                label="Password"
                type="password"
                fullWidth
                error={passError}
                helperText={passError ? passErrorText : ""}
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button variant="contained" fullWidth onClick={handleSignUp}>
                Sign-up
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setHasError(false);
        }}
        open={hasError}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          Fill all the fields
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setAlreadyExists(false);
        }}
        open={alreadyExists}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setHasServerError(false);
        }}
        open={hasServerError}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="error">
          {serverErrorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignupForm;
