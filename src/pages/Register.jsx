import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const Register = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    shareData: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.name.trim()) {
      tempErrors.name = "Name field is required.";
    } else if (!namePattern.test(formData.name)) {
      tempErrors.name = "Name must only contain alphabetic characters.";
    }

    if (!formData.username.trim()) {
      tempErrors.username = "Username field is required.";
    } else if (!usernamePattern.test(formData.username)) {
      tempErrors.username = "Username must be alphanumeric without whitespace.";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email field is required.";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please input a valid email formatting schema.";
    }

    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile field is required.";
    } else if (!phonePattern.test(formData.mobile)) {
      tempErrors.mobile = "Mobile field must encompass exactly 10 digital characters.";
    }

    if (!formData.shareData) {
      tempErrors.shareData = "Check this box to proceed.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
      });
      navigate("/categories");
    }
  };

  return (
    <div className="register-container">
      {/* Left panel: Promotional Art Panel */}
      <div className="register-art-panel">
        <div className="art-overlay">
          <h1 className="art-title">Discover new things on Superapp</h1>
        </div>
      </div>

      {/* Right panel: Registration Form Container */}
      <div className="register-form-panel">
        <div className="form-wrapper">
          <div className="brand-header">
            <h2 className="brand-logo">Super app</h2>
            <p className="brand-subtitle">Create your new account</p>
          </div>

          <form onSubmit={handleFormSubmission} className="form-container">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                className={`form-input ${errors.username ? "input-error" : ""}`}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={`form-input ${errors.email ? "input-error" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Mobile"
                className={`form-input ${errors.mobile ? "input-error" : ""}`}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              {errors.mobile && <span className="error-text">{errors.mobile}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.shareData}
                  onChange={(e) => setFormData({ ...formData, shareData: e.target.checked })}
                />
                <span className="checkbox-custom"></span>
                Share my registration data with Superapp
              </label>
              {errors.shareData && <span className="error-text">{errors.shareData}</span>}
            </div>

            <button type="submit" className="btn-submit">
              SIGN UP
            </button>
          </form>

          <footer className="form-footer">
            <p>
              By clicking on Sign up, you agree to Superapp{" "}
              <span className="accent-text">Terms and Conditions of Use</span>
            </p>
            <p>
              To learn more about how Superapp collects, uses, shares and protects
              your personal data please read Superapp{" "}
              <span className="accent-text">Privacy Policy</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Register;
