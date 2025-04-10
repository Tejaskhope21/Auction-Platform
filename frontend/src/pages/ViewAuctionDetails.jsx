import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import Spinner from "./../custom-components/Spinner";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import "./ViewAuctionDetails.css";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo, user]);

  return (
    <section className="auction-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Home
        </Link>
        <FaGreaterThan className="breadcrumb-separator" />
        <Link to="/view-my-auctions" className="breadcrumb-link">
          My Auctions
        </Link>
        <FaGreaterThan className="breadcrumb-separator" />
        <p className="breadcrumb-current">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="auction-details">
          <div className="auction-info">
            <div className="auction-header">
              <div className="auction-image-container">
                <img src={auctionDetail.image?.url} alt={auctionDetail.title} />
              </div>
              <div className="auction-text">
                <h3 className="auction-title">{auctionDetail.title}</h3>
                <p className="auction-condition">
                  Condition: <span>{auctionDetail.condition}</span>
                </p>
                <p className="auction-min-bid">
                  Minimum Bid: <span>Rs.{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>

            <p className="auction-desc-title">Auction Item Description</p>
            <hr className="divider" />
            <ul className="auction-desc-list">
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => (
                  <li key={index} className="auction-desc-item">
                    {element}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bids-section">
            <header className="bids-header">BIDS</header>
            <div className="bids-container">
              {auctionBidders &&
              auctionBidders.length > 0 &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.map((element, index) => (
                  <div key={index} className="bidder-row">
                    <div className="bidder-info">
                      <img
                        src={element.profileImage}
                        alt={element.userName}
                        className="bidder-image"
                      />
                      <p className="bidder-name">{element.userName}</p>
                    </div>
                    <p className="bid-amount">{element.amount}</p>
                    <p className={`bid-rank rank-${index}`}>
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
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="auction-status-image"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="auction-status-image"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;
