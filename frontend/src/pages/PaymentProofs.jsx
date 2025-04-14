import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentProofs.css"; // Your CSS file

const PaymentProofs = ({ proofs }) => {
  const [usernames, setUsernames] = useState({});
  const [statusAndAmount, setStatusAndAmount] = useState({});
  const [selectedProof, setSelectedProof] = useState(null);

  // Helper to include the auth token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch usernames
  useEffect(() => {
    const fetchUsernames = async () => {
      const userNamesObj = {};

      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/admin/users/getall`,
          getAuthHeaders()
        );

        const users = response.data; // assuming array of users
        for (const proof of proofs) {
          const user = users.find((user) => user._id === proof.userId);
          userNamesObj[proof.userId] = user ? user.username : "Unknown";
        }

        setUsernames(userNamesObj);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    if (proofs && proofs.length > 0) {
      fetchUsernames();
    }
  }, [proofs]);

  // Update payment proof status/amount
  const updateProofStatus = async (id, newStatus, newAmount) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/admin/paymentproof/status/update/${id}`,
        { status: newStatus, amount: newAmount },
        getAuthHeaders()
      );
      console.log(response.data.message);
      alert("Payment proof updated successfully!");
    } catch (error) {
      console.error(
        "Error updating proof:",
        error.response?.data || error.message
      );
      alert("Error updating proof.");
    }
  };

  // Delete payment proof
  const deletePaymentProof = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/admin/paymentproof/delete/${id}`,
        getAuthHeaders()
      );
      console.log(response.data.message);
      alert("Payment proof deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting proof:",
        error.response?.data || error.message
      );
      alert("Error deleting proof.");
    }
  };

  // Fetch individual proof details
  const viewProofDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin/paymentproof/${id}`,
        getAuthHeaders()
      );
      setSelectedProof(response.data.paymentProof); // backend returns { paymentProof: {...} }
    } catch (error) {
      console.error(
        "Error fetching proof details:",
        error.response?.data || error.message
      );
      alert("Failed to load payment proof details.");
    }
  };

  // Handle form changes
  const handleChange = (id, field, value) => {
    setStatusAndAmount((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div className="payment-proof-container">
      <h2 className="payment-proof-title">Payment Proofs</h2>
      <ul className="payment-proof-list">
        {proofs.map((proof) => (
          <li key={proof._id} className="payment-proof-item">
            <span className="user-info">User ID: {proof.userId}</span>
            <span className="username">
              Username: {usernames[proof.userId] || "Loading..."}
            </span>
            <span className="amount">Amount: {proof.amount}</span>
            <span className="status">Status: {proof.status}</span>

            <div className="update-controls">
              <input
                type="text"
                value={statusAndAmount[proof._id]?.amount || ""}
                placeholder="Amount"
                onChange={(e) =>
                  handleChange(proof._id, "amount", e.target.value)
                }
              />
              <select
                value={statusAndAmount[proof._id]?.status || ""}
                onChange={(e) =>
                  handleChange(proof._id, "status", e.target.value)
                }
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() =>
                  updateProofStatus(
                    proof._id,
                    statusAndAmount[proof._id]?.status || proof.status,
                    statusAndAmount[proof._id]?.amount || proof.amount
                  )
                }
              >
                Update
              </button>
              <button onClick={() => deletePaymentProof(proof._id)}>
                Delete
              </button>
              <button onClick={() => viewProofDetails(proof._id)}>
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Details view */}
      {selectedProof && (
        <div className="proof-details">
          <h3>Payment Proof Details</h3>
          <p>
            <strong>ID:</strong> {selectedProof._id}
          </p>
          <p>
            <strong>User ID:</strong> {selectedProof.userId}
          </p>
          <p>
            <strong>Amount:</strong> {selectedProof.amount}
          </p>
          <p>
            <strong>Status:</strong> {selectedProof.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedProof.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(selectedProof.updatedAt).toLocaleString()}
          </p>
          <button onClick={() => setSelectedProof(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PaymentProofs;
