'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box, Grid,createTheme, ThemeProvider  } from '@mui/material';
import { blueGrey } from "@mui/material/colors";
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
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
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
    <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Key Features
        </Typography>
      </motion.div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 4 }}>
              <Typography variant="h6" gutterBottom>
                Predict Future Interest Rates
              </Typography>
              <Typography>
                Use our advanced AI models to forecast interest rates and make informed investment decisions.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 4 }}>
              <Typography variant="h6" gutterBottom>
                Calculate Profits
              </Typography>
              <Typography>
                Easily calculate your returns and track your investments in government securities.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 4 }}>
              <Typography variant="h6" gutterBottom>
                Get Notifications
              </Typography>
              <Typography>
                Receive email notifications about your investment maturities and key market updates.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>

    {/* Call to Action */}
    <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to start managing your investments?
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up Now
        </Button>
      </motion.div>
    </Container>

    {/* Footer */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Box sx={{ backgroundColor: '#333', color: '#fff', p: 3, width: '100%', textAlign: 'center' }}>
        <Typography variant="body2">&copy; {new Date().getFullYear()} TreasuryTracker. All rights reserved.</Typography>
      </Box>
    </motion.div>
  </Box>
  )
}

export default Home;
