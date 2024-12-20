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
import Cookies from 'js-cookie';
import Link from "next/link";
import Theme from "@/app/assets/theme";


const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [loadPage, setLoadPage] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        Cookies.set('name', data.firstName +' ' + data.lastName); // Set user details in state
      } else {
        router.push("/login");
        throw new Error("Failed to fetch user details"); 
      }
    } catch (error) {
      router.push("/login");
      console.error("Error fetching user details:");
    } 
  };

  



  const handleSignIn = async () => {
    try {
      setLoadPage(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"    
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password })
      });

      
      
      if (!response.ok) {
        console.log(response);
        if (response.status == 404){
          setErrorMessage("Invalid Username or Password");
          setOpen(true);
        }
        throw new Error("Invalid username or password");
      } else{
      
        fetchUserDetails().then(()=>{
          setLoadPage(false);
          router.push('/home')
        });
      }
      
    

      //const data = await response.json();
      //const token = data.token;
      //  if (!token) {
      //   throw new Error("Login failed!");
      // }
      
      

  
    } catch (error: any) {
      if (error.message === 'Failed to fetch'){
        setErrorMessage("Server Error")
      }
      // console.error(error.message);
      setOpen(true);
      router.push('/login')
    } finally{
      setLoadPage(false);
    }
  };

  //checking whether there is a cookie in the browser
  const checkCookieExists = async() => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"    
        },
        credentials: "include"
      });

      if (response.ok){
        router.push('/home');
      }
  };


  useEffect(()=>{
      checkCookieExists()
  }, [])

  
  return (
  
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", background:"#F5F5F7"}}
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
        <Typography variant="h5" component="div" gutterBottom  sx={{ 
            fontFamily: 'Arial, sans-serif', // Change to your desired font family
            fontSize: '24px', // Change to your desired font size
            fontWeight: 'bold', paddingBottom: 2
           
          // Change to your desired font weight
          }}>
          Login
        </Typography>
        <FormControl>
        <Grid container spacing={3} justifyContent={'center'}>

        <Grid item xs={12} sm={12}>
          <TextField
            label="Username"
            size="small"
            fullWidth
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
            value={password}
            onChange={handlePasswordChange}
          />
          </Grid>
         
            <Grid item xs={12} sm={12}>
            <Button variant="contained" fullWidth onClick={handleSignIn}>
          Login
        </Button>
     <Typography component="span" sx={{fontWeight: 'bold', fontSize: 13, display: "block", textAlign: "right", paddingTop: 1}}> <Link href="/reset-password">Forget Password</Link></Typography>
           

      <Typography sx={{fontSize: 15, paddingTop: 2}}>Don&apos;t have an account? <Link href="/signup"><Typography component="span" sx={{fontWeight: 'bold', fontSize: 15}}>Sign Up</Typography></Link></Typography>
        
          </Grid>
          </Grid>
        
        </FormControl>
     
      </Paper>
      <Snackbar anchorOrigin = {{ vertical: 'bottom', horizontal: 'center' }} onClose={()=>{setOpen(false)}}open = {open} autoHideDuration={2000} >
        <Alert  variant="filled"  severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
    
  );
};

export default SignupForm;
