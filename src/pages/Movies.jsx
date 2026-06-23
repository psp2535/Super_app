import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMovieByGenre } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { ArrowLeft } from "lucide-react";
import userAvatar from "../assets/user_avatar.png";

const AVATAR_IMAGE = userAvatar;

const Movies = () => {
  const selectedCategories = useStore((state) => state.categories);
  const navigate = useNavigate();

  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Fetch movies for all selected categories
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const results = {};
        // Fetch recommendations for each selected genre in parallel
        await Promise.all(
          selectedCategories.map(async (genre) => {
            const list = await searchMovieByGenre(genre);
            results[genre] = list;
          })
        );
        setMoviesByGenre(results);
      } catch (err) {
        console.error("Failed to load category recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCategories.length > 0) {
      fetchAllMovies();
    }
  }, [selectedCategories]);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="movies-page-container">
      {/* Top Header Bar */}
      <header className="movies-header-bar">
        <div className="header-left">
          <button
            type="button"
            className="btn-back-dashboard"
            onClick={handleBackToDashboard}
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
            <span>Dashboard</span>
          </button>
          <div className="brand-logo-section">
            <h1 className="brand-logo">Super app</h1>
            <span className="brand-subtext">Entertainment recommendations</span>
          </div>
        </div>
        <div className="header-right">
          <div
            className="header-avatar-wrapper"
            onClick={handleBackToDashboard}
            title="Go to Dashboard Profile"
          >
            <img src={AVATAR_IMAGE} alt="User Avatar" className="header-avatar" />
          </div>
        </div>
      </header>

      {/* Recommendations Body */}
      {loading ? (
        <div className="movies-loading-section">
          <p>Compiling category recommendations...</p>
        </div>
      ) : (
        <main className="movies-rows-list">
          {selectedCategories.length === 0 ? (
            <div className="no-genres-warning">
              <p>No categories selected. Please go back and select categories.</p>
            </div>
          ) : (
            selectedCategories.map((genre) => {
              const list = moviesByGenre[genre] || [];
              return (
                <section key={genre} className="genre-scroll-section">
                  <h3 className="genre-row-title">{genre}</h3>
                  <div className="genre-scroll-row">
                    {list.length === 0 ? (
                      <p className="no-movies-label">No movies found for this category.</p>
                    ) : (
                      list.map((movie) => (
                        <MovieCard
                          key={movie.imdbID}
                          movie={movie}
                          onClick={() => setSelectedMovieId(movie.imdbID)}
                        />
                      ))
                    )}
                  </div>
                </section>
              );
            })
          )}
        </main>
      )}

      {/* Details Modal Pop-up Overlay */}
      {selectedMovieId && (
        <MovieModal
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default Movies;
