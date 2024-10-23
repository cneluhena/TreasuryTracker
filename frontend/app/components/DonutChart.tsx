'use client'
import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const DChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const options = {
    series: [44, 55, 13, 33, 20],
    labels: ['3 Month', '6 Month', '12 month', '2 years', '5 years'],
    title: {
      text: 'Investments by period', // Chart title // Title alignment
      margin: 10, // Margin around the title
      offsetX: 0, // Horizontal offset
      offsetY: 0, // Vertical offset
      floating: false, // Whether the title is floating
      style: {
        fontSize: '20px', // Font size
        fontWeight: 'bold', // Font weight
        color: '#333' // Font color
      }
    }
  }


  const series = [45, 68, 65, 35];
  if (!isClient) {
    return null; // Render nothing on the server
  }


  return (
   
    <Box gridColumn="span 6"  display="flex" alignItems="center" justifyContent="center" padding={1}>
       <Paper  elevation={0} variant="outlined" sx={{width:"100%", height:"75%", p:2,borderRadius: '8px', display:"flex", justifyContent:"center"}}>
    
      <Chart
        series={options.series}
        options={options}
        type="donut"
        width="130%"
        
      />
    
    </Paper>
    </Box>

  );
};

export default DChart;
