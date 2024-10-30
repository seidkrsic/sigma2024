// src/components/RankingsComponent/RankingsComponent.jsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api.jsx'; 
import slika1 from "../../images/user1.png"; // Default korisnička slika

import './RankingsComponent.css';
import useScrollToTop from '../useScrollToTop/useScrollToTop.jsx';

const RankingsComponent = () => {
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
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);
  }, []);

  useScrollToTop();

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
      console.error('Greška pri učitavanju rangiranja:', error);
      setError('Nije moguće učitati rangiranja. Pokušajte ponovo kasnije.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = (category) => {
    setExpandedCategory(category);
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);
  };

  const handleBack = () => {
    setExpandedCategory(null);
    document.querySelector(".scroll-container").scrollTo(0, 0);
    setTimeout(() => {
        document.querySelector(".scroll-container").scrollTo(0, 0);
      }, 100);

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

  const renderCategory = (title, users, categoryKey) => {

    const isExpanded = expandedCategory === categoryKey;
    const displayUsers = isExpanded ? users : users.slice(0, 3);

    return (
      <div className="category" key={categoryKey}>
        <div className="category-header">
          <h2>{title}</h2>
          {!isExpanded && users.length >= 3 && (
            <button
              className="view-all-button"
              onClick={() => handleViewAll(categoryKey)}
            >
              Prikaži sve
            </button>
          )}
          {isExpanded && (
            <button
              className="back-button"
              onClick={handleBack}
            >
              Nazad
            </button>
          )}
        </div>
        {renderRankings(displayUsers)}
      </div>
    );
  };

  const getCategoryTitle = (categoryKey) => {

    switch (categoryKey) {
      case 'weekly':
        return 'Top 3 Nedelje';
      case 'monthly':
        return 'Top 3 Mjeseca';
      case 'allTime':
        return 'Najbolji Takmičari';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="loading">Učitavanje rangiranja...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="rankings-container">
      {!expandedCategory ? (
        <>
          {['weekly', 'monthly', 'allTime'].map((categoryKey) => (
            <div key={categoryKey}>
              {renderCategory(getCategoryTitle(categoryKey), rankings[categoryKey], categoryKey)}
            </div>
          ))}
        </>
      ) : (
        <div className="expanded-ranking">
          <h2>{getCategoryTitle(expandedCategory).replace('Top 3', 'Ranglista')}</h2>
          <button className="back-button" onClick={handleBack}>
            Nazad
          </button>
          {renderRankings(rankings[expandedCategory])}
        </div>
      )}
    </div>
  );
};

export default RankingsComponent;
