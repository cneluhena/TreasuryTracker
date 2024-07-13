"use client";
import { FormControl } from "@mui/base/FormControl";
import {
  Alert,
  Box,
  Button,
  Grid,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      const token = data.token;

      if (!token) {
        throw new Error("Login failed!");
      }

      localStorage.setItem("token", token);
      router.push("/home");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      setOpen(true);
      router.push('/login')
    }
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
          height: "60vh",
          width: "350px",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl>
          <TextField
            label="Username"
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            type="text"
            onChange={handleUsernameChange}
          />
          <TextField
            size="small"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          Sign-in
        </Button>
      </Paper>
      <Snackbar anchorOrigin = {{ vertical: 'bottom', horizontal: 'center' }} onClose={()=>{setOpen(false)}}open = {open} autoHideDuration={2000} >
        <Alert  variant="filled"  severity="error">
          Invalid Credentials!
        </Alert>
      </Snackbar>
    </Grid>
    
  );
};

export default LoginForm;
