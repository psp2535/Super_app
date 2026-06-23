import React, { useState, useEffect } from "react";
import { fetchMovieDetails } from "../services/movieApi";
import { X, Star, Clock, Tags } from "lucide-react";

const MovieModal = ({ imdbID, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const details = await fetchMovieDetails(imdbID);
        setMovieDetails(details);
      } catch (err) {
        console.error("Failed to load movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      loadDetails();
    }
  }, [imdbID]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  if (!imdbID) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="modal-loading">
            <p>Loading movie specs...</p>
          </div>
        ) : movieDetails ? (
          <div className="modal-content-grid">
            {/* Left Column: Big Poster */}
            <div className="modal-poster-wrapper">
              <img
                src={
                  movieDetails.Poster && movieDetails.Poster !== "N/A"
                    ? movieDetails.Poster
                    : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&q=80"
                }
                alt={movieDetails.Title}
                className="modal-poster-img"
              />
            </div>

            {/* Right Column: Information Sheet */}
            <div className="modal-details-sheet">
              <h2 className="modal-movie-title">{movieDetails.Title}</h2>
              <div className="modal-meta-row">
                <span className="modal-meta-year">{movieDetails.Year}</span>
                <span className="modal-meta-rated">{movieDetails.Rated}</span>
              </div>

              {/* Rating block */}
              {movieDetails.imdbRating && movieDetails.imdbRating !== "N/A" && (
                <div className="modal-rating">
                  <Star size={18} fill="#FFD700" stroke="#FFD700" />
                  <span className="rating-value">{movieDetails.imdbRating}</span>
                  <span className="rating-scale">/10</span>
                </div>
              )}

              {/* Technical metrics */}
              <div className="modal-tech-specs">
                {movieDetails.Runtime && movieDetails.Runtime !== "N/A" && (
                  <div className="tech-spec-item">
                    <Clock size={16} />
                    <span>{movieDetails.Runtime}</span>
                  </div>
                )}
                {movieDetails.Genre && movieDetails.Genre !== "N/A" && (
                  <div className="tech-spec-item">
                    <Tags size={16} />
                    <span>{movieDetails.Genre}</span>
                  </div>
                )}
              </div>

              {/* Plot details */}
              <div className="modal-section">
                <h4 className="section-label">Plot Summary</h4>
                <p className="section-text">{movieDetails.Plot}</p>
              </div>

              {/* Cast & Crew details */}
              <div className="modal-section">
                <h4 className="section-label">Director</h4>
                <p className="section-text">{movieDetails.Director}</p>
              </div>

              <div className="modal-section">
                <h4 className="section-label">Cast Members</h4>
                <p className="section-text">{movieDetails.Actors}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-error">
            <p>Could not fetch movie specifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
