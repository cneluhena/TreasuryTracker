"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddInvestmentDialog from "../components/AddInvestment";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid, Paper, TablePagination } from "@mui/material";
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
  const [total, setTotal] = useState(0);
  const [activeTotal, setActiveTotal] = useState(0);


  useEffect(()=>{
       fetchDashboardDetails();
    
  }, [])

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
         // Set user details in state
      } else {
        router.push("/login");
        throw new Error("Failed to fetch user details");
      }
    } catch (error) {
      router.push("/login");
      console.error("Error fetching user details:", error);
    } 
  };

  const getTotalInvestments = async ()=>{
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/investment/total", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTotal(data);
      } else {
        router.push("/login");
        throw new Error("Failed to fetch total investments");
      }
    } catch (error) {
      router.push("/login");
      console.error("Error fetching total investments", error);
    } 
  }

  const getActiveInvestments = async ()=>{
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/investment/active", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setActiveTotal(data);
      } else {
        router.push("/login");
        throw new Error("Failed to active investments");
      }
    } catch (error) {
      router.push("/login");
      console.error("Error fetching investment details:", error);
    } 
  }

  const fetchDashboardDetails = async()=>{
    try{
      setLoading(true);
      await getTotalInvestments();
      await fetchUserDetails();
      await getActiveInvestments()
     
    } catch(error){
      throw new Error("Failed to fetch user details");
    } finally{
        setLoading(false);
    }
      
  }

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
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title={"This month investments"}
                value={"50,000"}
                trend={"success"}
                comparison={"last month"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title={"Total Investments"}
                value={total.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                trend={"error"}
                comparison={"last month"}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title={"Active Investments"}
                value={activeTotal.toLocaleString('en-US', { style: 'currency', currency: 'LKR' })}
                trend={"success"}
                comparison={"last year"}
              />
            </Grid>
          
          </Grid>

          <Grid container spacing={4} paddingTop={4}>
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
