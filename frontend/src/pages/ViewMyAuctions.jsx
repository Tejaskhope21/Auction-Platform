import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import "./ViewMyAuctions.css";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, navigateTo, user.role]);

  return (
    <div className="auctions-container">
      <h1 className="auctions-title">My Auctions</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className={`auctions-list ${myAuctions.length > 2 && "flex-grow"}`}
        >
          {myAuctions.length > 0 ? (
            myAuctions.map((element) => (
              <CardTwo
                title={element.title}
                startingBid={element.startingBid}
                endTime={element.endTime}
                startTime={element.startTime}
                imgSrc={element.image?.url}
                id={element._id}
                key={element._id}
              />
            ))
          ) : (
            <h3 className="no-auctions">You have not posted any auctions.</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;
