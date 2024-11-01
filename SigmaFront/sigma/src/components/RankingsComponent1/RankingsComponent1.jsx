// src/components/RankingsComponent/RankingsComponent.jsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api.jsx'; 
import slika1 from "../../images/user1.png"; // Default korisnička slika

import './RankingsComponent1.css';


const RankingsComponent1 = () => {
  const [rankings, setRankings] = useState({
    weekly: [],
    monthly: [],
    allTime: [],
  });
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRankings();
  }, []);



  const fetchRankings = async () => {

    setLoading(true);
    setError(null);
    try {
      const [weeklyData, monthlyData, allTimeData] = await Promise.all([
        api.getWeeklyRankings(),
        api.getMonthlyRankings(),
        api.getAllTimeRankings(),
      ]);

      setRankings({
        weekly: weeklyData,
        monthly: monthlyData,
        allTime: allTimeData,
      });
    } catch (error) {
      setError('Nije moguće učitati rangiranja. Pokušajte ponovo kasnije.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = (category) => {
    setExpandedCategory(category);
  };

  const handleBack = () => {
    setExpandedCategory(null);

  };

  const renderRankings = (users) => {
    if (!users.length) {
      return <div className="no-data">Nema korisnika u ovoj kategoriji.</div>;
    }

    return users.map((user, index) => (
      <div key={index} className="ranking-item">
        <div className="rank">{index + 1}</div>
        <div className="user-info">
          <img
            src={user.profile_picture || slika1}
            alt={user.name}
            className="profile-picture"
          />
          <div className="name">{user.name}</div>
        </div>
        <div className="points">{user.total_points} poena</div>
      </div>
    ));
  };



  if (loading) {
    return <div className="loading">Učitavanje rangiranja...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="rankings-container">
        <div className="expanded-ranking">
          <h2>{getCategoryTitle(expandedCategory).replace('Top 3', 'Ranglista')}</h2>
          {renderRankings(rankings[expandedCategory])}
          <button
              className="view-all-button"
              onClick={() => handleViewAll(categoryKey)}
            >
              detaljnije
            </button>
        </div>
    </div>
  );
};

export default RankingsComponent1;
