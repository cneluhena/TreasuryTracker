"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddInvestmentDialog from "../components/AddInvestment";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, Paper } from "@mui/material";
import StatCard from "../components/StatCard";
import BChart from "../components/BarChart";
import DChart from "../components/DonutChart";
import BasicTable from "../components/LatestInvestments";
import Cookies from "js-cookie";

interface UserDetails {
  username: string;
}

const HomePage = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true); // Single state to handle both initial and data loading
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Simulate initial loading delay and fetch user details afterward

      fetchUserDetails();
 
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
         // Set user details in state
      } else {
        router.push("/login");
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      router.push("/login");
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false); // Ensure loading is false after fetch
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Grid container spacing={4}>
            <Grid item xs={6} sm={6} md={4}>
              <StatCard
                title={"This month investments"}
                value={"50,000"}
                trend={"success"}
                comparison={"last month"}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <StatCard
                title={"Total investments"}
                value={"100,000"}
                trend={"error"}
                comparison={"last month"}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <StatCard
                title={"Profit Last Year"}
                value={"60,000"}
                trend={"success"}
                comparison={"last year"}
              />
            </Grid>
            <AddInvestmentDialog open={open} onClose={() => setOpen(false)} />
          </Grid>

          <Grid container spacing={4} padding={4}>
            <Grid item xs={12} md={6}>
              <BChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <DChart />
            </Grid>
          </Grid>

          <Grid container spacing={4} padding={4}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  padding: 2,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <BasicTable />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default HomePage;
