import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  series: ForecastObject[];
  title: string;
  type: 'category'|'datetime'
  xTitle: string

}

interface ForecastObject {
  date: string;
  interest: number;
}

const TimeSeriesChart = ({ series, title, type, xTitle }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  useEffect(() => {
    // Transform the series data into the required format for the chart
    const dates = series.map((item) => item.date);
    const interestRates = series.map((item) => item.interest); // Assuming interest_rate is an array with one value


    setCategories(dates); // Dates for x-axis
    setDataPoints(interestRates); // Interest rates for y-axis
  }, [series]);


  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      },
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
      type: type,
      categories: categories,
      title: {
        text: xTitle
      },
    },
    yaxis: {
      title: {
        text: 'Interest Rate (%)'
      },
      min:0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.4,
        stops: [0, 100]
      }
    },
    dataLabels:{
      enabled: false
    }
    
  };

  // const optionsnew: ApexOptions = {
  //   chart: {
  //     id: 'area-datetime',
  //     type: 'area',
  //     height: 350,
  //     zoom: {
  //       autoScaleYaxis: true
  //     }
  //   },
  //   annotations: {
  //     yaxis: [{
  //       y: 30,
  //       borderColor: '#999',
  //       label: {
  //         show: true,
  //         text: 'Support',
  //         style: {
  //           color: "#fff",
  //           background: '#00E396'
  //         }
  //       }
  //     }],
  //     xaxis: [{
  //       x: new Date('14 Nov 2012').getTime(),
  //       borderColor: '#999',
  //       yAxisIndex: 0,
  //       label: {
  //         show: true,
  //         text: 'Rally',
  //         style: {
  //           color: "#fff",
  //           background: '#775DD0'
  //         }
  //       }
  //     }]
  //   },
  //   dataLabels: {
  //     enabled: false
  //   },
  //   markers: {
  //     size: 0,
  //     style: 'hollow',
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //     min: new Date('01 Mar 2012').getTime(),
  //     tickAmount: 6,
  //   },
  //   tooltip: {
  //     x: {
  //       format: 'dd MMM yyyy'
  //     }
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       shadeIntensity: 1,
  //       opacityFrom: 0.7,
  //       opacityTo: 0.9,
  //       stops: [0, 100]
  //     }
  //   },
  // }
  



  
  return (
    <Paper sx={{ borderRadius: '8px', p: 2 }}>
      <Chart
        series={[
          {
            name: "Interest Rate",
            data: dataPoints, // Use the transformed interest rate data
          },
        ]}
        options={options}
        type="area"
        width="100%"
      />
    </Paper>
  );
};

export default TimeSeriesChart;
