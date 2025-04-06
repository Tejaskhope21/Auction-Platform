import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Footer from "@/layout/Footer";
import "./Home.css";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <section className="home-container">
      <div>
        <p className="tagline">Transparency Leads to Your Victory</p>
        <h1 className="main-title">Transparent Auctions</h1>
        <h1 className="highlight-title">Be The Winner</h1>
        <div className="auth-buttons">
          {!isAuthenticated && (
            <>
              <Link to="/sign-up" className="sign-up-btn">
                Sign Up
              </Link>
              <Link to="/login" className="login-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="how-it-works">
        <h3 className="section-title">How it works</h3>
        <div className="how-it-works-grid">
          {howItWorks.map((element) => (
            <div key={element.title} className="how-it-works-card">
              <h5>{element.title}</h5>
              <p>{element.description}</p>
            </div>
          ))}
        </div>
      </div>
      <FeaturedAuctions />
      <UpcomingAuctions />
      <Leaderboard />
      <Footer />
    </section>
  );
};

export default Home;
