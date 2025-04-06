import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import "./SideDrawer.css";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setShow(false); // Close menu on logout
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        Prime<span className="highlight">Bid</span>
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
          <li>
            <Link to="/dashboard" onClick={() => setShow(false)}>
              <MdDashboard /> Dashboard
            </Link>
          </li>
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
            <Link
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
            </Link>
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
