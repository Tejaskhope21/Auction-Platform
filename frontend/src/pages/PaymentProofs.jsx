import React, { useState } from "react";
import axios from "axios";
import "./PaymentProofs.css";

const PaymentProofs = ({ proofs }) => {
  const [statusAndAmount, setStatusAndAmount] = useState({});
  const [selectedProof, setSelectedProof] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const updateProofStatus = async (id, newStatus, newAmount) => {
    try {
      await axios.put(
        `http://localhost:5000/api/v1/admin/paymentproof/status/update/${id}`,
        { status: newStatus, amount: newAmount },
        getAuthHeaders()
      );
      alert("Payment proof updated successfully!");
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
      await axios.delete(
        `http://localhost:5000/api/v1/admin/paymentproof/delete/${id}`,
        getAuthHeaders()
      );
      alert("Payment proof deleted successfully!");
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
        `http://localhost:5000/api/v1/admin/paymentproofs/${id}`,
        getAuthHeaders()
      );
      const proofDetail = response.data.paymentProofDetail;
      console.log("Selected Proof Data:", proofDetail); // Debugging log
      setSelectedProof(proofDetail);
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const handleShowImage = () => {
    if (selectedProof?.proof?.url) {
      setShowImage(true);
    }
  };

  const handleCloseImage = () => {
    setShowImage(false);
  };

  return (
    <div className="payment-proof-container">
      <h2 className="payment-proof-title">Payment Proofs</h2>

      <div className="payment-proof-content">
        <ul className="payment-proof-list">
          {proofs.map((proof) => (
            <li key={proof._id} className="payment-proof-item">
              <span className="proof-id">Proof ID: {proof._id}</span>
              <span className="amount">Amount: {proof.amount || "N/A"}</span>
              <span className="status">Status: {proof.status}</span>

              <div className="update-controls">
                <input
                  type="number"
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

        {selectedProof && (
          <div className="proof-details">
            <h3>Payment Proof Details</h3>
            <p>
              <strong>ID:</strong> {selectedProof._id}
            </p>
            <p>
              <strong>Amount:</strong> {selectedProof.amount || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {selectedProof.status}
            </p>
            <p>
              <strong>Uploaded At:</strong>{" "}
              {formatDate(selectedProof.uploadedAt)}
            </p>
            <p>
              <strong>Comment:</strong> {selectedProof.comment || "N/A"}
            </p>

            {selectedProof.proof?.url && selectedProof.proof.url.trim() ? (
              <div className="btn btn-info">
                <strong>Payment Screenshot:</strong>
                <button onClick={handleShowImage}>View Screenshot</button>
              </div>
            ) : (
              <p>No screenshot available.</p>
            )}

            <button onClick={() => setSelectedProof(null)}>Close</button>
          </div>
        )}

        {showImage && selectedProof?.proof?.url && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img
                src={selectedProof.proof.url}
                alt="Payment Screenshot"
                onError={() => setShowImage(false)}
              />
              <button onClick={handleCloseImage}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentProofs;
