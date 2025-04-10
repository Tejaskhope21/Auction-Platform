import React, { useState, useEffect } from "react";
import axios from "axios";
import PaymentProofs from "./PaymentProofs";
import AuctionManager from "./AuctionManager";
import UserStats from "./UserStats";
import RevenueDisplay from "./RevenueDisplay";

const SuperAdminDashboard = () => {
  const [paymentProofs, setPaymentProofs] = useState([]);
  const [usersData, setUsersData] = useState({
    biddersArray: [],
    auctioneersArray: [],
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  // Update BASE_URL to match your backend
  const BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Add this since your backend uses credentials with CORS
  };

  const fetchPaymentProofs = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/superadmin/paymentproofs/getall`,
        config
      );
      setPaymentProofs(response.data.paymentProofs);
    } catch (error) {
      console.error("Error fetching payment proofs:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/superadmin/users/getall`,
        config
      );
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMonthlyRevenue = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/superadmin/monthlyincome`,
        config
      );
      setMonthlyRevenue(response.data.totalMonthlyRevenue);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  useEffect(() => {
    fetchPaymentProofs();
    fetchUsers();
    fetchMonthlyRevenue();
  }, []);

  return (
    <div className="dashboard">
      <h1>Super Admin Dashboard</h1>
      <PaymentProofs
        paymentProofs={paymentProofs}
        fetchPaymentProofs={fetchPaymentProofs}
        baseUrl={BASE_URL}
        config={config}
      />
      <AuctionManager baseUrl={BASE_URL} config={config} />
      <UserStats usersData={usersData} />
      <RevenueDisplay monthlyRevenue={monthlyRevenue} />
    </div>
  );
};

export default SuperAdminDashboard;
