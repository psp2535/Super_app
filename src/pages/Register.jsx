import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import registerBg from "../assets/register_bg.png";

const Register = () => {
  return (
    <div className="register-container">
      {/* Left panel: Promotional Art Panel */}
      <div 
        className="register-art-panel" 
        style={{ backgroundImage: `url(${registerBg})` }}
      >
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

          <RegistrationForm />

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
