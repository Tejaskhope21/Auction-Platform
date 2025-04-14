import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./UsersChart.css";

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

const UsersChart = ({ biddersArray, auctioneersArray }) => {
  const data = months.map((month, i) => ({
    name: month,
    Bidders: biddersArray[i],
    Auctioneers: auctioneersArray[i],
  }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">User Signups by Month</h2>
      <div className="chart-wrapper">
        <LineChart width={700} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Bidders" stroke="#8884d8" />
          <Line type="monotone" dataKey="Auctioneers" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default UsersChart;
