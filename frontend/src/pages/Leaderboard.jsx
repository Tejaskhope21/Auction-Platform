import React from "react";
import { useSelector } from "react-redux";
import Spinner from "@/custom-components/Spinner";
import "./Leaderboard.css";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  return (
    <section className="leaderboard-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="leaderboard-header">
            <h1 className="leaderboard-title">Bidders Leaderboard</h1>
          </div>
          <div className="table-container">
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
                {leaderboard.slice(0, 100).map((element, index) => (
                  <tr key={element._id}>
                    <td className="profile-cell">
                      <span className="rank-number">{index + 1}</span>
                      <img
                        src={element.profileImage?.url}
                        alt={element.username}
                        className="profile-img"
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
        </>
      )}
    </section>
  );
};

export default Leaderboard;
