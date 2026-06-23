import React from "react";

const MovieCard = ({ movie, onClick }) => {
  const { Title, Year, Poster } = movie;

  // Fallback for broken/missing posters
  const posterUrl = Poster && Poster !== "N/A"
    ? Poster
    : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=300&q=80";

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-card-poster-wrapper">
        <img src={posterUrl} alt={Title} className="movie-card-poster" />
        <div className="movie-card-overlay">
          <span className="movie-card-year">{Year}</span>
        </div>
      </div>
      <div className="movie-card-details">
        <h4 className="movie-card-title">{Title}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
