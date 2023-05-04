import React, { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import { UserContext } from "../state/User.module";
import { getData } from "../services/http";
import { Chart, registerables } from 'chart.js';
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Navigation } from "../components/Navigation/Navigation";
Chart.register(...registerables);
const WeeklySummary = () => {
  const { userId } = useContext(UserContext);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    console.log("User ID:", userId);
    const fetchWeeklySummary = async () => {
      const data = await getData(`http://localhost:4000/meals/weekly-summary`, {
        headers: { userid: userId },
      });
      console.log("Data from API:", data); 
      setWeeklyData(data);
    };

    fetchWeeklySummary();
  }, [userId]);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Calorie",
        data: weeklyData,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        ticks: {
          beginAtZero: true,
          //stepSize: 500, 
        },
      },
    },
  };

  return (
  <Box
    sx={{
      bgcolor: "background.defaultColor",
      p: 0,
      m: -1,
      height: "auto",
    }}
  >
    <div className="App">
      <Navigation />
      <Typography variant="h3" gutterBottom align="center" color="white">
      <h2>Weekly Calorie</h2>
      <Line data={chartData} options={chartOptions} />
      
     </Typography>
    
        </div>
    </Box>
  )
};

export default WeeklySummary;
