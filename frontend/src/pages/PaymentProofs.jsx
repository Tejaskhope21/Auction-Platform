import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentProofs.css";

const PaymentProofs = ({ proofs }) => {
  const [usernames, setUsernames] = useState({});
  const [statusAndAmount, setStatusAndAmount] = useState({});
  const [selectedProof, setSelectedProof] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      const userNamesObj = {};
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/admin/users/getall`,
          getAuthHeaders()
        );
        console.log("Users Response:", response.data); // Log the response for debugging

        const { biddersArray, auctioneersArray } = response.data;

        const users = [...(biddersArray || []), ...(auctioneersArray || [])];
        console.log("Users:", users); // Log users to verify data

        if (Array.isArray(users)) {
          users.forEach((user) => {
            userNamesObj[user._id] = user.username;
          });
          console.log("Usernames Object:", userNamesObj); // Log the final usernames object
          setUsernames(userNamesObj);
        } else {
          console.error("Unexpected response structure: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    if (proofs && proofs.length > 0) {
      fetchUsernames();
    }
  }, [proofs]);

  const updateProofStatus = async (id, newStatus, newAmount) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/admin/paymentproof/status/update/${id}`,
        { status: newStatus, amount: newAmount },
        getAuthHeaders()
      );
      alert("Payment proof updated successfully!");
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error updating proof:",
        error.response?.data || error.message
      );
      alert("Error updating proof.");
    }
  };

  const deletePaymentProof = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/admin/paymentproof/delete/${id}`,
        getAuthHeaders()
      );
      alert("Payment proof deleted successfully!");
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error deleting proof:",
        error.response?.data || error.message
      );
      alert("Error deleting proof.");
    }
  };

  const viewProofDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin/paymentproof/${id}`,
        getAuthHeaders()
      );
      setSelectedProof(response.data.paymentProofDetail);
    } catch (error) {
      console.error(
        "Error fetching proof details:",
        error.response?.data || error.message
      );
      alert("Failed to load payment proof details.");
    }
  };

  const handleChange = (id, field, value) => {
    setStatusAndAmount((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <div className="payment-proof-container">
      <h2 className="payment-proof-title">Payment Proofs</h2>

      <div className="payment-proof-content">
        {/* Payment Proof List (Left side) */}
        <ul className="payment-proof-list">
          {proofs.map((proof) => (
            <li key={proof._id} className="payment-proof-item">
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
                  value={statusAndAmount[proof._id]?.status || proof.status}
                  onChange={(e) =>
                    handleChange(proof._id, "status", e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Settled">Settled</option>
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

        {/* Detail Viewer (Right side) */}
        {selectedProof && (
          <div className="proof-details">
            <h3>Payment Proof Details</h3>
            <p>
              <strong>ID:</strong> {selectedProof._id}
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
            {selectedProof.proofUrl && (
              <p>
                <strong>Proof Image:</strong>{" "}
                <a
                  href={selectedProof.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Image
                </a>
              </p>
            )}
            <button onClick={() => setSelectedProof(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentProofs;
