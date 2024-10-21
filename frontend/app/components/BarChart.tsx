'use client'
import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';


import dynamic from 'next/dynamic';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [options] = useState({
    
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false // Disables the toolbar (which includes the download icon)
      }
      
    },
    title: {
      text: 'Monthly Profit in last year', // Chart title // Title alignment
      margin: 10, // Margin around the title
      offsetX: 0, // Horizontal offset
      offsetY: 0, // Vertical offset
      floating: false, // Whether the title is floating
      style: {
        fontSize: '20px', // Font size
        fontWeight: 'bold', // Font weight
        color: '#333' // Font color
      }
    },    
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  });

  const [series] = useState([
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 100, 140, 15, 12]
    }
  ]);
  if (!isClient) {
    return null; // Render nothing on the server
  }

  if (typeof window !=="undefined"){
  return (

      
  <Paper  elevation={0} variant="outlined" sx={{width:"100%", height:"100%",p:2, borderRadius: '8px',display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center'}}>

          <Box sx={{ width: '100%',  height: {
              xs: '300px', // height for small screens (mobile)
              sm: '400px', // height for tablets
              md: '400px', // height for medium screens (desktop)
              lg: '500px', // height for large screens
            },}}>
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="100%"
          />
          </Box>
       
    </Paper>
  
  );
}
};

export default BChart;