import React, { useState, useEffect } from 'react';
import api from '../../api'; // Putanja do vašeg api.js fajla
import './ProfileUpdate.css'; // Kreiraćemo ovaj CSS fajl za stilizaciju

const ProfileUpdate = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    profile_picture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Učitavanje trenutnih podataka korisnika
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await api.getUserProfile();
        setProfileData((prevData) => ({
          ...prevData,
          name: data.name || '',
        }));
        if (data.profile_picture) {
          setPreviewImage(data.profile_picture);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      name: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // Ograničenje na 2MB
      alert('Slika je prevelika. Maksimalna veličina je 2MB.');
      return;
    }
    setProfileData({
      ...profileData,
      profile_picture: file,
    });
    setPreviewImage(URL.createObjectURL(file));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.updateUserProfile(profileData);
      alert('Profil uspešno ažuriran!');
      // Opciono: Osvežite stranicu ili preusmerite korisnika
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Došlo je do greške pri ažuriranju profila.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-update-container">
      <h2>Ažuriranje profila</h2>
      <form onSubmit={handleSubmit} className="profile-update-form">
        <div className="form-group">
          <label htmlFor="name">Ime:</label>
          <input
            type="text"
            id="name"
            value={profileData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile_picture">Profilna slika:</label>
          <input
            type="file"
            id="profile_picture"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
        <button type="submit" className="update-button" disabled={loading}>
          {loading ? 'Sačekajte...' : 'Sačuvaj promene'}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
