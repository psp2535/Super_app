import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import userAvatar from "../assets/user_avatar.png";

const AVATAR_IMAGE = userAvatar;

const DashboardSimple = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container simple-dashboard-container">
      <div className="dashboard-grid simple-dashboard-grid">
        
        {/* Left Column wrapper (Profile, Weather) */}
        <div className="dashboard-left-col">
          {/* WIDGET 1: User Profile Widget */}
          <div className="widget-card profile-widget">
            <div className="profile-avatar-wrapper">
              <img src={AVATAR_IMAGE} alt="User Avatar" className="profile-avatar" />
            </div>
            <div className="profile-details-wrapper">
              <h3 className="profile-name">{user.name}</h3>
              <p className="profile-email">{user.email}</p>
              <h4 className="profile-username">@{user.username}</h4>
              
              <div className="profile-chips-grid">
                {categories.map((catId) => (
                  <span key={catId} className="profile-category-pill">
                    {catId}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* WIDGET 2: Weather Widget */}
          <div className="widget-card weather-widget-container">
            <WeatherWidget />
          </div>
        </div>

        {/* WIDGET 3: News Widget */}
        <div className="widget-card news-widget-container">
          <NewsWidget />
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="dashboard-simple-footer">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/categories")}
        >
          Back
        </button>
        <button
          type="button"
          className="btn-continue btn-active"
          onClick={() => navigate("/dashboard")}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DashboardSimple;
