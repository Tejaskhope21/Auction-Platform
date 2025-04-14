import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "./RevenueChart.css"; // Importing the CSS file

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RevenueChart = ({ data }) => {
  const chartData = months.map((month, i) => ({
    name: month,
    Revenue: data[i],
  }));

  return (
    <div className="revenue-chart-container">
      <h2 className="revenue-chart-title">Monthly Revenue</h2>
      <div className="revenue-chart">
        <BarChart width={700} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Revenue" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default RevenueChart;
