import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SubmitCommission.css";
import { Colors } from "chart.js";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="commission-container">
      <div className="commission-form-wrapper">
        <form className="commission-form" onSubmit={handlePaymentProof}>
          <h3 className="commission-title">Upload Payment Proof</h3>
          <p>
            <span className="commission-title">Note: </span> You can see your
            commission in profile
          </p>

          <div className="commission-input-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="commission-input-group">
            <label>Payment Proof (ScreenShot)</label>
            <input type="file" onChange={proofHandler} />
          </div>

          <div className="commission-input-group">
            <label>Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={7}
            />
          </div>

          <button className="commission-submit-btn" type="submit">
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
