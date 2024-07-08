import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
