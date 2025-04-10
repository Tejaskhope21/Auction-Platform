import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "@/custom-components/Spinner";
import "./UserProfile.css";

const UserProfile = () => {
  // Ensure user has a default empty object with paymentMethods to prevent undefined errors
  const {
    user = { paymentMethods: {} },
    isAuthenticated,
    loading,
  } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  return (
    <section className="user-profile-container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="profile-card">
          <img
            src={user.profileImage?.url || "/default-avatar.png"}
            alt="Profile"
            className="profile-img"
          />
          <div className="personal-details">
            <h3>Personal Details</h3>
            <div className="details-grid">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  defaultValue={user?.username || "N/A"}
                  disabled
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={user?.email || "N/A"}
                  disabled
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="number"
                  defaultValue={user?.phone || "N/A"}
                  disabled
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  defaultValue={user?.address || "N/A"}
                  disabled
                />
              </div>
              <div>
                <label>Role</label>
                <input
                  type="text"
                  defaultValue={user?.role || "N/A"}
                  disabled
                />
              </div>
              <div>
                <label>Joined On</label>
                <input
                  type="text"
                  defaultValue={user?.createdAt?.substring(0, 10) || "N/A"}
                  disabled
                />
              </div>
            </div>
          </div>

          {user.role === "Auctioneer" && (
            <div className="payment-details">
              <h3>Payment Details</h3>
              <div className="details-grid">
                <div>
                  <label>Bank Name</label>
                  <input
                    type="text"
                    defaultValue={
                      user.paymentMethods?.bankTransfer?.bankName || "N/A"
                    }
                    disabled
                  />
                </div>
                <div>
                  <label>Bank Account (IBAN)</label>
                  <input
                    type="text"
                    defaultValue={
                      user.paymentMethods?.bankTransfer?.bankAccountNumber ||
                      "N/A"
                    }
                    disabled
                  />
                </div>
                <div>
                  <label>User Name On Bank Account</label>
                  <input
                    type="text"
                    defaultValue={
                      user.paymentMethods?.bankTransfer?.bankAccountName ||
                      "N/A"
                    }
                    disabled
                  />
                </div>
                <div>
                  <label>Easypaisa Account Number</label>
                  <input
                    type="text"
                    defaultValue={
                      user.paymentMethods?.easypaisa?.easypaisaAccountNumber ||
                      "N/A"
                    }
                    disabled
                  />
                </div>
                <div>
                  <label>Paypal Email</label>
                  <input
                    type="text"
                    defaultValue={
                      user.paymentMethods?.paypal?.paypalEmail || "N/A"
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
          )}

          <div className="other-details">
            <h3>Other User Details</h3>
            <div className="details-grid">
              {user.role === "Auctioneer" && (
                <div>
                  <label>Unpaid Commissions</label>
                  <input
                    type="text"
                    defaultValue={user?.unpaidCommission || "N/A"}
                    disabled
                  />
                </div>
              )}
              {user.role === "Bidder" && (
                <>
                  <div>
                    <label>Auctions Won</label>
                    <input
                      type="text"
                      defaultValue={user?.auctionsWon || "0"}
                      disabled
                    />
                  </div>
                  <div>
                    <label>Money Spent</label>
                    <input
                      type="text"
                      defaultValue={user?.moneySpent || "0"}
                      disabled
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
