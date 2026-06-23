import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { AlertOctagon } from "lucide-react";

const CATEGORIES_LIST = [
  { id: "Action", name: "Action", color: "#FF5521", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=300&q=80" },
  { id: "Comedy", name: "Comedy", color: "#D7A4FF", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=300&q=80" },
  { id: "Drama", name: "Drama", color: "#11B800", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=300&q=80" },
  { id: "Music", name: "Music", color: "#E50000", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80" },
  { id: "Sports", name: "Sports", color: "#37A7EC", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80" },
  { id: "Thriller", name: "Thriller", color: "#84C2FF", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300&q=80" },
  { id: "Fantasy", name: "Fantasy", color: "#FF4ADE", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80" },
  { id: "Romance", name: "Romance", color: "#FF2F53", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80" }
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

  const handleRemoveChip = (categoryId) => {
    setCategories(selectedCategories.filter((id) => id !== categoryId));
  };

  const handleContinue = () => {
    if (selectedCategories.length >= 3) {
      navigate("/dashboard");
    }
  };

  const isButtonEnabled = selectedCategories.length >= 3;

  return (
    <div className="categories-container">
      {/* Left panel: Onboarding selection status */}
      <div className="categories-left-panel">
        <div className="branding-container">
          <h1 className="brand-logo">Super app</h1>
          <h2 className="selection-heading">Choose your entertainment category</h2>
        </div>

        <div className="chips-container">
          {selectedCategories.map((catId) => {
            const cat = CATEGORIES_LIST.find((c) => c.id === catId);
            return (
              <div
                key={catId}
                className="category-chip"
                style={{ backgroundColor: "#148A08" }}
              >
                {cat?.name}
                <button
                  type="button"
                  className="chip-remove-btn"
                  onClick={() => handleRemoveChip(catId)}
                >
                  X
                </button>
              </div>
            );
          })}
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
              <div
                key={cat.id}
                className={`category-card ${isSelected ? "selected-card" : ""}`}
                style={{
                  backgroundColor: cat.color,
                  "--card-border-color": "#11B800"
                }}
                onClick={() => handleCardClick(cat.id)}
              >
                <div className="card-content">
                  <h3 className="card-title">{cat.name}</h3>
                  <div className="card-image-wrapper">
                    <img src={cat.image} alt={cat.name} className="card-image" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
