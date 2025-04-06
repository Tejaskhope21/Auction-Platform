import React from "react";
import { useSelector } from "react-redux";
import Card from "@/custom-components/Card";
import "./FeaturedAuctions.css";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <section className="featured-auctions">
      <h3 className="featured-title">Featured Auctions</h3>
      <div className="featured-grid">
        {loading ? (
          <p className="loading-text">Loading auctions...</p>
        ) : allAuctions?.length > 0 ? (
          allAuctions
            .slice(0, 8)
            .map((element) => (
              <Card
                title={element.title}
                imgSrc={element.image?.url}
                startTime={element.startTime}
                endTime={element.endTime}
                startingBid={element.startingBid}
                id={element._id}
                key={element._id}
              />
            ))
        ) : (
          <p className="no-auctions">No featured auctions available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedAuctions;
