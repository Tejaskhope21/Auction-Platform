import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./UpcomingAuctions.css"; // Import the CSS file

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const today = new Date().toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    return new Date(item.startTime).toDateString() === today;
  });

  return (
    <section className="upcoming-auctions-container">
      <h3 className="section-title">Auctions For Today</h3>
      <div className="auction-grid">
        <div className="auction-info-card">
          <span className="icon-container">
            <RiAuctionFill />
          </span>
          <div>
            <h3 className="info-title">Auctions For</h3>
            <h3 className="info-subtitle">Today</h3>
          </div>
        </div>

        {auctionsStartingToday.slice(0, 6).map((element, index) => (
          <Link
            to={`/auction/item/${element._id}`}
            key={element._id}
            className="auction-card"
          >
            <div className="auction-card-header">
              <img
                src={element.image?.url}
                alt={element.title}
                className="auction-img"
              />
              <p className="auction-title">{element.title}</p>
            </div>
            <div className="auction-details">
              <p className="detail-label">Starting Bid:</p>
              <p className="detail-value">Rs. {element.startingBid}</p>
            </div>
            <div className="auction-time">
              <p className="detail-label">Starting Time:</p>
              <p className="time-value">{element.startTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UpcomingAuctions;
