import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../custom-components/Spinner";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import { placeBid } from "../store/slices/bidSlice";
import "./AuctionItem.css";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="auction-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Home
        </Link>
        <FaGreaterThan className="breadcrumb-icon" />
        <Link to="/auctions" className="breadcrumb-link">
          Auctions
        </Link>
        <FaGreaterThan className="breadcrumb-icon" />
        <p className="breadcrumb-text">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="auction-content">
          <div className="auction-info">
            <div className="auction-header">
              <div className="auction-image-container">
                <img src={auctionDetail.image?.url} alt={auctionDetail.title} />
              </div>
              <div className="auction-details">
                <h3 className="auction-title">{auctionDetail.title}</h3>
                <p className="auction-condition">
                  Condition: <span>{auctionDetail.condition}</span>
                </p>
                <p className="auction-min-bid">
                  Minimum Bid: <span>Rs.{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>
            <p className="auction-description-title">
              Auction Item Description
            </p>
            <hr className="separator" />
            {auctionDetail.description &&
              auctionDetail.description.split(". ").map((element, index) => (
                <li key={index} className="auction-description-item">
                  {element}
                </li>
              ))}
          </div>

          <div className="bidding-section">
            <header className="bidding-header">BIDS</header>
            <div className="bidding-container">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div key={index} className="bidder">
                      <div className="bidder-info">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="bidder-image"
                        />
                        <p className="bidder-name">{element.userName}</p>
                      </div>
                      <p className={`bidder-rank rank-${index}`}>
                        {index === 0
                          ? "1st"
                          : index === 1
                          ? "2nd"
                          : index === 2
                          ? "3rd"
                          : `${index + 1}th`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="no-bids">No bids for this auction</p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="status-image"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="status-image"
                />
              )}
            </div>

            <div className="bid-action">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="bid-input-container">
                    <p className="bid-text">Place Bid</p>
                    <input
                      type="number"
                      className="bid-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button className="bid-button" onClick={handleBid}>
                    <RiAuctionFill />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="auction-not-started">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="auction-ended">Auction has ended!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
