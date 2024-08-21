'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddInvestmentDialog from "../components/AddInvestment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import StatCard from "../components/StatCard";
import { BarChart } from "@mui/icons-material";
import BChart from "../components/BarChart";

interface UserDetails {
    username: string,
}

const HomePage = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Fetch user details when component mounts
        fetchUserDetails();
    }, []); // State to store user details

    const fetchUserDetails = async () => {
        try {
            //const token = localStorage.getItem('token');
            // Send request to backend with token
            const response = await fetch('http://localhost:5000/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails(data); // Set user details in state
            } else {
                router.push('/login');
                throw new Error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:');
        }
    };

    return (
        <>
            <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            >
                <StatCard title={"This month investments"} value={"50, 000"} trend={"success"} comparison={"last month"}/>
                <StatCard title={"Total investments"} value={"100, 000"} trend={"error"} comparison={"last month"}/>
                <StatCard title={"Profit Last Year"} value={"60, 000"} trend={"success"} comparison={"last year"}/>

            <button onClick={()=>setOpen(true)}
        className="fixed top-0 right-0 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        type="button"
        >
        Add Investment
    </button>
    <AddInvestmentDialog open={open} onClose={()=>setOpen(false)}/>

            </Box>
            <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridTemplateRows = "auto" 
            gridAutoRows="140px"
            gap="20px"
            >
                <BChart/>
            
        
            </Box>
    

        </>
    );
}

export default HomePage;
