import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { AlertOctagon } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import westernGenre from "../assets/western_genre.png";

const CATEGORIES_LIST = [
  { id: "Action", name: "Action", color: "#FF5521", image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=300&q=80" },
  { id: "Drama", name: "Drama", color: "#D7A4FF", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80" },
  { id: "Romance", name: "Romance", color: "#11B800", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80" },
  { id: "Thriller", name: "Thriller", color: "#84C2FF", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80" },
  { id: "Western", name: "Western", color: "#792500", image: westernGenre },
  { id: "Horror", name: "Horror", color: "#5746DE", image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&w=300&q=80" },
  { id: "Fantasy", name: "Fantasy", color: "#FF4ADE", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80" },
  { id: "Music", name: "Music", color: "#E50000", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80" },
  { id: "Fiction", name: "Fiction", color: "#6CD061", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80" }
];

const Categories = () => {
  const selectedCategories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);
  const navigate = useNavigate();

  const handleCardClick = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setCategories([...selectedCategories, categoryId]);
    }
  };

  const isButtonEnabled = selectedCategories.length >= 3;

  const handleContinue = () => {
    if (isButtonEnabled) {
      navigate("/dashboard-simple");
    }
  };

  return (
    <div className="categories-container">
      {/* Left panel: Selected categories list & Navigation */}
      <div className="categories-left-panel">
        <div className="branding-container">
          <h1 className="brand-logo">Super app</h1>
          <h2 className="selection-heading">Choose your entertainment category</h2>
        </div>

        <div className="chips-container">
          {selectedCategories.map((catId) => (
            <div
              key={catId}
              className="category-chip"
              style={{ backgroundColor: "#148A08" }}
            >
              {catId}
              <button
                type="button"
                className="chip-remove-btn"
                onClick={() => handleCardClick(catId)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        {selectedCategories.length < 3 && (
          <div className="warning-box">
            <AlertOctagon size={20} className="warning-icon" />
            <span className="warning-text">Minimum 3 categories required</span>
          </div>
        )}

        <div className="navigation-actions">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button
            type="button"
            className={`btn-continue ${isButtonEnabled ? "btn-active" : "btn-disabled"}`}
            onClick={handleContinue}
            disabled={!isButtonEnabled}
          >
            Next Page
          </button>
        </div>
      </div>

      {/* Right panel: Grid of category cards */}
      <div className="categories-right-panel">
        <div className="category-cards-grid">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                isSelected={isSelected}
                onClick={() => handleCardClick(cat.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
