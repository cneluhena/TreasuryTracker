'use client'
import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props{
  investmentType: string, 
  period: string 
}

interface TypeObject {
  [key: string]: number[]; // The key is a string, and the value is an array of strings
}

interface SingleSeries{
  name: string, 
  data: number[]
}

const TimeSeriesChart = ({investmentType, period}:Props) => {
  // const [isClient, setIsClient] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedType, setSelectedType] = useState<TypeObject>({});
  const [series, setSeries] = useState<SingleSeries[]>([])
  const billSeries = 
  {
    "3 months": [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7], 
    "6 months": [2.0, 2.1, 2.1, 2.2, 2.3, 2.4, 2.5],
    "12 months": [1.9, 2.0, 2.0, 2.1, 2.1, 2.2, 2.3],
  }


const bondSeries = {
  "10 years":  [1.8, 1.9, 1.9, 2.0, 2.0, 2.1, 2.2]
}

  //this is used to accomadate the changes of dropdown lists
  useEffect(()=>{
    let selectedData: TypeObject={};
    console.log("This code is reachable");
    if (investmentType == 'Treasury Bills'){
      selectedData = billSeries;
      
    } else if (investmentType == 'Treasury Bonds'){
      selectedData = bondSeries;
    }
    setSeries([{name:period, data:selectedData[period]}]);
  }, [investmentType, period])
  
  
  const options = {
    chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
    title: {
      text: 'Interest Rates Over Time',
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2024-08-01',
        '2024-08-02',
        '2024-08-03',
        '2024-08-04',
        '2024-08-05',
        '2024-08-06',
        '2024-08-07',
      ],
    },
    yaxis: {
      title: {
        text: 'Interest Rate (%)'
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    // grid: {
    //   borderColor: '#e7e7e7',
    //   row: {
    //     colors: ['#f3f3f3', 'transparent'],
    //     opacity: 0.5,
    //   },
    // },
    
  };


  //const series = [
    // {
    //   name: '3 Month',
    //   data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
    // },
    // {
    //   name: '6 Month',
    //   data: [2.0, 2.1, 2.1, 2.2, 2.3, 2.4, 2.5],
    // },
    // {
    //   name: '12 Month',
    //   data: [1.9, 2.0, 2.0, 2.1, 2.1, 2.2, 2.3],
    // },
    // {
    //   name: '10 Year',
    //   data: [1.8, 1.9, 1.9, 2.0, 2.0, 2.1, 2.2],
    // },
  //   {
  //     name: investmentType,
  //     data: selectedType['3 months']
  //   }
  // ];

  // if (!isClient) {
  //   return null; // Render nothing on the server
  // }

  return (
    <Paper  sx={{borderRadius: '8px', p:2}}>
        <Chart
          series={series}
          options={options}
          type="line"
          width="100%"
        />
        </Paper>
    
    
  );
};

export default TimeSeriesChart;
