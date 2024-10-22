"use client";

import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Typography, Alert } from "@mui/material";
import TimeSeriesChart from "../components/TimeSeriesChart";
import DropDown from "../components/DropDown";
import ForecastTable from "../components/ForecastTable";

interface ForecastObject {
  date: string;
  interest: number;
}

const Forecast = () => {
  const [period, setPeriod] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const treasuryType = ["Treasury Bills", "Treasury Bonds"];
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const billTimePeriods = ["3-Month", "6-Month", "1-Year"];
  const bondTimePeriods = ["2-Year", "3-Year", "5-Year", "10-Year", "30-Year"];

  const [series, setSeries] = useState<ForecastObject[]>([]);

  const fetchPredictions = async () => {
    if (!selectedPeriod) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interest/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ period: selectedPeriod }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }

      const data = await response.json();
      setSeries(
        data.map((item: any) => ({
          date: item.date,
          interest: parseFloat(item.interest).toFixed(3),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
      setError("Failed to fetch predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchPredictions();
    }
  }, [selectedPeriod]);

  const handleChange = (selectedValue: string) => {
    if (selectedValue === "Treasury Bills") {
      setPeriod(billTimePeriods);
      setSelectedType(selectedValue);
    } else if (selectedValue === "Treasury Bonds") {
      setPeriod(bondTimePeriods);
      setSelectedType(selectedValue);
    }
    setSelectedPeriod("");
  };

  const handlePeriodChange = (selectedValue: string) => {
    setSelectedPeriod(selectedValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} container justifyContent="center">
          <DropDown
            menuName="Investment Type"
            menuItems={treasuryType}
            onSelectChange={handleChange}
          />
          <DropDown
            menuName="Period"
            menuItems={period}
            onSelectChange={handlePeriodChange}
          />
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {selectedPeriod &&
        selectedType &&
        (loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "75vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={5} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <ForecastTable series={series} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TimeSeriesChart
                series={series}
                title={`Predicted Interest Rates for ${selectedPeriod} ${selectedType}`}
              />
            </Grid>
          </Grid>
        ))}
    </Box>
  );
};

export default Forecast;
