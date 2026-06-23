import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import DashboardSimple from "../pages/DashboardSimple";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import NotFound from "../pages/NotFound";

// Guard to ensure user is registered before accessing categories/dashboard/movies
const RegistrationGuard = ({ children }) => {
  const user = useStore((state) => state.user);
  const isRegistered = user.name && user.username && user.email && user.mobile;
  
  if (!isRegistered) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Guard to ensure user has selected at least 3 categories before dashboard/movies
const CategoryGuard = ({ children }) => {
  const categories = useStore((state) => state.categories);
  const hasCategories = categories && categories.length >= 3;

  if (!hasCategories) {
    return <Navigate to="/categories" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Register Route */}
      <Route path="/" element={<Register />} />

      {/* Protected Onboarding Route */}
      <Route
        path="/categories"
        element={
          <RegistrationGuard>
            <Categories />
          </RegistrationGuard>
        }
      />

      {/* Protected App Routes */}
      <Route
        path="/dashboard-simple"
        element={
          <RegistrationGuard>
            <CategoryGuard>
              <DashboardSimple />
            </CategoryGuard>
          </RegistrationGuard>
        }
      />

      <Route
        path="/dashboard"
        element={
          <RegistrationGuard>
            <CategoryGuard>
              <Dashboard />
            </CategoryGuard>
          </RegistrationGuard>
        }
      />

      <Route
        path="/movies"
        element={
          <RegistrationGuard>
            <CategoryGuard>
              <Movies />
            </CategoryGuard>
          </RegistrationGuard>
        }
      />

      {/* Fallback to NotFound page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
