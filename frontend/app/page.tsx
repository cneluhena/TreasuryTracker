'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box, Grid,createTheme, ThemeProvider  } from '@mui/material';
import { blue, blueGrey, red } from "@mui/material/colors";
import { useEffect } from "react";
import { motion } from 'framer-motion';



const theme = ({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: "#000000",
    },
  },
});

const Home=()=>{
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };
  return (

    <Box
    sx={{
      minHeight: '100vh',
      p:4,
      bgcolor: "#F5F5F7",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    }}
  >
    {/* Hero Section */}
    <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to TreasuryTracker
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Your one-stop solution for tracking and predicting Sri Lankan treasury bills and bonds.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={handleSignup}
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </motion.div>
    </Container>

    {/* Features Section */}

      
  </Box>
  )
}

export default Home;
