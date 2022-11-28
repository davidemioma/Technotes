import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface Props {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const authBody = useAuth();

  const location = useLocation();

  return authBody?.auth?.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
