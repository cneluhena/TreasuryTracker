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
    <Box gridColumn="span 6" display="flex" alignItems="center" justifyContent="center" padding={1} >
      
                <Paper  sx={{width:"100%", height:"100%", p:2,borderRadius: '8px',display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center'}}>

    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="600"
          />
        </div>
      </div>
    </div>
    </Paper>
    </Box>
  );
}
};

export default BChart;