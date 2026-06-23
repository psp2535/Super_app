import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const NotFound = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  
  const isRegistered = user.name && user.username && user.email && user.mobile;
  
  const handleGoBack = () => {
    if (isRegistered) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-description">
          The requested page could not be found. Use the button below to navigate back safely.
        </p>
        <button type="button" className="btn-continue btn-active" onClick={handleGoBack}>
          {isRegistered ? "Go to Dashboard" : "Go to Registration"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
