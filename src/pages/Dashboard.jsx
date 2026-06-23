import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import NotesWidget from "../components/NotesWidget";
import TimerWidget from "../components/TimerWidget";
import { ArrowRight, Film } from "lucide-react";

// Default Profile Avatar image path (using a beautiful Unsplash portrait)
const AVATAR_IMAGE = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  const handleBrowseMovies = () => {
    navigate("/movies");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        
        {/* WIDGET 1: User Profile Widget (Spans 2 cols, Row 1) */}
        <div className="widget-card profile-widget">
          <div className="profile-avatar-wrapper">
            <img src={AVATAR_IMAGE} alt="User Avatar" className="profile-avatar" />
          </div>
          <div className="profile-details-wrapper">
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-email">{user.email}</p>
            <h4 className="profile-username">@{user.username}</h4>
            
            {/* Displaying chosen categories chips */}
            <div className="profile-chips-grid">
              {categories.map((catId) => (
                <span key={catId} className="profile-category-pill">
                  {catId}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* WIDGET 2: Weather Widget (Spans 2 cols, Row 2) */}
        <div className="widget-card weather-widget-container">
          <WeatherWidget />
        </div>

        {/* WIDGET 3: Notes Widget (Spans 1 col, Row 1-2) */}
        <div className="widget-card notes-widget-container">
          <NotesWidget />
        </div>

        {/* WIDGET 4: News Widget (Spans 1 col, Row 1-3) */}
        <div className="widget-card news-widget-container">
          <NewsWidget />
        </div>

        {/* WIDGET 5: Countdown Timer Widget (Spans 2 cols, Row 3) */}
        <div className="widget-card timer-widget-container">
          <TimerWidget />
        </div>

        {/* WIDGET 6: Browse Movies Navigation Card (Spans 1 col, Row 3) */}
        <div className="widget-card browse-movies-card" onClick={handleBrowseMovies}>
          <div className="browse-content">
            <div className="browse-icon-wrapper">
              <Film size={28} className="browse-icon" />
            </div>
            <div className="browse-text-details">
              <h4>Browse Entertainment</h4>
              <p>Curated recommendations matching your selections</p>
            </div>
          </div>
          <button type="button" className="btn-browse-action">
            <ArrowRight size={24} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
