import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const token = sessionStorage.getItem("adminToken");

  return token ? <Outlet /> : <Navigate to="/admin" replace />;
}