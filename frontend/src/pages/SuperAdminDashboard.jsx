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
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Check if token is present
        if (!token) {
          setError("Authentication token is missing.");
          alert("Authentication token is missing.");
          return;
        }

        console.log("Token from localStorage:", token); // Debug the token

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        setLoading(true); // Set loading state to true before fetching data

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
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // Log the full error response to debug
        console.error(
          "Error fetching dashboard data:",
          error.response?.data || error.message
        );
        setError("Failed to load data. Please try again later.");
        setLoading(false); // Set loading to false even in case of error
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading data, please wait...</div>; // Loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <div className="dashboard-content">
      <h1>Super Admin Dashboard</h1>

      {/* Render charts and payment proofs only when data is available */}
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
