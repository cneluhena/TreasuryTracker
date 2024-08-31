'use client'
import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props{
  investmentType: string, 
  period: string, 
  title: string
}

interface TypeObject {
  [key: string]: number[]; // The key is a string, and the value is an array of strings
}

interface SingleSeries{
  name: string, 
  data: number[]
}

const TimeSeriesChart = ({investmentType, period, title}:Props) => {
  // const [isClient, setIsClient] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedType, setSelectedType] = useState<TypeObject>({});
  const [series, setSeries] = useState<SingleSeries[]>([])
  const billSeries = 
  {
    "3 months": [
    11.06, 9.92, 9.81, 11.39, 9.81, 10.44, 10.47, 10.88, 9.53, 10.78, 10.15, 11.37
  ], 
    "6 months": [
      2.0, 2.1, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 
      2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 
      3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 
      4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 
      5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8
    ],
    "12 months": [
      1.9, 2.0, 2.0, 2.1, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 
      2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 
      3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 
      4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 
      5.7, 5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
    ]
  }


const bondSeries = {
  "10 years":  [1.8, 1.9, 1.9, 2.0, 2.0, 2.1, 2.2]
}

  //this is used to accomadate the changes of dropdown lists
  useEffect(()=>{
    let selectedData: TypeObject={};
    
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
      text: title,
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
    "2024/08/29", "2024/09/05", "2024/09/12", "2024/09/19", "2024/09/26", "2024/10/03",
    "2024/10/10", "2024/10/17", "2024/10/24", "2024/10/31", "2024/11/07", "2024/11/14"
  ]
    },
    yaxis: {
      title: {
        text: 'Interest Rate (%)'
      },
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
  
    
  };



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
