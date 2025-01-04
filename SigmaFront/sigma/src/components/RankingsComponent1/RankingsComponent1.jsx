// src/components/RankingsComponent/RankingsComponent.jsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api.jsx'; 
import { Link } from 'react-router-dom';
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
      console.error('Greška pri učitavanju rangiranja:', error);
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
          <div className="name">{user.name ? user.name : user.username }</div>
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
    return (
      <div className="ProblemOfTheWeek__loading">
        <div className="spinner"></div>
        <p>Učitavanje...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="rankings-container">
      <p className='text-align__center'>Lista najboljih takmičara ističe one koji su pokazali brzinu, tačnost i matematičku oštrinu u rješavanju problema. Pogledajte svoj rang i nastavite da se penjete ka vrhu!</p>
      {['weekly', 'monthly', 'allTime'].map((categoryKey) => (
        <div key={categoryKey}>
          {renderCategory(getCategoryTitle(categoryKey), rankings[categoryKey], categoryKey)}
        </div>
      ))}
      <Link
        className="back-button"
        id="back-button-margin"
        to='/rankings'
      >
        Detaljnije
      </Link>
    </div>
  );
};

export default RankingsComponent1;
