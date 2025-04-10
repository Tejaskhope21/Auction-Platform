import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <section className="leaderboard-container">
      <div className="leaderboard-header">
        <h3 className="leaderboard-title">Top 10</h3>
        <h3 className="leaderboard-highlight">Bidders Leaderboard</h3>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Profile Pic</th>
              <th>Username</th>
              <th>Bid Expenditure</th>
              <th>Auctions Won</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, 10).map((element, index) => (
              <tr key={element._id}>
                <td className="leaderboard-profile">
                  <span className="leaderboard-rank">{index + 1}</span>
                  <img
                    src={element.profileImage?.url}
                    alt={element.username}
                    className="leaderboard-image"
                  />
                </td>
                <td>{element.username}</td>
                <td>{element.moneySpent}</td>
                <td>{element.auctionsWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/leaderboard" className="leaderboard-link">
        Go to Leaderboard
      </Link>
    </section>
  );
};

export default Leaderboard;
