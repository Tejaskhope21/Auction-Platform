import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SuperAdminDashboard.css";
import PaymentProofs from "./PaymentProofs";
import UsersChart from "./UsersChart";
import RevenueChart from "./RevenueChart";

const SuperAdminDashboard = () => {
  const [paymentProofs, setPaymentProofs] = useState([]);
  const [biddersArray, setBiddersArray] = useState([]);
  const [auctioneersArray, setAuctioneersArray] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Check if token is present
        if (!token) {
          console.error("Authentication token is missing.");
          alert("Authentication token is missing.");
          return;
        }

        console.log("Token from localStorage:", token); // Debug the token

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch data using Promise.all
        const [proofRes, usersRes, revenueRes] = await Promise.all([
          axios.get(
            "http://localhost:5000/api/v1/admin/paymentproofs/getall",
            config
          ),
          axios.get("http://localhost:5000/api/v1/admin/users/getall", config),
          axios.get("http://localhost:5000/api/v1/admin/monthlyincome", config),
        ]);

        // Ensure the backend response structure is as expected
        console.log("Payment Proofs Response:", proofRes.data);
        console.log("Users Response:", usersRes.data);
        console.log("Revenue Response:", revenueRes.data);

        setPaymentProofs(proofRes.data.paymentProofs);
        setBiddersArray(usersRes.data.biddersArray);
        setAuctioneersArray(usersRes.data.auctioneersArray);
        setRevenue(revenueRes.data.totalMonthlyRevenue);
      } catch (error) {
        // Log the full error response to debug
        console.error(
          "Error fetching dashboard data:",
          error.response?.data || error.message
        );
        alert("Failed to load data. Please try again later.");
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-content">
      <h1>Super Admin Dashboard</h1>
      <UsersChart
        biddersArray={biddersArray}
        auctioneersArray={auctioneersArray}
      />
      <RevenueChart data={revenue} />
      <PaymentProofs proofs={paymentProofs} />
    </div>
  );
};

export default SuperAdminDashboard;
