import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  series: ForecastObject[];
  title: string;
}

interface ForecastObject {
  date: string;
  interest: number;
}

const TimeSeriesChart = ({ series, title }: Props) => {
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
      type: "line",
      stacked: false,
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
      type: 'datetime',
      categories: categories, // Use the transformed date categories
    },
    yaxis: {
      title: {
        text: 'Interest Rate (%)'
      },
      min:0,
    },
    stroke: {
      curve: 'straight',
      width: 4,
    },
  };

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
        type="line"
        width="100%"
      />
    </Paper>
  );
};

export default TimeSeriesChart;
