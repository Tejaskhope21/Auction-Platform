import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import "./Auctions.css";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <section className="auctions-container">
      {loading ? (
        <Spinner />
      ) : (
        <article className="auctions-content">
          <section className="auctions-section">
            <h1 className="auctions-title">Auctions</h1>
            <div className="auctions-list">
              {allAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                />
              ))}
            </div>
          </section>
        </article>
      )}
    </section>
  );
};

export default Auctions;
