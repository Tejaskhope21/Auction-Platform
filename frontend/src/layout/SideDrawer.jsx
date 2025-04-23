import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import "./SideDrawer.css";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      setShow(false); // Ensure menu closes after logout
    }, 100);
  };

  // Close menu when authentication state changes (for logout case)
  useEffect(() => {
    if (!isAuthenticated) {
      setShow(false);
    }
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        My<span className="highlight">Bid</span>
      </Link>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setShow(!show)}>
        {show ? <IoMdCloseCircleOutline /> : <GiHamburgerMenu />}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${show ? "show" : ""}`}>
        <li>
          <Link to="/auctions" onClick={() => setShow(false)}>
            Auctions
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" onClick={() => setShow(false)}>
            Leaderboard
          </Link>
        </li>

        {isAuthenticated && user?.role === "Auctioneer" && (
          <>
            <li>
              <Link to="/submit-commission" onClick={() => setShow(false)}>
                Submit Commission
              </Link>
            </li>
            <li>
              <Link to="/create-auction" onClick={() => setShow(false)}>
                Create Auction
              </Link>
            </li>
            <li>
              <Link to="/view-my-auctions" onClick={() => setShow(false)}>
                View My Auctions
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && user?.role === "Super Admin" && (
          <>
            <li>
              <Link to="/SuperAdminDashboard" onClick={() => setShow(false)}>
                Super Admin
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <li>
            <Link to="/me" onClick={() => setShow(false)}>
              <FaUserCircle /> Profile
            </Link>
          </li>
        )}

        {!isAuthenticated ? (
          <div className="auth-buttons">
            {/* Uncomment the below if needed for unauthenticated users */}
            {/* <Link
              to="/sign-up"
              className="btn sign-up"
              onClick={() => setShow(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="btn login"
              onClick={() => setShow(false)}
            >
              Login
            </Link> */}
          </div>
        ) : (
          <button className="btn logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default SideDrawer;
