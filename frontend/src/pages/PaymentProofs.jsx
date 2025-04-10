import React, { useState } from "react";
import axios from "axios";

const PaymentProofs = ({
  paymentProofs,
  fetchPaymentProofs,
  baseUrl,
  config,
}) => {
  const [selectedProof, setSelectedProof] = useState(null);
  const [updateData, setUpdateData] = useState({ amount: "", status: "" });

  const fetchPaymentProofDetail = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/paymentproof/${id}`, config);
      setSelectedProof(response.data.paymentProofDetail);
    } catch (error) {
      console.error("Error fetching proof detail:", error);
    }
  };

  const handleUpdateProof = async (id) => {
    try {
      const response = await axios.put(
        `${baseUrl}/paymentproof/status/update/${id}`,
        updateData,
        config
      );
      setSelectedProof(response.data.proof);
      fetchPaymentProofs();
    } catch (error) {
      console.error("Error updating proof:", error);
    }
  };

  const deletePaymentProof = async (id) => {
    try {
      await axios.delete(`${baseUrl}/paymentproof/delete/${id}`, config);
      fetchPaymentProofs();
    } catch (error) {
      console.error("Error deleting proof:", error);
    }
  };

  return (
    <section>
      <h2>Payment Proofs</h2>
      <div className="proofs-list">
        {paymentProofs.map((proof) => (
          <div key={proof._id} className="proof-item">
            <p>Amount: {proof.amount}</p>
            <p>Status: {proof.status}</p>
            <button onClick={() => fetchPaymentProofDetail(proof._id)}>
              View Details
            </button>
            <button onClick={() => deletePaymentProof(proof._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedProof && (
        <div className="proof-details">
          <h3>Proof Details</h3>
          <p>Amount: {selectedProof.amount}</p>
          <p>Status: {selectedProof.status}</p>
          <input
            type="number"
            placeholder="New Amount"
            value={updateData.amount}
            onChange={(e) =>
              setUpdateData({ ...updateData, amount: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="New Status"
            value={updateData.status}
            onChange={(e) =>
              setUpdateData({ ...updateData, status: e.target.value })
            }
          />
          <button onClick={() => handleUpdateProof(selectedProof._id)}>
            Update Proof
          </button>
        </div>
      )}
    </section>
  );
};

export default PaymentProofs;
