'use client';
import { useRouter } from "next/navigation";
import { Container, Typography, Button, Box, Grid, createTheme, ThemeProvider, AppBar, Toolbar } from '@mui/material';
import { blueGrey } from "@mui/material/colors";
import { motion, useInView } from 'framer-motion';
import Trend from "./assets/Trend.jpg";
import { useRef } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: "#000000",
    },
  },
});

const Home = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  // Scroll Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Create a ref for the feature section to trigger animation when in view
  const featureRef1 = useRef(null);
  const featureRef2 = useRef(null);
  const featureRef3 = useRef(null);

  const isInView1 = useInView(featureRef1, { once: false });
  const isInView2 = useInView(featureRef2, { once: false});
  const isInView3 = useInView(featureRef3, { once: false});

  return (
    <ThemeProvider theme={theme}>
      {/* Navigation Bar */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TreasuryTracker
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={handleSignup}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url(${Trend.src})`, // Set the background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for darkness
            zIndex: 0,
          },
          pt: 8, // Add padding top to prevent content from being hidden behind the AppBar
        }}
      >
        {/* Content */}
        <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" color="white" component="h1" gutterBottom>
              Welcome to TreasuryTracker
            </Typography>
            <Typography variant="h5" color="white" paragraph>
              Your one-stop solution for tracking and predicting Sri Lankan treasury bills and bonds.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={handleSignup}
              >
                Get Started
              </Button>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <motion.div
              ref={featureRef1}
              initial="hidden"
              animate={isInView1 ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Box sx={{ bgcolor: blueGrey[900], p: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="white">
                  Track Investments
                </Typography>
                <Typography color="white" paragraph>
                  Easily monitor your treasury bills and bonds with real-time updates.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div
              ref={featureRef2}
              initial="hidden"
              animate={isInView2 ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Box sx={{ bgcolor: blueGrey[900], p: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="white">
                  Predict Future Rates
                </Typography>
                <Typography color="white" paragraph>
                  Utilize our predictive models to make informed investment decisions.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <motion.div
              ref={featureRef3}
              initial="hidden"
              animate={isInView3 ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <Box sx={{ bgcolor: blueGrey[900], p: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="white">
                  Get Notifications
                </Typography>
                <Typography color="white" paragraph>
                  Receive alerts for maturity dates and important updates.
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ mt: 8, p: 4, textAlign: 'center', bgcolor: blueGrey[800], color: 'white' }}>
        <Typography variant="h5">
          Ready to take control of your investments?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          sx={{ mt: 2 }}
        >
          Join Now
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
