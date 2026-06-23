import React from "react";

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <div
      className={`category-card ${isSelected ? "selected-card" : ""}`}
      style={{
        backgroundColor: category.color,
        "--card-border-color": "#11B800"
      }}
      onClick={onClick}
    >
      <div className="card-content">
        <h3 className="card-title">{category.name}</h3>
        <div className="card-image-wrapper">
          <img src={category.image} alt={category.name} className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
