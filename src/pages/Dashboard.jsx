import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import NotesWidget from "../components/NotesWidget";
import TimerWidget from "../components/TimerWidget";
import userAvatar from "../assets/user_avatar.png";

const AVATAR_IMAGE = userAvatar;

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  const handleBrowseMovies = () => {
    navigate("/movies");
  };

  return (
    <div className="dashboard-container complete-dashboard-container">
      <div className="dashboard-grid complete-dashboard-grid">
        
        {/* WIDGET 1: Profile Card */}
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

        {/* WIDGET 2: Weather Card */}
        <div className="widget-card weather-widget-container">
          <WeatherWidget />
        </div>

        {/* WIDGET 3: Notes Card */}
        <div className="widget-card notes-widget-container">
          <NotesWidget />
        </div>

        {/* WIDGET 4: Timer Card */}
        <div className="widget-card timer-widget-container">
          <TimerWidget />
        </div>

        {/* WIDGET 5: News Card */}
        <div className="widget-card news-widget-container">
          <NewsWidget />
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="dashboard-complete-footer">
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/dashboard-simple")}
        >
          Back
        </button>
        <button
          type="button"
          className="btn-continue btn-active btn-browse"
          onClick={handleBrowseMovies}
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
